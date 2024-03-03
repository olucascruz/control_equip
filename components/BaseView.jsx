import { ScrollView, View, StyleSheet } from "react-native";


export default function BaseView({children}){

    return(
        <ScrollView>
            <View style={styles.container}>
             {children}
            </View>
        </ScrollView>
        )
}


const styles = StyleSheet.create({
    container:{
        height:800,
        flex:1,
        backgroundColor: "#ececec",
        alignItems:"center"  
    },
})