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
    const {database, listMachine, setListMachine} = useContext(dataContext)
    const [valueInputMachine, setValueInputMachine] = useState(null)

    const addMachineHandler = () =>{
        if(!valueInputMachine) return
        const codeMachine = {"id":valueInputMachine}
        addMachine(database, valueInputMachine)
        setListMachine([...listMachine, codeMachine])
    }
    
    return(
        <BaseView>
            <Header headerTitle={"Computadores"}/>
            <Text style={textStyles.label}>Adicione um computador:</Text>
            <BaseInput onValueChange={setValueInputMachine} placeholder={"Número do computador"}/>
            <View style={buttonStyled.container}>
            <Button onPress={addMachineHandler} color={colorAddButton}
            title="Adicionar computador"/>
            </View>
            <BaseList listItems={listMachine}/>
        </BaseView>

    )
}
