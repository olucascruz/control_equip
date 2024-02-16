import { View, Text, Button } from "react-native"
import { useState } from "react"
import Header from "../../components/Header"
import BaseInput from "../../components/BaseInput"
import SubjectPicker from "../../components/SubjectPicker"
import BaseView from "../../components/BaseView"
export default function StudentScreen(){
    const [listStudents, setListStudent] = useState([])
    const [valueInputNameStudent, setValueInputNameStudent] = useState(null)
    const [valueInputCodeStudent, setValueInputCodeStudent] = useState(null)

    
    const addStudent = () =>{
        if(!valueInputNameStudent && !valueInputCodeStudent) return 

        const newStudent = {
            "id": valueInputNameStudent,
            "name": valueInputCodeStudent
        }

        setListStudent([...listStudents, newStudent])
    
    }

    return(
        <BaseView>
            <Header headerTitle={"Estudantes"}/>
            <Text>Hello student</Text>
            <SubjectPicker/>
            <BaseInput 
            onValueChange={setValueInputNameStudent}
            placeholder={"nome do aluno"}/>
            <BaseInput 
            onValueChange={setValueInputCodeStudent}
            placeholder={"Código do aluno"}/>
            <Button onPress={addStudent} color={"#44ff5d"} title="ok"/>
        </BaseView>
    )
}
