import { Picker } from "@react-native-picker/picker"
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function SubjectPicker({disciplines, selectedHandler}){
    const [selectedValue, setSelectedValue] = useState('java');
    const selectedValueHandler = (itemValue) =>{
        setSelectedValue(itemValue)
        selectedHandler(itemValue)
    }
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => selectedValueHandler(itemValue)}
            style={styles.picker}
            >
            {disciplines ? disciplines.map((discipline, index)=>{
                return <Picker.Item key={`${index}_${discipline}`} 
                label={discipline.name } 
                value={discipline.name} />
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