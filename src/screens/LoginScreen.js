import React, { useState } from "react";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";

const LoginScreen = ({navigation}) => {

    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>LoginScreen</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="Password"
                value={password}
                onChange={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.button}>
                <Button
                    title="Login"
                />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.text}>Don't have an account? Go to Sign Up.</Text>
            </TouchableOpacity>
        </View>
    );
};

LoginScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 150
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        marginBottom: 10,
        margin: 25,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'white',
        paddingLeft: 10
    },
    title: {
        fontSize: 25,
        alignSelf: 'center',
        margin: 15
    },
    text: {
        fontSize: 15,
        color: 'blue',
        alignSelf: 'center',
        margin: 10
    },
    button: {
        marginLeft: 100,
        marginRight: 100,
        marginTop: 20,
        marginBottom: 20
    }
});

export default LoginScreen;