import { View, Text, Button } from "react-native"
import { useState, useContext } from "react"
import Header from "../../components/Header"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import SubjectPicker from "../../components/SubjectPicker"
import BaseView from "../../components/BaseView"
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { dataContext } from "../../contexts/Data"
import { addStudent } from "../../storage/studentRepository"
import { addStudentToSubject } from "../../storage/studentSubjectRepository"


export default function StudentScreen(){
    const {database, listSubject, listStudent, setListStudent} = useContext(dataContext)
    const [valueInputNameStudent, setValueInputNameStudent] = useState(null)
    const [valueInputCodeStudent, setValueInputCodeStudent] = useState(null)
    const [valueInputSubject, setValueInputSubject] = useState(null)


    
    const addStudentHandler = () =>{
        if( !valueInputSubject ||
            !valueInputNameStudent || 
            !valueInputCodeStudent ) return 

        const newStudent = {
            "id": valueInputNameStudent,
            "name": valueInputCodeStudent
        }
        addStudent(database,valueInputCodeStudent, valueInputNameStudent)
        setTimeout(() => {
            addStudentToSubject(database, valueInputCodeStudent, valueInputSubject)
        }, 300);
        setListStudent([...listStudent, newStudent])
    
    }

    return(
        <BaseView>
            <Header headerTitle={"Estudantes"}/>
            <Text style={textStyles.label}>Disciplina:</Text>
            <SubjectPicker disciplines={listSubject}  selectedHandler={setValueInputSubject}/>
            <Text style={textStyles.label}>Nome do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputNameStudent}
            placeholder={"Nome do estudante"}/>

            <Text style={textStyles.label}>Código do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputCodeStudent}
            placeholder={"Código do estudante"}/>
            <View style={buttonStyled.container} >
                <Button onPress={addStudentHandler}
                        color={colorAddButton}
                        title="adicionar estudante"/>
            </View>
            <BaseList listItems={listStudent} showKey={true}/>
        </BaseView>
    )
}
