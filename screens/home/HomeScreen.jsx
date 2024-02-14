import { View, Text, Button, StyleSheet} from "react-native"
import { useState } from "react";
import BaseInput from "../../components/BaseInput";
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
export default function HomeScreen(){
    return(
        <View style={styles.container}>
            <Header headerTitle={"controle de equipamentos"}/>
            <Text>Disciplinas</Text>
            <SubjectPicker disciplines={[{"name":"Portugues"}]}/>
        
            <BaseInput placeholder="Buscar aluno"/>
            <BaseInput placeholder="Buscar computador"/>
            <Text>Hello World</Text>
            <Button color={"#44ff5d"} title="ok"/>
            <ListHome listComputerLoans={
                [{'student':'lucas', 'computer':'000000'},{'student':'lucas', 'computer':'000000'},{'student':'lucas', 'computer':'000000'}]
                }/>
        </View>
        )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#ececec",
        alignItems:"center"    
    },
})