import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseInput from "../../components/BaseInput";
import BaseList from "../../components/BaseList";
import Header from "../../components/Header";
import BaseView from "../../components/BaseView";
import HourInput from "../../components/HourInput";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

export default function SubjectScreen() {
  const [listSubject, setListSubject] = useState([]);
  const [valueSubject, setValueSubject] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [error, setError] = useState("");

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("subjectData", jsonValue);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("subjectData");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await loadData();
      setListSubject(initialData);
    };

    fetchData();
  }, []);

  const addSubject = () => {
    if (!valueSubject || !startHour || !endHour) {
      setError("Campos inválidos");
      return;
    }
    if (!validateHours(startHour, endHour)) {
      setError("Campos de hora inválidos");
      return;
    }

    const subjectObject = {
      name: valueSubject,
      startHour: startHour,
      endHour: endHour,
    };

    const updatedList = [...listSubject, subjectObject];
    setListSubject(updatedList);

    saveData(updatedList);
  };
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
                <Button onPress={addSubject} color={colorAddButton} title="Adicionar disciplina"/>
            </View>
            <Text style={textStyles.error}>{error}</Text>
            <BaseList listItems={listSubject}/>
        </BaseView>
    )
}
