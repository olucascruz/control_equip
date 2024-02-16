import { View, Text, StyleSheet} from "react-native"

export default function BaseList({listItems}){
    return(
        <View style={styles.container}>
            {
            listItems.map((item, index)=>{
                return(
                <View key={index} style={styles.itemList}>
                    <Text>{item}</Text>
                </View>)    
            
            })
            }
        </View>
        )

}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        display:"flex",
        backgroundColor:"#fff",
        width:"70%",
        alignItems:"center",
    },
    itemList:{
        display:"flex",
        borderWidth: 2, // Define a largura da borda
        borderColor: 'black', // Define a cor da borda
        width:"100%",    
        alignItems:"center",
    }

})