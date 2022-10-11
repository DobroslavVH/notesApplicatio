import React, {useState, useContext, useEffect} from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import NoteContext from "../context/NoteContext";
import TagContext from "../context/TagContext";

const CreateScreen = ({navigation}) => {

    const { addNote } = useContext(NoteContext);
    const { data, getTags } = useContext(TagContext);
    useEffect(() => {
        getTags();
    }, [])
    const [ title, setTitle ] = useState('');
    const [ content, setContent ] = useState('');
    const [ date, setDate] = useState();
    useEffect(() => {
        setDate(moment().format("MMM Do YY"));
    });
    const [ tag, setTag] = useState(null);
    const [ isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <View style={styles.dropdown}>
                <Dropdown
                    style={[isFocus && {borderColor: 'blue'}]}
                    data={data}
                    search
                    maxHeight={200}
                    labelField="tag"
                    valueField="tag"
                    placeholder={!isFocus ? 'Choose tag' : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={tag}
                    onChange={item => {
                        setTag(item.title);
                        setIsFocus(false);
                    }}
                />
            </View>
            <View style={styles.inputTitle}>
                <TextInput 
                    style={styles.text}
                    placeholder="Enter title"
                    value={title} 
                    onChangeText={(text) => setTitle(text)}
                />
            </View>
            <View style={styles.inputContent}>
                <TextInput 
                    style={styles.text}
                    placeholder="Enter content"
                    value={content} 
                    onChangeText={(text) => setContent(text)}
                />
            </View>
            <Button
                title="Add Note"
                onPress={() => {
                    addNote(tag, date, title, content, () => {navigation.navigate('Index');
                });
            }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputTitle: {
        fontSize: 18,
        marginLeft: 25,
        marginTop: 25,
        marginRight: 25,
        borderRadius: 5,
        height: 30,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    inputContent: {
        fontSize: 18,
        marginLeft: 25,
        marginTop: 25,
        marginRight: 25,
        borderRadius: 5,
        height: 200,
        backgroundColor: 'white'
    },
    text: {
        fontSize: 18,
        paddingLeft: 10,
        textAlignVertical: 'center'
    },
    dropdown:{
        marginLeft: 25,
        marginTop: 25,
        marginRight: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default CreateScreen;