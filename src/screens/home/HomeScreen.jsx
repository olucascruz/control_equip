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
import { setAvailableMachine, getMachines } from "../../storage/machineRepository";
import { addLoan, getLoans } from "../../storage/loanRepository";
import { dataContext } from "../../contexts/Data";

export default function HomeScreen({navigation}){
    const {database,
          listSubject,
          listLoan, setListLoan,
          subjectSelected, setSubjectSelected,
          listStudent,
          listMachine, setListMachine,
          listStudentSubject } = useContext(dataContext)
    
    
    const [error, setError] = useState("")
    const [studentSelected, setStudentSelected] = useState(null)
    const [machineSelected, setMachineSelected] = useState(null)
    const [studentsFound, setStudentsFound] = useState([])
    const [queryStudent, setQueryStudent] = useState("")
    const [queryMachine, setQueryMachine] = useState("")

    const [machinesFound, setMachinesFound] = useState([])
    const errorInvalideFieldsString = "Campos inválidos"

    const handleAddLoan = ()=>{
        //Pega o objeto pelo nome || id

        const idsStudentsInSubject = listStudentSubject
        .filter(studentSubject => studentSubject.subject === subjectSelected.id)
        .map(studentSubject => studentSubject.student);


        const studentsInSubjectSelected = listStudent.filter(students =>{
            return idsStudentsInSubject.includes(students.id);
        })

        if(queryStudent.length > 0){
            for(const student of studentsInSubjectSelected){
                if(queryStudent.toLowerCase() == student.name.toLowerCase()){
                    setStudentSelected(student)
                }
            }
        }

        if(queryMachine.length > 0){
            for(const machine of listMachine){
                if(machine.id == queryMachine){
                    setMachineSelected(machine)
                }
            }
        }

        setTimeout(()=>{
            if(!studentSelected){
                setError("estudante não existe.")
                return
            } 
            if(!machineSelected){
                setError("computador não existe.")
                return
            } 
            
            if(!machineSelected.is_available){
                setError("computador não está disponível.")
                return
            } 
            if (!studentSelected.name && !machineSelected.id){ 
                setError(errorInvalideFieldsString)    
                return      
            }



            addLoan(database, studentSelected.id, subjectSelected.id, machineSelected.id, ()=>{
                getLoans(database, loans => setListLoan(loans))
                const IsNotAvailable = 0
                setAvailableMachine(
                    database, 
                    machineSelected.id, 
                    IsNotAvailable, 
                    () => getMachines(database, machines => setListMachine(machines)
                )
                )
            })
    
            setError("")
            setQueryMachine("")
            setQueryStudent("")
            setStudentSelected(null)
            setMachineSelected(null)
    
        }, 500)
        

    }
 
    const findStudent = (query) => {
        setQueryStudent(query)
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
        setQueryMachine(query)
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
             <SubjectPicker disciplines={listSubject} selectedHandler={setSubjectSelected} selectedValue={subjectSelected}/>
            :
            <View style={buttonStyled.container}>
                <Button onPress={()=>{navigation.navigate("Subject")}} color={colorAddButton} title="Registrar disciplina"/>
            </View>
            }
            
            <Text style={textStyles.label}>Estudante:</Text>
            
            <TextInput
             style={inputStyled.input}
             value={queryStudent}
             onBlur={() =>
                setTimeout(()=>{    
                    setStudentsFound([])
                }, 800)
            }
             onChangeText={findStudent}
             id={"iStudent"}
             placeholder="Buscar estudante"
             maxLength={45}/>


             {studentsFound.length > 0 ?
              <View style={styles.autocomplete}>
                {studentsFound.map(student=>{
                return (
                <TouchableOpacity
                 style={styles.itemAutocomplete}
                 key={student.id}
                 onPress={() =>{
                    setQueryStudent(student.name)
                    setStudentsFound([])   
                }
                 }>
                    <Text>{student.name}</Text>
                </TouchableOpacity>)
                })}
              </View>
             :null}      
            
            <Text style={textStyles.label}>Computador:</Text>
            

            <TextInput 
            style={inputStyled.input} 
            value={queryMachine}
            onChangeText={findMachine}
            onBlur={()=>{
                setTimeout(()=>{    
                    setMachinesFound([])
                }, 800)
            }}
            keyboardType="numeric"
            id={"iComputer"} 
            placeholder="Buscar computador"
            maxLength={10}/>

            {machinesFound.length > 0 ?
              <View style={styles.autocomplete}>
                {machinesFound.map(machine=>{
                return (
                <TouchableOpacity
                 style={styles.itemAutocomplete}
                 key={machine.id}
                 onPress={() => {
                    setQueryMachine(machine.id)
                    setMachinesFound([])
                 }}>
                    <Text>{machine.id}</Text>
                </TouchableOpacity>)
                })}
              </View>
             :null}

            <View style={buttonStyled.container}>
                <Button disabled={listSubject.length < 1 } onPress={handleAddLoan} color={colorAddButton} title="Registrar empréstimo"/>
            </View>
            
            <Text style={textStyles.error}>{error}</Text>
            <ListHome listLoans={listLoan} database={database} setListLoans={setListLoan} setMachines={setListMachine}/>
        </BaseView>
        )
}

const styles = StyleSheet.create({
    autocomplete:{
        flex:1,
        backgroundColor:"#ffffff",
        width:"70%",
        alignItems:"flex-start",
        paddingLeft:10,
        marginTop: -20,
        borderTopWidth: 0.5,
    },

    itemAutocomplete:{ 
        flex:1,
        height: 40,
        width:"100%",
        justifyContent: "center"
    }

})