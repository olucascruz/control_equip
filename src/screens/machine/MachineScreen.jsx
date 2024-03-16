// core react
import { useState, useContext} from "react"
import { View,  Text, Button, TextInput} from "react-native"

// Components
import BaseView from "../../components/BaseView";
import BaseList from "../../components/BaseList"
import Header from "../../components/Header";
import ModalEditDelete from "../../components/ModalEditDelete"

// Styled
import {inputStyled} from "../../components/InputStyled"
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

// storage and data
import { dataContext } from "../../contexts/Data";
import { addMachine, deleteMachine, getMachines } from "../../storage/machineRepository";

export default function MachineScreen(){
    const {database, listMachine, setListMachine} = useContext(dataContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [valueInputMachine, setValueInputMachine] = useState("")
    const [itemSelected, setItemSelected] = useState({})
    const [error, setError] = useState("")
    const errorInvalideCodeString = "Código invalido"

    const addMachineHandler = () =>{
        console.log();
        if(!valueInputMachine) {
            setError(errorInvalideCodeString)   
            return
        }
        if(valueInputMachine.length < 10){
            setError(errorInvalideCodeString)   
            return
        }

        if (! /^\d+$/.test(valueInputMachine)) {
            setError(errorInvalideCodeString)
            return
        }
        const codeMachine = {"id":valueInputMachine}
        addMachine(database, valueInputMachine)
        setListMachine([...listMachine, codeMachine])
    }
    
    const listMachineFormatted = listMachine.map(machine =>{
        const content = machine.id
        return content
    })
    const ids = listMachine.map((machine)=>{return machine.id})
    
    const onClickItemList = (itemSelected) => {
        setModalVisible(true)
        setItemSelected(itemSelected)
    }

    const handleDeleteMachine = () =>{
        deleteMachine(database, itemSelected.id, ()=>{
            itemSelected["feedback"] = "item deletado com sucesso"
            setItemSelected(itemSelected)
            getMachines(database, machines =>{
                setListMachine(machines)    
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
            <Text style={textStyles.error}>{error}</Text>
            <Text style={textStyles.label}>Adicione um computador:</Text>
            <TextInput 
            style={inputStyled.input} 
            value={valueInputMachine}
            onChangeText={text=>setValueInputMachine(text)} 
            placeholder={"Número do computador"}
            keyboardType="numeric"
            maxLength={10}
            />
            <View style={buttonStyled.container}>
                <Button 
                onPress={addMachineHandler}
                color={colorAddButton}
                title="Adicionar computador"/>
            </View>
            <BaseList 
            listItems={listMachineFormatted}
            customFunc={onClickItemList}
            ids={ids}
            />
        </BaseView>

    )
}
