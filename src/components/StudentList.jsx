


export default function StudentList({studentList}){

    return(
        <View style={styles.container}>
            {
            studentList.map((student, index)=>{
                return(
                <View key={index} style={styles.itemList}>
                    <Text>{student.name}</Text>
                    <Text>-</Text>
                    <Text>{student.code}</Text>
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
        justifyContent: 'space-between',
    }

})