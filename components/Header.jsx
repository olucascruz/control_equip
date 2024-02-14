
import { View, Text, StyleSheet} from "react-native"

export default function Header({headerTitle}){
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>{headerTitle}</Text>
        </View>
        )
}

const styles = StyleSheet.create({
    header:{
        display:"flex",
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#31d422",
        height:150,
        marginTop: -50,
        marginLeft:"auto",
        marginRight:"auto",
        width: 300,
        borderBottomLeftRadius: 300,
        borderBottomRightRadius: 300,
    },

    headerText:{
        color:"#fff",
        fontSize:20,
    }
})
