import { View, Text, Button } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseInput from "../../components/BaseInput";
import BaseList from "../../components/BaseList";
import Header from "../../components/Header";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

export default function ComputerScreen() {
  const [listComputer, setListComputer] = useState([]);
  const [valueInputComputer, setValueInputComputer] = useState(null);

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("computerData", jsonValue);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("computerData");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await loadData();
      setListComputer(initialData);
    };

    fetchData();
  }, []);

  const addComputer = () => {
    if (!valueInputComputer) return;
    const updatedList = [...listComputer, valueInputComputer];
    setListComputer(updatedList);

    saveData(updatedList);
  };
    return(
        <BaseView>
            <Header headerTitle={"Computadores"}/>
            <Text style={textStyles.label}>Adicione um computador:</Text>
            <BaseInput onValueChange={setValueInputComputer} placeholder={"Número do computador"}/>
            <View style={buttonStyled.container}>
            <Button onPress={addComputer} color={colorAddButton}
            title="Adicionar computador"/>
            </View>
            <BaseList listItems={listComputer}/>
        </BaseView>

    )
}
