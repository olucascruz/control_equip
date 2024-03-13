import { View,  Text, Button} from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import { useState, useContext } from "react"
import Header from "../../components/Header";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { dataContext } from "../../contexts/Data";
import { addMachine, deleteMachine, getMachines } from "../../storage/machineRepository";
import ModalEditDelete from "../../components/ModalEditDelete"

export default function MachineScreen(){
    const {database, listMachine, setListMachine} = useContext(dataContext)
    const [valueInputMachine, setValueInputMachine] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState("")

    const addMachineHandler = () =>{
        if(!valueInputMachine) return
        const codeMachine = {"id":valueInputMachine}
        addMachine(database, valueInputMachine)
        setListMachine([...listMachine, codeMachine])
    }
    
    const listMachineFormatted = listMachine.map(machine =>{
        const content = machine.id
        return content
    })
    const ids = listMachine.map((machine)=>{return machine.id})
    const Inputs = ()=>{
        return(
            <BaseInput onValueChange={setValueInputMachine} placeholder={"Número do computador"}/>
            )
    
    }
    const onClickItemList = (itemSelected) => {
        setModalVisible(true)
        setItemSelected(itemSelected)
    }

    const handleDeleteMachine = () =>{
        deleteMachine(database, itemSelected.id, ()=>{
            getMachines(database, machines =>{
                setListMachine(machines)
                itemSelected["feedback"] = "item deletado com sucesso"
                setItemSelected(itemSelected)
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
            deleteFunc={handleDeleteMachine}/>
            
            <Header headerTitle={"Computadores"}/>
            <Text style={textStyles.label}>Adicione um computador:</Text>
            <Inputs/>
            <View style={buttonStyled.container}>
            <Button onPress={addMachineHandler} color={colorAddButton}
            title="Adicionar computador"/>
            </View>
            <BaseList 
            listItems={listMachineFormatted}
            customFunc={onClickItemList}
            ids={ids}/>
        </BaseView>

    )
}
