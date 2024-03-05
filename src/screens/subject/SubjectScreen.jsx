import { View,  Text, Button} from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import { useState, useEffect } from "react"
import Header from "../../components/Header"
import BaseView from "../../components/BaseView"
import HourInput from "../../components/HourInput"
import { textStyles } from "../../components/TextStyles"
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";
import { getDBConnection } from "../../storage/db"
import { addSubject, getSubjects } from "../../storage/subjectRepository"

export default function SubjectScreen(){
    const [listSubject, setListSubject] = useState([])
    const [listSubjectPT, setListSubjectPT] = useState([])

    const [valueSubject, setValueSubject] = useState(null)
    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)
    const [error, setError] = useState("")


    

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
            "startHour": startHour,
            "endHour": endHour
        }

        const objectIsEqual = listSubject.some(object =>
        object['name'] == subjectObject['name'] || 
        (object['name'] == subjectObject['name'] &&
        object['startHour'] == subjectObject['startHour'] &&
        object['endHour'] == subjectObject['endHour']))

        if(objectIsEqual){
            setError("disciplina já existe")
            return
        }

        addSubject(valueSubject, startHour, endHour)

        const newSubjectPT = {
            name: valueSubject,
            rangeHour: `${startHour} - ${endHour}`
        }

        setListSubjectPT([...listSubjectPT, newSubjectPT])
        setListSubject([...listSubject, subjectObject])
        setError("")
    }
    return(
        <BaseView>

            <Header headerTitle={"Disciplina"}/>
            <Text style={textStyles.label}>Adicione a disciplina:</Text>
            <BaseInput onValueChange={setValueSubject} placeholder={"Nome da disciplina"}/>
            <Text style={textStyles.label}>Hora início:</Text>
            <HourInput onValueChange={setStartHour} placeholder={"13:30"}/>
            <Text style={textStyles.label}>Hora fim:</Text>
            <HourInput onValueChange={setEndHour} placeholder={"18:30"}/>
            <View style={buttonStyled.container}>
                <Button onPress={addSubjectHandler} color={colorAddButton} title="Adicionar disciplina"/>
            </View>
            <Text style={textStyles.error}>{error}</Text>
            <BaseList listItems={listSubject} showKey={true}/>
        </BaseView>
    )
}
