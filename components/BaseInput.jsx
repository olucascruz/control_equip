import { TextInput, StyleSheet } from "react-native"

export default function BaseInput({onValueChange, placeholder}){
    const handleChange = (text) => {
        onValueChange(text);
      };
    

    return(
        <TextInput onChangeText={handleChange} style={styles.input} 
        placeholder={placeholder}/>
        )

}

const styles = StyleSheet.create({
    input:{
        backgroundColor:"#fff",
        width: "70%",
        borderRadius:5,
        marginTop:50,
    },
})