import { useState } from "react"
import { View,  Text, Button, Modal, StyleSheet } from "react-native"
import { textStyles } from "./TextStyles"
import { buttonStyled, colorAddButton } from "./ButtonStyled";
export default function ModalEditDelete({modalVisible, setModalVisible, itemSelected, setItemSelected, Inputs, editFunc, deleteFunc}){
    // wait, delete, edit, finish
    const [stateModal, setStateModal] = useState("wait")
    const hiddenModal = () => {
        setModalVisible(false);
        setStateModal("wait")
        setItemSelected(null)
    };

    const handleSubject = (operations) =>{
        if(operations=="delete")
        {
        deleteFunc()
        }
        if(operations=="edit")
        {
        editFunc()
        }

        setStateModal("finish")
    }

    return(
        <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {stateModal === "wait" ? (
                    <>
                        <Text>{itemSelected ? itemSelected.content:null}</Text>
                        <View style={styles.modalButtonsView}>
                            <View style={buttonStyled.container}>
                                <Button onPress={()=>{setStateModal("edit")}} color={colorAddButton} title="Editar"/>
                            </View>
                            <View style={buttonStyled.container}>
                                <Button onPress={()=>{setStateModal("delete")}} color={colorAddButton} title="Deletar"/>
                            </View>
                            <View style={buttonStyled.container}>
                                <Button onPress={hiddenModal} color={colorAddButton} title="Cancelar"/>
                            </View>
                        </View>
                    </>
                    ) : stateModal === "edit" ? (
                    <>
                        <Text style={textStyles.label}>Edite a disciplina:</Text>
                        
                        {Inputs()}
                        <View style={buttonStyled.container}>
                            <Button onPress={()=>{handleSubject("edit")}} color={colorAddButton} title="Editar"/>
                        </View>
                        <View style={buttonStyled.container}>
                            <Button onPress={hiddenModal} color={colorAddButton} title="Cancelar"/>
                        </View>
                    </>
                    ): stateModal === "delete" ?(
                    <>
                        <Text style={textStyles.label}>Tem certeza que seja deletar?</Text>
                        <View style={buttonStyled.container}>
                            <Button onPress={()=>{handleSubject("delete")}} color={colorAddButton} title="Confirmar"/>
                        </View>
                        <View style={buttonStyled.container}>
                            <Button onPress={hiddenModal} color={colorAddButton} title="Cancelar"/>
                        </View>
                    </>
                    ): stateModal === "finish" ? (
                        <>
                           <Text style={textStyles.label}>{itemSelected ?itemSelected.feedback:null}</Text>

                           <View style={buttonStyled.container}>
                            <Button onPress={hiddenModal} color={colorAddButton} title="OK "/>
                        </View>
                        </>
                        ) : null
                
                }
                            
                </View>
            </View>
        </Modal>

        )


}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',        
    },
    modalContent: {
        alignItems: 'center',

        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        height:"80%",
        width:"100%"
    },
    modalButtonsView:{
        flex:1,
        alignItems:"flex-end",
        alignItems:"center"
    },
    modalButton:{
        width:"100%",
        backgroundColor:"red"       
    }
})