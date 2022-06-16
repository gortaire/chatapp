import { useState } from 'react'
import { Alert, View, Image, StyleSheet, Text, TextInput } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { BlurView } from 'expo-blur'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const backImage = require('../assets/background.png')

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignUp = () => {
        if (email !== "" && password !== "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log("SignUp success!!!"))
                .catch((err) => Alert.alert("Login error", err.message))
        }
    }

    const handleLink = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <Image source={backImage} style={[StyleSheet.absoluteFill, styles.backImage]} />
            <BlurView intensity={50} tint={'light'} style={styles.signUpContainer}>
                <SafeAreaView>
                    <View>
                        <Text style={styles.formTitle}>Sign Up</Text>
                    </View>
                    <View>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            name='email'
                            value={email}
                            placeholder='Enter your Email'
                            style={styles.inputText}
                            keyboardType='email-address'
                            onChangeText={(e) => setEmail(e)} />
                    </View>
                    <View>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            name='password'
                            value={password}
                            style={styles.inputText}
                            placeholder='Enter your Password'
                            secureTextEntry={true}
                            onChangeText={(e) => setPassword(e)} />
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                            <Text style={styles.buttonLabel}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomBar}>
                        <Text style={styles.bottomMessage}>Already have an account?     </Text>
                        <TouchableOpacity onPress={handleLink}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </BlurView>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    backImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover'
    },
    inputLabel: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600'
    },
    inputText: {
        backgroundColor: 'white',
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20
    },
    signUpContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        height: '50%',
        width: '80%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10
    },
    formTitle: {
        color: 'white',
        fontWeight: '900',
        fontSize: 40,
        marginBottom: 20
    },
    buttonLabel: {
        color: 'black',
        fontWeight: 'bold'
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    bottomBar: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center'
    },
    bottomMessage: {
        color: 'gray',
        fontWeight: '600',
        fontSize: 14
    },
    link: {
        color: 'magenta',
        fontWeight: '600',
        fontSize: 14
    }
})