//React core
import { View, Text, Button, TextInput, StyleSheet,TouchableOpacity } from "react-native"
import { useState, useContext } from "react";

//Components
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";

//Styles
import { inputStyled } from "../../components/InputStyled";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

//Data and context
import { setAvailableMachine } from "../../storage/machineRepository";
import { addLoan, devolutionLoan } from "../../storage/loanRepository";
import { dataContext } from "../../contexts/Data";

export default function HomeScreen({navigation}){
    const {database,
          listSubject,
          listLoan,
          setListLoan,
          subjectSelected,
          setSubjectSelected,
          listStudent,
          listMachine } = useContext(dataContext)

    const [error, setError] = useState("")
    const [studentSelected, setStudentSelected] = useState(null)
    const [machineSelected, setMachineSelected] = useState(null)
    const [studentsFound, setStudentsFound] = useState([])
    const [machinesFound, setMachinesFound] = useState([])


    const errorInvalideFieldsString = "Campos inválidos"

    const handleAddLoan = ()=>{
        if (!studentSelected.name && !machineSelected.id){ 
            setError(errorInvalideFieldsString)    
            return      
        }

        const computerLoan = {
            "student": studentSelected.name,
            "computer": machineSelected.id,
        }

        addLoan(database, studentSelected.id , subjectSelected.id,           machineSelected.id, ()=>{
                setListLoan([...listLoan, computerLoan])
                const IsNotAvailable = 0
                setAvailableMachine(database, machineSelected.id, IsNotAvailable)
            })
    }

    const findStudent = (query) => {
        if(query.length === 0){
            setStudentsFound([]);
            return
        }
        const newData = listStudent.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setStudentsFound(newData);
    }

    const findMachine = (query) =>{
        if(query.length === 0){
            setMachinesFound([]);
            return
        }
        const newData = listMachine.filter((item) =>
          item.id.toLowerCase().includes(query.toLowerCase())
        );
        setMachinesFound(newData);
    }
    
    return(
        
        <BaseView>
            <Header headerTitle={"Controle de equipamentos"}/>
            <Text style={textStyles.label}>Disciplina:</Text>
            {
            listSubject.length > 0 ?
             <SubjectPicker disciplines={listSubject} selectedHandler={setSubjectSelected}/>
            :
            <View style={buttonStyled.container}>
                <Button onPress={()=>{navigation.navigate("Subject")}} color={colorAddButton} title="Registrar disciplina"/>
            </View>
            }
            
            <Text style={textStyles.label}>Estudante:</Text>
            
            <TextInput
             style={inputStyled.input}
             value={studentSelected ? studentSelected.name : null}
             onChangeText={findStudent}
             id={"iStudent"}
             placeholder="Buscar estudante"/>
             {studentsFound.length > 0 ?
              <View style={styles.autocomplete}>
                {studentsFound.map(student=>{
                return (
                <TouchableOpacity
                 key={student.id}
                 onPress={() => setStudentSelected(student)}>
                    <Text>{student.name}</Text>
                </TouchableOpacity>)
                })}
              </View>
             :null}      
            
            <Text style={textStyles.label}>Computador:</Text>
            

            <TextInput 
            style={inputStyled.input} 
            value={machineSelected ? machineSelected.id: null}
            onChangeText={findMachine} 
            keyboardType="numeric"
            id={"iComputer"} 
            placeholder="Buscar computador"/>

            {machinesFound.length > 0 ?
              <View style={styles.autocomplete}>
                {machinesFound.map(machine=>{
                return (
                <TouchableOpacity
                 key={machine.id}
                 onPress={() => setMachineSelected(machine)}>
                    <Text>{machine.id}</Text>
                </TouchableOpacity>)
                })}
              </View>
             :null}

            <View style={buttonStyled.container}>
                <Button disabled={listSubject.length < 1 } onPress={handleAddLoan} color={colorAddButton} title="Registrar empréstimo"/>
            </View>
            
            <Text>{error}</Text>
            <ListHome listLoans={listLoan}/>
        </BaseView>
        )
}

const styles = StyleSheet.create({
    autocomplete:{
        backgroundColor:"white",
        width:"70%",
        alignItems:"flex-start",
        paddingLeft:20,
        marginTop: -20,
        borderTopWidth: 0.5,
    }

})