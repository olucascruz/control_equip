import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button} from "react-native"
import { getNameStudentById } from "../storage/studentRepository"
import { devolutionLoan, getLoans } from "../storage/loanRepository"
import { getMachines, setAvailableMachine } from "../storage/machineRepository"
export default function ListHome({database, listLoans, setListLoans, setMachines}){

        const [studentsNames, setStudentsNames] = useState([])
        
        useEffect(() => {
            if(!listLoans || listLoans.length < 1) return
            const names = []

            for (const loan of listLoans) {
                getNameStudentById(database, loan.student, (studentName) => {
                    if(studentName.length > 1){
                        names.push(studentName[0].name);
                        if (names.length === listLoans.length) {
                            setStudentsNames(names);
                        }
                    }
                });
                
            }
            
        }, [listLoans]);
        
    const devolution = (loan) =>{
        devolutionLoan(database, loan.id, () =>{
            setAvailableMachine(database, loan.machine, 1)
            getLoans(database, loans=>{setListLoans(loans)})
            getMachines(database, machines =>{setMachines(machines)})
        })
    }
    return(
        <View style={styles.container}>
            {
            listLoans ? listLoans.map((loan, index)=>{
                // Renderizar caso não tenha a data de devolução
                return loan.devolution_time ? null 
                :
                (      
                    <View key={index} style={styles.itemList}>
                        <View style={styles.contentText}>
                        <Text>{loan.devolution_time}</Text>
                        <Text style={styles.textItemList}>
                            Estudante: {studentsNames[index]}
                        </Text> 
                        
                        <Text style={styles.textItemList}>
                            Computador: {loan.machine}
                        </Text>
                        </View>
                        <Button
                        color={"#189605"}
                        onPress={()=>{devolution(loan)}}
                        title="Devolver"/>
                    </View>
                )         
            }) : null
            
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        display:"flex",
        marginTop:20,
        backgroundColor:"#fff",
        width:"100%",
        alignItems:"center",
    },
    itemList:{
        display:"flex",
        flexDirection:"row",   
        alignContent:"space-between",
        display: "flex",
        borderWidth: 5,
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
    contentText:{
        marginRight:"auto",
        marginBottom:15,
    },

    textItemList:{
        fontWeight:"500",
    },


})