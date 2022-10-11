import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, TextInput } from "react-native";
import TagContext from "../context/TagContext";

const TagScreen = ({navigation}) => {

    const {data , getTags, deleteTag, addTag} = useContext(TagContext);
    const [tag, setTag] = useState('');
 
    useEffect(() => {
        getTags();
        const listener = navigation.addListener('focus', () => {
            getTags();
        });
        return () => {
            listener.remove();
        };
    }, []);

    return (
        <View>
            <TextInput
                style={styles.input}
                value={tag}
                placeholder={'Enter tag name'}
                onChangeText={(text) => setTag(text)}
            />
            <Button
                title="Create Tag"
                onPress={() => {
                    addTag(tag, () => {
                        navigation.navigate('Index');
                    });
                }}  
            />
            <FlatList
                data={data}
                keyExtractor={(tagList) => tagList.title}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Button title="del" onPress={() => deleteTag(item.id)}/>
                        </View>
                    );
                }}            
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5  
    },
    input: {
        fontSize: 18,
        marginBottom: 10,
        margin: 10,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5,
        height:30
    },
    title: {
        fontSize: 18,
        alignSelf: 'center'
    }
});

export default TagScreen;