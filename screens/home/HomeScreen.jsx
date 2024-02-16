import { View, Text, Button, StyleSheet} from "react-native"
import { useState, useRef } from "react";
import BaseInput from "../../components/BaseInput";
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";
export default function HomeScreen(){
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
            <Header headerTitle={"controle de equipamentos"}/>
            <Text>Disciplinas</Text>
            <SubjectPicker disciplines={[{"name":"Português"}]}/>
        
            <BaseInput onValueChange={setValueInputStudent} id={"iStudent"} placeholder="Buscar aluno"/>
            <BaseInput onValueChange={setValueInputComputer} id={"iComputer"} placeholder="Buscar computador"/>
            <Text>Hello World</Text>
            <Button onPress={addLoan} color={"#44ff5d"} title="ok"/>
            <ListHome listComputerLoans={listComputerLoan}/>
        </BaseView>
        )
}

