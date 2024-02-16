import { View,  Text, Button} from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import { useState, useRef } from "react"
import Header from "../../components/Header"
import BaseView from "../../components/BaseView"

export default function SubjectScreen(){
    const [listSubject, setListSubject] = useState([])
    const [valueSubject, setValueSubject] = useState(null)
    const addSubject = () =>{
        if(!valueSubject) return
        setListSubject([...listSubject, valueSubject])
    
    }
    return(
        <BaseView>

            <Header headerTitle={"Disciplina"}/>
            <Text>Adicione a disciplina:</Text>
            <BaseInput onValueChange={setValueSubject} placeholder={"Nome da disciplina"}/>
            <Button onPress={addSubject} color={"#44ff5d"} title="ok"/>

            <BaseList listItems={listSubject}/>
        </BaseView>
    )
}
