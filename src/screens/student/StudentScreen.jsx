import { View, Text, Button } from "react-native"
import { useState, useContext } from "react"
import Header from "../../components/Header"
import BaseInput from "../../components/BaseInput"
import SubjectPicker from "../../components/SubjectPicker"
import BaseView from "../../components/BaseView"
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { dataContext } from "../../contexts/Data"

export default function StudentScreen(){
    const {listSubject} = useContext(dataContext)
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
            <Text style={textStyles.label}>Disciplina:</Text>
            <SubjectPicker disciplines={listSubject}/>
            <Text style={textStyles.label}>Nome do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputNameStudent}
            placeholder={"Nome do estudante"}/>

            <Text style={textStyles.label}>Código do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputCodeStudent}
            placeholder={"Código do estudante"}/>
            <View style={buttonStyled.container} >
                <Button onPress={addStudent}
                        color={colorAddButton}
                        title="adicionar estudante"/>
            </View>
        </BaseView>
    )
}
