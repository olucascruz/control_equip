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
                    names.push(studentName[0].name);
                    console.log(studentName[0].name)
                    console.log(names)
                    // Se todos os nomes foram obtidos, definimos o estado
                    if (names.length === listLoans.length) {
                    console.log(names)

                        setStudentsNames(names);
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
                        <Text>
                            Estudante: {studentsNames[index]}
                        </Text> 
                        
                        <Text>
                            Computador: {loan.machine}
                        </Text>
                        </View>
                        <Button 
                        onPress={()=>{devolution(loan)}}
                        title="Devolvido"/>
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
    },
    itemList:{
        display:"flex",
        flexDirection:"row",
        width:"100%",    
        alignContent:"space-between",
        borderBottomWidth:1,
        padding:20,
        borderColor: 'black', // Define a cor da borda
        alignItems:"center",
        margin:"auto"
    },
    contentText:{
        display:"flex",
        alignItems:"flex-start",
        alignContent:"center",
        fontSize:"50",
        backgroundColor:"pink",
        margin:"auto",
        padding:"auto"
    
    },


})