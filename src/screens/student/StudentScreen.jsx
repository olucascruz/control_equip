// Core react
import { View, Text, Button, TextInput} from "react-native"
import { useState, useContext } from "react"

// Components
import Header from "../../components/Header"
import BaseList from "../../components/BaseList"
import SubjectPicker from "../../components/SubjectPicker"
import BaseView from "../../components/BaseView"
import ModalEditDelete from "../../components/ModalEditDelete"

//Styled
import { inputStyled } from "../../components/InputStyled"
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

//Context
import { dataContext } from "../../contexts/Data"

// Storage
import { addStudent, getStudents, deleteStudent } from "../../storage/studentRepository"
import { addStudentToSubject } from "../../storage/studentSubjectRepository"


export default function StudentScreen(){
    const {database, listSubject, listStudent, setListStudent} = useContext(dataContext)
    const [valueInputNameStudent, setValueInputNameStudent] = useState(null)
    const [valueInputCodeStudent, setValueInputCodeStudent] = useState(null)
    const [valueInputSubject, setValueInputSubject] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState("")
    const [itemSelected, setItemSelected] = useState("")
    const errorFieldInvalideString = "Campos inválidos"
    const errorInvalideCodeString = "Campo matrícula inválido"
    
    const addStudentHandler = () =>{
        if( !valueInputSubject ||
            !valueInputNameStudent || 
            !valueInputCodeStudent ) {
                setError()
                return
            } 
        
        if(valueInputCodeStudent.length < 10){ 
            setError(errorInvalideCodeString)
            return
        }

        if (! /^\d+$/.test(numericValue)) {
            setError(errorInvalideCodeString)
            return
        }


        const newStudent = {
            "id": valueInputCodeStudent,
            "name": valueInputNameStudent
        }
        addStudent(database, valueInputCodeStudent, valueInputNameStudent,
            ()=>{
                addStudentToSubject(database, valueInputCodeStudent, valueInputSubject)
                setListStudent([...listStudent, newStudent])    
            })
    
    }

    const listStudentFormatted = listStudent.map(student=>{
        const content = `${student.name} \nMatrícula: ${student.id}`
        return content
    })
    const ids = listStudent.map(student=>{ return student.id})

    const onClickItemList = (itemSelected) => {
        setModalVisible(true)
        setItemSelected(itemSelected)
    }


    const handleDeleteStudent = () => {
        deleteStudent(database, itemSelected.id, ()=>{
            itemSelected["feedback"] = "item deletado com sucesso"
            setItemSelected(itemSelected)
            getStudents(database, students =>{
                setListStudent(students)
           })   
        })
    
    }
    return(
        <BaseView>
            <ModalEditDelete
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            deleteFunc={handleDeleteStudent}
            />
            <Header headerTitle={"Estudantes"}/>
            <Text style={textStyles.error}>{error}</Text>
            <Text style={textStyles.label}>Disciplina:</Text>
            {listStudent.length > 0 ?
             <SubjectPicker disciplines={listSubject}  selectedHandler={setValueInputSubject}/>
             :
             <View style={buttonStyled.container}>
                <Button onPress={()=>{navigation.navigate("Subject")}} color={colorAddButton} title="Registrar disciplina"/>
            </View>}
            
            <Text style={textStyles.label}>Nome do estudante:</Text>
            <TextInput style={inputStyled.input} 
            onChangeText={setValueInputNameStudent}
            placeholder={"Nome do estudante"}/>

            <Text style={textStyles.label}>Número de matrícula:</Text>
            <TextInput style={inputStyled.input}
            onChangeText={setValueInputCodeStudent}
            placeholder={"Número de matrícula"}
            keyboardType="numeric"
            maxLength={10}
            />
            
            <View style={buttonStyled.container} >
                <Button
                disabled={listStudent.length < 1} 
                onPress={addStudentHandler}
                color={colorAddButton}
                title="adicionar estudante"/>
            </View>
            <BaseList 
            listItems={listStudentFormatted} 
            ids={ids} 
            customFunc={onClickItemList}/>
            </BaseView>
    )
}
