import { View, StyleSheet } from "react-native";


export default function BaseView({children}){

    return(
            <View style={styles.container}>
             {children}
            </View>
        )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#ececec",
        alignItems:"center"  
    },
})