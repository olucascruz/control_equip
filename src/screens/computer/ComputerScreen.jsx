import { View,  Text, Button} from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import { useState, useContext } from "react"
import Header from "../../components/Header";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { dataContext } from "../../contexts/Data";
import { addMachine } from "../../storage/machineRepository";

export default function ComputerScreen(){
    const {listComputer, setListComputer} = useContext(dataContext)
    const [valueInputComputer, setValueInputComputer] = useState(null)

    const addComputer = () =>{
        if(!valueInputComputer) return
        const codeComputer = {"id":valueInputComputer}
        addMachine(valueInputComputer)
        setListComputer([...listComputer, codeComputer])
    }
    
    return(
        <BaseView>
            <Header headerTitle={"Computadores"}/>
            <Text style={textStyles.label}>Adicione um computador:</Text>
            <BaseInput onValueChange={setValueInputComputer} placeholder={"Número do computador"}/>
            <View style={buttonStyled.container}>
            <Button onPress={addComputer} color={colorAddButton}
            title="Adicionar computador"/>
            </View>
            <BaseList listItems={listComputer}/>
        </BaseView>

    )
}
