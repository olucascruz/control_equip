import { View, Text, StyleSheet} from "react-native"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home/HomeScreen";
import StudentScreen from "./screens/student/StudentScreen"
import SubjectScreen from "./screens/subject/SubjectScreen";
import ComputerScreen from "./screens/computer/ComputerScreen";

const Tab = createBottomTabNavigator();




function MyTabs() {
  const iconMap = {
    'Home': 'home',
    'Student': 'person',
    'Computer': 'desktop',
    'Subject': 'book',
  };
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: 'green',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'gray',
        
      },
      
      tabBarActiveTintColor: '#2A9F85',//icon active
      tabBarInactiveTintColor: '#C7C7C7', // icon desativado
    })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Student" component={StudentScreen} />
      <Tab.Screen name="Computer" component={ComputerScreen} />
      <Tab.Screen name="Subject" component={SubjectScreen} />

    </Tab.Navigator>
  )
}
export default function App(){
    return(
    <NavigationContainer>
        <MyTabs></MyTabs>
    </NavigationContainer>
    
    )
}

