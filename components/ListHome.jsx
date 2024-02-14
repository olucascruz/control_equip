import { View, Text, TextInput, Button, StyleSheet} from "react-native"

export default function ListHome({listComputerLoans}){
    return(
        <View style={styles.container}>
            {
            listComputerLoans.map((computerLoan)=>{
                return(
                <View style={styles.itemList}>
                    <Text>{computerLoan.student}:{computerLoan.computer}</Text>
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