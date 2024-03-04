import { View, Text, StyleSheet} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home/HomeScreen";
import StudentScreen from "./screens/student/StudentScreen"
import SubjectScreen from "./screens/subject/SubjectScreen";
import ComputerScreen from "./screens/computer/ComputerScreen";
import { useEffect } from "react";

import { initDB } from "./storage/db.js";


const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarOptions: { 
        showIcon: false 
        
     },
     tabBarIcon: () => null,
     tabBarLabelStyle: { 
      marginBottom: 15,
      fontSize: 15, // Tamanho da fonte
     },
     tabBarStyle: {
        height:50,
        backgroundColor: 'green',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'gray',
      },
      
      tabBarInactiveBackgroundColor: 'green',
      tabBarActiveBackgroundColor:"#1db436",
      tabBarActiveTintColor: '#4efcd6',//icon active
      tabBarInactiveTintColor: '#e7e7e7', // icon desativado
    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }}  />
      <Tab.Screen name="Student" component={StudentScreen} options={{ tabBarLabel: 'Estudante' }}/>
      <Tab.Screen name="Computer" component={ComputerScreen} options={{ tabBarLabel: 'Computador' }} />
      <Tab.Screen name="Subject" component={SubjectScreen} options={{ tabBarLabel: 'Disciplina' }} />

    </Tab.Navigator>
  )
}


export default function App(){
    useEffect(()=>{
      initDB()
    }, [])
    return(
    <NavigationContainer>
        <MyTabs></MyTabs>
    </NavigationContainer>
    )
}

