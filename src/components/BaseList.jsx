import { View, Text, TouchableOpacity, StyleSheet} from "react-native"

export default function BaseList({listItems, customFunc = null, ids=null}){
    const handleItemClick = (item, id) =>{
        const itemSelected = {content:item, id:id}
        if(customFunc) customFunc(itemSelected)
    }
    return(
        <View style={styles.container}>
            {
            listItems.map((item, index)=>{
                return(
                <TouchableOpacity key={index} style={styles.itemList} onPress={() => handleItemClick(item, ids[index])}>
                <View >
                    <Text style={styles.textItemList}>{item}</Text>
                </View>
                </TouchableOpacity>
                )    
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
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: 'gray',
        marginVertical: 0,
    },
    textItemList:{
        fontWeight:"500"
    }

})