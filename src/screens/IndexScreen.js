import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity,TextInput, Button } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import NoteContext from "../context/NoteContext";


const IndexScreen = ({navigation}) => {

    // dropdown
    const [ isFocus, setIsFocus] = useState(false);
    const [ tag, setTag ] = useState(null);
    useEffect(() => {
        setTag()
    })
    // load data from context
    
    const { data, deleteNote, getNotes } = useContext(NoteContext);
    useEffect(() => {
        getNotes();
        const listener = navigation.addListener('focus', () => {
            getNotes();
        });
        return listener;
    }, [navigation]);

    // search
    const [ search, setSearch] = useState('');
    const [ results, setResults] = useState([]);

    useEffect(() => {
        setResults(data)
    })

    const searchFunction = Array.isArray(results) ?
        Array.from(results).filter(
        result => result.title.includes(search) 
        || result.content.includes(search)
        || result.tag.includes(search)
    ) : [] ;

    // row view || grid view
    const [ numCol, setNumCol] = useState(1);
    const changeView = () => {
        if (numCol == 1) {
          setNumCol(2);
        }
        else {
          setNumCol(1);
        }
    }

    return (
        <View>
            <View style={styles.buttonBar}>
                <Button title="New Note" onPress={() => navigation.navigate('Create')}/>
                <Button title="New Tag" onPress={() => navigation.navigate('Tag')}/>
                <Button title="View" onPress={changeView}/>
            </View>
            <View style={styles.dropdown}>
                <Dropdown
                    style={[isFocus && {borderColor: 'blue'}]}
                    data={results}
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
                        setSearch(item.tag);
                        setIsFocus(false);
                    }}
                />
            </View>
            <View style={styles.bar}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Search"
                    onChangeText={setSearch}
                />
            </View>
            <View>
                <FlatList
                    key={numCol}
                    data={searchFunction}
                    numColumns={numCol}
                    keyExtractor={note => note.id}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {navigation.navigate('Details', {id: item.id})}}>
                                <View style={styles.row}>
                                    <Text key={item.tag}>{item.tag} / </Text>
                                    <Text key={item.date}>{item.date} / </Text>
                                    <Text key={item.title}>{item.title}</Text>
                                    <TouchableOpacity onPress={() => deleteNote(item.id)}>
                                        <Text style={{color: 'blue'}}>del</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: 'center',
        paddingVertical: 3,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 5,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5
    },
    buttonBar: {
        flexDirection: 'row',
    },
    textInputStyle: {
        fontSize: 18,
        paddingLeft: 10
    },
    bar: {
        backgroundColor: 'white',
        height: 30,
        margin: 20,
        borderRadius: 5,
        flexDirection: 'row',
        height: 30,
        justifyContent: 'space-between',
        margin: 25,
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

export default IndexScreen;