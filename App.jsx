import { View, Text, StyleSheet} from "react-native"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/home/HomeScreen";
const Tab = createBottomTabNavigator();




function StudentScreen(){
    return(
        <View>

            <Text>Hello student</Text>
        </View>
        
        )
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Student" component={StudentScreen} />
    </Tab.Navigator>
  );
}
export default function App(){
    return(
    <NavigationContainer>
        <MyTabs></MyTabs>
    </NavigationContainer>
    
    )
}

