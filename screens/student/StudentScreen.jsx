import { View, Text, TextInput, Button, StyleSheet} from "react-native"
import Header from "../../components/Header"
import BaseInput from "../../components/BaseInput"
import SubjectPicker from "../../components/SubjectPicker"
export default function StudentScreen(){
    return(
        <View>

            <Header headerTitle={"Estudantes"}/>
            <Text>Hello student</Text>
            <SubjectPicker/>
            <BaseInput placeholder={"nome do aluno"}/>
            <BaseInput placeholder={"Código do aluno"}/>

        </View>
    )
}