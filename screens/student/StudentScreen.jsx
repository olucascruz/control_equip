import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header";
import BaseInput from "../../components/BaseInput";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

export default function StudentScreen() {
  const [listStudents, setListStudent] = useState([]);
  const [valueInputNameStudent, setValueInputNameStudent] = useState(null);
  const [valueInputCodeStudent, setValueInputCodeStudent] = useState(null);

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("studentData", jsonValue);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("studentData");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await loadData();
      setListStudent(initialData);
    };

    fetchData();
  }, []);

  const addStudent = () => {
    if (!valueInputNameStudent || !valueInputCodeStudent) return;

    const newStudent = {
      id: valueInputNameStudent,
      name: valueInputCodeStudent,
    };

    const updatedList = [...listStudents, newStudent];
    setListStudent(updatedList);

    saveData(updatedList);
  };

    return(
        <BaseView>
            <Header headerTitle={"Estudantes"}/>
            <SubjectPicker/>
            <Text style={textStyles.label}>Nome do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputNameStudent}
            placeholder={"nome do estudante"}/>

            <Text style={textStyles.label}>Código do estudante:</Text>
            <BaseInput 
            onValueChange={setValueInputCodeStudent}
            placeholder={"Código do estudante"}/>
            <View style={buttonStyled.container} >
                <Button onPress={addStudent}
                        color={colorAddButton}
                        title="adicionar estudante"/>
            </View>
        </BaseView>
    )
}
