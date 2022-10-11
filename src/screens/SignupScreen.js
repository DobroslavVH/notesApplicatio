import React, {useState, useContext} from "react";
import { Text, View, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthContext";

const SignupScreen = ({navigation}) => {

    const { signup } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
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
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.button}>
                <Button
                    title="Sign Up"
                    onPress={() => {
                        signup(email, password, () => {navigation.navigate('Index');
                    });
                }}
                />
            </View>
            <TouchableOpacity>
                <Text style={styles.text}>You have an account? Go to Login.</Text>
            </TouchableOpacity>

            {/* temporary code */}
            <TouchableOpacity onPress={() => navigation.navigate('Index')}>
                <Text style={styles.text}>INDEX</Text>
            </TouchableOpacity>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginBottom: 150
    },
    input: {
        fontSize: 18,
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

export default SignupScreen;