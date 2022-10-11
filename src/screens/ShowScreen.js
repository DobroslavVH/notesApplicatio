import React, {useContext} from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NoteContext from "../context/NoteContext";

const ShowScreen = ({ navigation, route }) => {

    const { data } = useContext(NoteContext);

    const note = data.find(
        note => note.id === route.params.id
        );
  
    return (
        <View>
            <View style={styles.buttonBar}>
                <Button title='Edit Note' onPress={navigation.navigate('Edit', {id: note.id})}/>
            </View>
            <Text style={styles.title}>{note.date} / {note.title}</Text>
            
            <Text style={styles.field}>{note.content}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        paddingLeft: 15,
        fontSize: 20
    },
    field: {
        borderRadius:5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        backgroundColor: 'white',
        height: 50,
        paddingLeft: 10
    },
    editNoteIcon: {
        fontSize: 35,
        color: 'black',
        marginRight: 18
    },
    buttonBar: {
        flexDirection: 'row'
    }
});

export default ShowScreen;