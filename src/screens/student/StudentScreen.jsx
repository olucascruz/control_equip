// Core react
import { View, Text, Button, TextInput} from "react-native"
import { useState, useContext } from "react"

// Components
import Header from "../../components/Header"
import BaseList from "../../components/BaseList"
import SubjectPicker from "../../components/SubjectPicker"
import BaseView from "../../components/BaseView"
import ModalEditDelete from "../../components/ModalEditDelete"

//Styled
import { inputStyled } from "../../components/InputStyled"
import { textStyles } from "../../components/TextStyles";
import { buttonStyled, colorAddButton } from "../../components/ButtonStyled";

//Context
import { dataContext } from "../../contexts/Data"

// Storage
import { addStudent, getStudents, deleteStudent } from "../../storage/studentRepository"
import { addStudentToSubject, deleteStudentSubject, getStudentSubject } from "../../storage/studentSubjectRepository"


export default function StudentScreen({navigation}){
    const { database,
            listSubject,
            listStudent,
            setListStudent,
            subjectSelected,
            setSubjectSelected,
            listStudentSubject,
            setListStudentSubject } = useContext(dataContext)
    
    //forms states
    const [valueInputNameStudent, setValueInputNameStudent] = useState("")
    const [valueInputCodeStudent, setValueInputCodeStudent] = useState("")
    const [error, setError] = useState("")

    //modal states
    const [modalVisible, setModalVisible] = useState(false);
    const [itemSelected, setItemSelected] = useState("")
    
    const studentsInSubject = listStudentSubject.filter(studentSubject=>{
        return studentSubject.subject === subjectSelected.id
    }).map(studentSubject => studentSubject.student)
    

    const addStudentHandler = () =>{
        const subjectFieldError = "Campo de disciplina inválido"
        const nameFieldError = "Campo de name inválido"
        const codeFieldError = "Campo de code inválido"
        const errorInvalideCodeString = "Campo matrícula inválido"


        if(!subjectSelected){
            setError(subjectFieldError)
            return
        }

        if(!valueInputNameStudent){
            setError(nameFieldError)
            return
        }       

        if(!valueInputCodeStudent) {
            setError(codeFieldError)
            return
        }
        
        if(valueInputCodeStudent.length < 10){ 
            setError(errorInvalideCodeString)
            return
        }

        if (! /^\d+$/.test(valueInputCodeStudent)) {
            setError(errorInvalideCodeString)
            return
        }

        for(const studentId of studentsInSubject){
            if (studentId === valueInputCodeStudent){
                setError("Usuário já adicionado na disciplina.")
                return
            }
        }

        const listStudentInSubject =  listStudent.filter(student => {
            return studentsInSubject.includes(student.id);
        })
        for(const student of listStudentInSubject){
            if(student.name.toLowerCase() === valueInputNameStudent.toLowerCase()){
                setError("Nome de usuário já adicionado.")
                return
            }
        }

       // Se o estudante não estiver na disciplina, mas já estiver na lista de estudantes
        const existingStudent = listStudent.find(student => student.id === valueInputCodeStudent);

        if (existingStudent) {
            // Adicionar o estudante à disciplina
            addStudentToSubject(database, valueInputCodeStudent, subjectSelected.id, () => {
               
                getStudentSubject(database, studentSubject => {
                    setListStudentSubject(studentSubject);
                });
            
            });
        } else {
            // Se o estudante não estiver na lista de estudantes, adicioná-lo ao banco de dados e, em seguida, à disciplina
            addStudent(database, valueInputCodeStudent, valueInputNameStudent, () => {
                
                getStudents(database, students => {
                    setListStudent(students);
                    
                    // Após adicionar o estudante ao banco de dados, adicionar à disciplina
                    addStudentToSubject(database, valueInputCodeStudent, subjectSelected.id, () => {
                        getStudentSubject(database, studentSubject => {
                            setListStudentSubject(studentSubject);
                        });
                    });
                });
            });
    }

    // Limpar campos de entrada após adicionar o estudante
    setValueInputCodeStudent("");
    setValueInputNameStudent("");
};

    

    const listStudentFormatted =  listStudent.filter(student => {
        return studentsInSubject.includes(student.id);
    }).map(student => {
        // Formata um texto e o coloca na lista de conteúdo
        return `${student.name} \nMatrícula: ${student.id}`;
    }); 
    
    const ids = listStudent.map(student=> student.id)

    const onClickItemList = (itemSelected) => {
        setModalVisible(true)
        setItemSelected(itemSelected)
    }


    const handleDeleteStudent = () => {
        deleteStudentSubject(database, itemSelected.id, subjectSelected.id, ()=>{
            itemSelected["feedback"] = "Estudante deletado com sucesso"
            setItemSelected(itemSelected)
            getStudentSubject(database, studentsSubject => {
                setListStudentSubject(studentsSubject);
                // Verifica se o estudante ainda está associado a alguma disciplina 
                const stillEnrolled = studentsSubject.some(
                    studentSubject => studentSubject.student === itemSelected.id
                );

                // Se o estudante não estiver mais associado a nenhuma disciplina, exclui completamente do banco de dados
                if (!stillEnrolled) {
                    deleteStudent(database, itemSelected.id);
                }


            });   
        })    
    }
    return(
        <BaseView>
            <ModalEditDelete
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            deleteFunc={handleDeleteStudent}
            />
            <Header headerTitle={"Estudantes"}/>

            <Text style={textStyles.error}>{error}</Text>

            <Text style={textStyles.label}>Disciplina:</Text>
            {listSubject.length > 0 ?
             <SubjectPicker disciplines={listSubject}  selectedHandler={setSubjectSelected} selectedValue={subjectSelected}/>
             :
             <View style={buttonStyled.container}>
                <Button onPress={()=>{navigation.navigate("Subject")}} color={colorAddButton} title="Registrar disciplina"/>
            </View>}
            
            <Text style={textStyles.label}>Nome do estudante:</Text>
            <TextInput style={inputStyled.input} 
            onChangeText={setValueInputNameStudent}
            placeholder={"Nome do estudante"}
            value={valueInputNameStudent}
            maxLength={45}/>

            <Text style={textStyles.label}>Número de matrícula:</Text>
            <TextInput style={inputStyled.input}
            onChangeText={setValueInputCodeStudent}
            placeholder={"Número de matrícula"}
            value={valueInputCodeStudent}
            keyboardType="numeric"
            maxLength={10}
            />
            
            <View style={buttonStyled.container} >
                <Button
                disabled={listSubject.length < 1} 
                onPress={addStudentHandler}
                color={colorAddButton}
                title="adicionar estudante"/>
            </View>
            <BaseList 
            listItems={listStudentFormatted} 
            ids={ids} 
            customFunc={onClickItemList}/>
        </BaseView>
    )
}
