import { View,  Text, Button} from "react-native"
import BaseInput from "../../components/BaseInput"
import BaseList from "../../components/BaseList"
import { useState, useRef } from "react"
import Header from "../../components/Header";
import BaseView from "../../components/BaseView";

export default function ComputerScreen(){
    const [listComputer, setListComputer] = useState([])
    const [valueInputComputer, setValueInputComputer] = useState(null)


    const addComputer = () =>{
        if(!valueInputComputer)return
        setListComputer(...listComputer, valueInputComputer)
    }
    
    return(
        <BaseView>
            <Header headerTitle={"Computadores"}/>
            <Text>Adicione um computador:</Text>
            <BaseInput onValueChange={setValueInputComputer} placeholder={"Número do computador"}/>
            <Button onPress={addComputer} color={"#44ff5d"} title="ok"/>
            <BaseList listItems={listComputer}/>
        </BaseView>

    )
}
