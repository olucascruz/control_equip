import { View, Text, StyleSheet} from "react-native"

export default function BaseList({listItems, showKey=false}){
    const getContent = (object) =>{
        const keys = Object.keys(object)
        let content = ''
        keys.forEach(key => {
            if(showKey){
                content += `${key}: ${object[key]} \n`
            }else{
                content += `${object[key]} \n`
            }
        });
        return content
    }

    return(
        <View style={styles.container}>
            {
            listItems.map((item, index)=>{
                return(
                <View key={index} style={styles.itemList}>
                    <Text>{getContent(item)}</Text>
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
        width:"100%",
        alignItems:"center",
    },
    itemList: {
        display: "flex",
        borderWidth: 1,
        width: "100%",
        height:"auto",
        alignItems: "center",
        borderTopWidth: 0, // Define apenas a largura da borda superior
        borderLeftWidth: 0, // Remove a borda esquerda
        borderRightWidth: 0, // Remove a borda direita
        paddingVertical: 10, // Adiciona espaço interno vertical
        paddingHorizontal: 20, // Adiciona espaço interno horizontal
        borderColor: 'gray',
        marginVertical: 5,
    }

})