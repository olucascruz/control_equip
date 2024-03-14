import { View, Text, Button, TextInput} from "react-native"
import { useState, useContext } from "react";
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";
import { inputStyled } from "../../components/InputStyled";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { dataContext } from "../../contexts/Data";

export default function HomeScreen({navigation}){
    const {database, listSubject} = useContext(dataContext)
    const [error, setError] = useState("")
    const [listComputerLoan, setListComputerLoan] = useState([])
    const [valueInputStudent, setValueInputStudent] =useState(null)
    const [valueInputComputer, setValueInputComputer] =useState(null)
    const [valueInputSubject, setValueInputSubject] = useState(null)

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
            <Text style={textStyles.label}>Disciplina:</Text>
            {listSubject.length > 0 ?
             <SubjectPicker disciplines={listSubject} selectedHandler={setValueInputSubject}/>
            :
            <View style={buttonStyled.container}>
                <Button onPress={()=>{navigation.navigate("Subject")}} color={colorAddButton} title="Registrar disciplina"/>
            </View>}
            

            <Text style={textStyles.label}>Estudante:</Text>
            <TextInput
             style={inputStyled.input}
             value={valueInputStudent}
             onChangeText={setValueInputStudent}
             id={"iStudent"}
             placeholder="Buscar aluno"/>
            <Text style={textStyles.label}>Computador:</Text>
            <TextInput 
            style={inputStyled.input} 
            value={valueInputComputer}
            onChangeText={setValueInputComputer} 
            keyboardType="numeric"
            id={"iComputer"} 
            placeholder="Buscar computador"/>
            <View style={buttonStyled.container}>
                <Button disabled={listSubject.length < 1 } onPress={addLoan} color={colorAddButton} title="Registrar empréstimo"/>
            </View>
            
            <Text>{error}</Text>
            <ListHome listComputerLoans={listComputerLoan}/>
        </BaseView>
        )
}

