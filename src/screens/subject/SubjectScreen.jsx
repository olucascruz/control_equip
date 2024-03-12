import { useState, useContext} from "react"
import { View,  Text, Button, Alert, Modal, TextInput, StyleSheet } from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import Header from "../../components/Header"
import BaseView from "../../components/BaseView"
import HourInput from "../../components/HourInput"
import { textStyles } from "../../components/TextStyles"
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { addSubject } from "../../storage/subjectRepository"

import { dataContext } from "../../contexts/Data"

export default function SubjectScreen(){
    const {database, listSubject, setListSubject} = useContext(dataContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [valueSubject, setValueSubject] = useState(null)
    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)
    const [error, setError] = useState("")
    const [inputValue, setInputValue] = useState("");   
    const [textModal, setTextModal] = useState("")
    // wait, delete and edit
    const [stateModal, setStateModal] = useState("wait")
    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const handleConfirm = () => {
        // Aqui você pode fazer o que quiser com o valor do input
        console.log('Valor do input:', inputValue);
        setModalVisible(false);
    };

    const validateHours = (start, end) => {
        // Validar os formatos HH:MM
        const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        const isValidFormat = regex.test(start) && regex.test(end);
    
        // Verificar se o segundo horário é maior que o primeiro
        if (isValidFormat) {
          const [startHour, startMinutes] = start.split(':').map(Number);
          const [endHour, endMinutes] = end.split(':').map(Number);
          return endHour > startHour || (endHour === startHour && endMinutes > startMinutes);
        }
        return false;
      };
    
    const addSubjectHandler = async () =>{
        if(!valueSubject || !startHour || !endHour){
        setError("Campos inválidos")
        return
        } 
        if(!validateHours(startHour, endHour)){
            setError("Campos de hora inválidos")
            return 
        }
        const subjectObject = {
            "name":valueSubject,
            "start_time": startHour,
            "end_time": endHour
        }

        const objectIsEqual = listSubject.some(object =>
        object['name'] == subjectObject['name'] || 
        (object['name'] == subjectObject['name'] &&
        object['start_time'] == subjectObject['start_time'] &&
        object['end_time'] == subjectObject['end_time']))

        if(objectIsEqual){
            setError("disciplina já existe")
            return
        }
        console.log("before addSubject")
        addSubject(database, valueSubject, startHour, endHour, (results)=>{
            console.log('Item adicionado com sucesso!', results);
        })

        subjectObject["id"] = listSubject.length + 1
        setListSubject([...listSubject, subjectObject])
        setError("")
    }

    const listSubjectFormatted = listSubject.map((subject)=>{
        let content = `${subject.name} \n${subject.start_time}-${subject.end_time}`
        return content
    })

    const handlerSubject = (content) => {
        // Alert.alert("click", "click")
        setModalVisible(true)
        setTextModal(content)
    }
    return(
        <BaseView>
             <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* <TextInput
                        style={styles.input}
                        placeholder="Digite algo..."
                        value={inputValue}
                        onChangeText={handleInputChange}
                        /> */}
                        {stateModal === "wait" ? (

                        <>
                            <Text>{textModal}</Text>
                            <View style={styles.modalButtons}>
                                <Button title="Editar" onPress={handleConfirm} />
                                <Button title="Deletar" onPress={handleConfirm} />
                            </View>
                        </>
                        ) : stateModal === "edit" ? (<><Text style={textStyles.label}>Adicione a disciplina:</Text>
                        <BaseInput onValueChange={setValueSubject} placeholder={"Nome da disciplina"}/>
                        <Text style={textStyles.label}>Hora início:</Text>
                        <HourInput onValueChange={setStartHour} placeholder={"Hora de inicio ex: 13:30"}/>
                        <Text style={textStyles.label}>Hora fim:</Text>
                        <HourInput onValueChange={setEndHour} placeholder={"Hora de fim ex: 18:30"}/>
                        <Button title="Confirmar" onPress={handleConfirm} />
                        <Button title="Cancelar" onPress={handleConfirm} />
                        </>): null}
                                
                    </View>
                </View>
            </Modal>

            <Header headerTitle={"Disciplina"}/>
            <Text style={textStyles.label}>Adicione a disciplina:</Text>
            <BaseInput onValueChange={setValueSubject} placeholder={"Nome da disciplina"}/>
            <Text style={textStyles.label}>Hora início:</Text>
            <HourInput onValueChange={setStartHour} placeholder={"Hora de inicio ex: 13:30"}/>
            <Text style={textStyles.label}>Hora fim:</Text>
            <HourInput onValueChange={setEndHour} placeholder={"Hora de fim ex: 18:30"}/>
            <View style={buttonStyled.container}>
                <Button onPress={addSubjectHandler} color={colorAddButton} title="Adicionar disciplina"/>
            </View>
            <Text style={textStyles.error}>{error}</Text>
            <BaseList listItems={listSubjectFormatted} customAlert={handlerSubject}/>
        </BaseView>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        height:"25%",
        width: "60%"
    },
    modalButtons:{
        flex:1,
        alignItems:"flex-end",
        justifyContent:"space-between",
        flexDirection:"row",
    }
})