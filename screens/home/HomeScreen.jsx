import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BaseInput from "../../components/BaseInput";
import ListHome from "../../components/ListHome";
import Header from "../../components/Header";
import SubjectPicker from "../../components/SubjectPicker";
import BaseView from "../../components/BaseView";
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

export default function HomeScreen() {
  const [error, setError] = useState("");
  const [listComputerLoan, setListComputerLoan] = useState([]);
  const [valueInputStudent, setValueInputStudent] = useState(null);
  const [valueInputComputer, setValueInputComputer] = useState(null);

  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("homeData", jsonValue);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("homeData");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const initialData = await loadData();
      setListComputerLoan(initialData);
    };

    fetchData();
  }, []);

  const addLoan = () => {
    if (!valueInputStudent && !valueInputComputer) return;

    const computerLoan = {
      student: valueInputStudent,
      computer: valueInputComputer,
    };

    const updatedList = [...listComputerLoan, computerLoan];
    setListComputerLoan(updatedList);

    saveData(updatedList);
  };
    return(
        <BaseView>
            <Header headerTitle={"Controle de equipamentos"}/>
            <Text style={textStyles.label}>Disciplinas:</Text>
            <SubjectPicker disciplines={[{"name":"Português"}]}/>

            <Text style={textStyles.label}>Estudante:</Text>
            <BaseInput onValueChange={setValueInputStudent} id={"iStudent"} placeholder="Buscar aluno"/>
            <Text style={textStyles.label}>Computador:</Text>
            <BaseInput onValueChange={setValueInputComputer} id={"iComputer"} placeholder="Buscar computador"/>
            <View style={buttonStyled.container}>
                <Button onPress={addLoan} color={colorAddButton} title="Registrar empréstimo"/>
            </View>
            <Text>{error}</Text>
            <ListHome listComputerLoans={listComputerLoan}/>
        </BaseView>
        )
}