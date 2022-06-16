import React, { useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import colors from '../config/colors'

const avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHErLgLoQKgo-6lclrsHMXksA3bo8DW0sJSA&usqp=CAU"

const Home = () => {

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={30} color={colors.gray} style={{ marginLeft: 15 }} />
            ),
            headerRight: () => (
                <Image source={{ uri: avatarUrl }} style={{ width: 40, height: 40, marginRight: 15 }} />
            )
        })
    }, [navigation])

    const handleChat = () => {
        navigation.navigate("Chat")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleChat} style={styles.chatButton}>
                <Entypo name="chat" size={24} color={colors.ligthGray} />
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50
    }
})