import { View, Text, Button, StyleSheet} from "react-native"
import { useState, useRef } from "react";
import BaseInput from "../../components/BaseInput";
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

export default function HomeScreen(){
    const [error, setError] = useState("")
    const [listComputerLoan, setListComputerLoan] = useState([])
    const [valueInputStudent, setValueInputStudent] =useState(null)
    const [valueInputComputer, setValueInputComputer] =useState(null)


    const addLoan = ()=>{
        if (!valueInputStudent && !valueInputComputer) return      

        const computerLoan = {
            "student": valueInputStudent,
            "computer": valueInputComputer,
        }

        setListComputerLoan([...listComputerLoan, computerLoan])
    }
    return(
        <BaseView>
            <Header headerTitle={"Controle de equipamentos"}/>
            <Text style={textStyles.label}>Disciplinas:</Text>
            <SubjectPicker disciplines={[{"name":"Português"}]}/>

            <Text style={textStyles.label}>Estudante:</Text>
            <BaseInput onValueChange={setValueInputStudent} id={"iStudent"} placeholder="Buscar aluno"/>
            <Text style={textStyles.label}>Computador:</Text>
            <BaseInput onValueChange={setValueInputComputer} id={"iComputer"} placeholder="Buscar computador"/>
            <View style={buttonStyled.container}>
                <Button onPress={addLoan} color={colorAddButton} title="Registrar empréstimo"/>
            </View>
            <Text>{error}</Text>
            <ListHome listComputerLoans={listComputerLoan}/>
        </BaseView>
        )
}

