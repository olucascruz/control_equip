import { View, Text, TextInput, Button, StyleSheet} from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react";
import ListHome from "../../components/ListHome";
export default function HomeScreen(){
    const [selectedValue, setSelectedValue] = useState('java');
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Controle de equipamentos</Text>
            </View>
            <Text>Disciplinas</Text>
            <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            style={styles.picker}
            >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
            <Picker.Item label="Python" value="python" />
            <Picker.Item label="C#" value="csharp" />
            <Picker.Item label="Ruby" value="ruby" />
            </Picker>
            <TextInput style={styles.input} placeholder="Buscar aluno"/>
            <TextInput style={styles.input} placeholder="Buscar computador"/>
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
    header:{
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#31d422",
        height:150,
        marginTop: -50,
        marginLeft:"auto",
        marginRight:"auto",
        width: 300,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
    },
    input:{
        backgroundColor:"#fff",
        width: "70%",
        borderRadius:5,
        marginTop:50,
    },
    picker: {
        width: 200,
        height: 50,
        marginTop: 10,
        backgroundColor:"#fff",
      },

})