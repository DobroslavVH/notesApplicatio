import moment from "moment";
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import NoteContext from "../context/NoteContext";

const EditScreen = ({navigation, route}) => {
    
    const { data , editNote} = useContext(NoteContext);

    // get values of current post 
    const note = data.find(
        note => note.id === route.params.id
    );

    const id = route.params.id;
    const [date, setDate] = useState(note.date);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);

    return (
        <View>
            <Text style={styles.label}> Enter New Title / {note.id}</Text>
            <TextInput 
                style={styles.input} 
                value={title}
                onChangeText={(newText) => setTitle(newText)}
            />
            <Text style={styles.label}> Enter New Title</Text>
            <TextInput 
                style={styles.input} 
                value={content}
                onChangeText={(newText) => setContent(newText)}
                onTouchEnd={() => setDate(moment().format("MMM Do YY"))}
            />
            <Button
                title="Submit Editting"
                onPress={() => {
                    editNote(id, date ,title, content,  
                        () => {navigation.navigate('Index')}   
                    );
                }}  
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        borderRadius:5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        backgroundColor: 'white',
        height: 50,
        paddingLeft: 10
    },
    label: {
        paddingLeft: 15,
        marginTop: 10,
        fontSize: 20
    }
});

export default EditScreen;