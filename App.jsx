import {StyleSheet} from "react-native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/home/HomeScreen.jsx";
import StudentScreen from "./src/screens/home/HomeScreen.jsx"
import SubjectScreen from "./src/screens/subject/SubjectScreen.jsx";
import ComputerScreen from "./src/screens/computer/ComputerScreen.jsx";
import DataProvider from "./src/contexts/Data.jsx";

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
    return(
    <NavigationContainer>
      <DataProvider>
        <MyTabs></MyTabs>
      </DataProvider>
    </NavigationContainer>
    )
}

