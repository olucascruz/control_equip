import { useState, useContext} from "react"
import { View, Text, Button, TextInput } from "react-native"

import BaseList from "../../components/BaseList"
import Header from "../../components/Header"
import BaseView from "../../components/BaseView"
import HourInput from "../../components/HourInput"
import ModalEditDelete from "../../components/ModalEditDelete"

import {inputStyled} from "../../components/InputStyled"
import { textStyles } from "../../components/TextStyles"
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

import { addSubject, deleteSubject, updateSubject, getSubjects } from "../../storage/subjectRepository"
import { dataContext } from "../../contexts/Data"

export default function SubjectScreen(){
    const {database, 
           listSubject, 
           setListSubject, 
           setSubjectSelected} = useContext(dataContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [valueSubject, setValueSubject] = useState(null)
    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)
    const [error, setError] = useState("") 
    const [itemSelected, setItemSelected] = useState("")
    
    const cleanInputs = () =>{
        setValueSubject("")
        setStartHour("")
        setEndHour("")
        setError("")
    }
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
    
    const validateSubject = () =>{
        if(!valueSubject || !startHour || !endHour){
            setError("Campos inválidos")
            return false
            } 
        if(!validateHours(startHour, endHour)){
            setError("Campos de hora inválidos")
            return false
        }
        return true
    }

    const checkIfSubjectExists = (subjectObject)=>{
        const IsSubjectExists = listSubject.some(object =>
            object['name'] == subjectObject['name'] || 
            (object['name'] == subjectObject['name'] &&
            object['start_time'] == subjectObject['start_time'] &&
            object['end_time'] == subjectObject['end_time']))
        return IsSubjectExists
    }
    const addSubjectHandler = () =>{
        
        const isValide = validateSubject()
        if(!isValide){
           setError("Campos de hora inválidos")
            return
        }
        const subjectObject = {
            "id":listSubject.length + 1,
            "name":valueSubject,
            "start_time": startHour,
            "end_time": endHour
        }

        const isSubjectExists = checkIfSubjectExists(subjectObject)
        
        if(isSubjectExists){
            setError("disciplina já existe")
            return
        }
        addSubject(database, valueSubject, startHour, endHour,()=>{
            setListSubject([...listSubject, subjectObject])
            getSubjects(database, subjects=>{
                setSubjectSelected(subjects[0])
            })
        
        })
        setError("")
    }

    const listSubjectFormatted = listSubject.map((subject)=>{
        let content = `${subject.name} \n${subject.start_time}-${subject.end_time}`
        return content
    })
    const ids = listSubject.map((subject)=>{return subject.id})

    const onClickItemList = (itemSelected) => {
        setModalVisible(true)
        cleanInputs()
        setItemSelected(itemSelected)
    }
    function Inputs(){
        return(
            <>
            {/* -------- */}
            <Text style={textStyles.error}>{error}</Text>
            
            <TextInput
             style={inputStyled.input}
             value={valueSubject}
             onChangeText={setValueSubject} 
             placeholder={"Nome da disciplina"}
             maxLength={40}/>
            <Text style={textStyles.label}>Hora de início:</Text>
            <HourInput
            value={startHour} 
            onValueChange={setStartHour} 
            placeholder={"Hora de inicio ex: 13:30"}/>
            <Text style={textStyles.label}>Hora de fim:</Text>
            <HourInput
            value={endHour} 
            onValueChange={setEndHour} 
            placeholder={"Hora de fim ex: 18:30"}/>

            {/* -------- */}
            </>
            )
    }
    const handleEditSubject = (setStateModal) =>{
        const isValide = validateSubject()
        if(!isValide) return
        const subjectObject = {
            "id":itemSelected.id,
            "name":valueSubject,
            "start_time": startHour,
            "end_time": endHour
        }

        const isSubjectExists = checkIfSubjectExists(subjectObject)
        
        if(isSubjectExists){
            setError("disciplina já existe")
            return
        }

        setStateModal("finish")
        updateSubject(database, itemSelected.id, valueSubject, startHour, endHour, ()=>{
            itemSelected["feedback"] = "Item atualizado"
            setItemSelected(itemSelected)
            getSubjects(database, (subjects)=>{
                setListSubject(subjects)
                setSubjectSelected(subjects[0])
            })
        })
    }
    
    const handleDeleteSubject = () =>{
        deleteSubject(database, itemSelected.id,()=>{
            itemSelected["feedback"] = "Item deletado"
            setItemSelected(itemSelected)
            getSubjects(database, (subjects)=>{
                setListSubject(subjects)
                if(subjects.length > 0){
                    setSubjectSelected(subjects[0])
                }else{
                    setSubjectSelected(null)
                }
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
            Inputs={Inputs}
            editFunc={handleEditSubject}
            deleteFunc={handleDeleteSubject}
            cleanCallback={cleanInputs}
            />
            
            
            <Header headerTitle={"Disciplina"}/>

            <Text style={textStyles.label}>Adicione a disciplina:</Text>
            
            {Inputs()}

            <View style={buttonStyled.container}>
                <Button onPress={addSubjectHandler} color={colorAddButton} title="Adicionar disciplina"/>
            </View>
            <BaseList
            listItems={listSubjectFormatted}
            customFunc={onClickItemList}
            ids={ids}/>
        </BaseView>
    )
}
