import { Picker } from "@react-native-picker/picker"
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function SubjectPicker({disciplines, selectedHandler, selectedValue}){
    const selectedValueHandler = (itemValue) =>{
        selectedHandler(itemValue)
    }
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={itemValue => selectedValueHandler(itemValue)}
            style={styles.picker}
            >
            {disciplines ? disciplines.map((discipline, index)=>{
                return <Picker.Item key={`${index}_${discipline}`} 
                label={discipline.name } 
                value={discipline} />
            }): null}
            </Picker>
            )

}

const styles = StyleSheet.create({
    picker: {
        width: 200,
        height: 50,
        marginTop: 10,
        backgroundColor:"#fff",
      },
})