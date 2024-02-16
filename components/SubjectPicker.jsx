import { Picker } from "@react-native-picker/picker"
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function SubjectPicker({disciplines}){
    const [selectedValue, setSelectedValue] = useState('java');

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            style={styles.picker}
            >
                <Picker.Item label="Selecione a disciplina" value="" />
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