import { useLayoutEffect, useState, useEffect, useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { GiftedChat } from 'react-native-gifted-chat'
import { AntDesign } from '@expo/vector-icons'
import { signOut } from 'firebase/auth'
import { addDoc, collection, onSnapshot, query, orderBy, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import colors from '../config/colors'


const Chat = () => {

    const [messages, setMessages] = useState([])
    const navigation = useNavigation()

    const handleSignOut = () => {
        signOut(auth).catch((err) => console.log(err.message))
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: 20 }}
                    onPress={handleSignOut}
                >
                    <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
                </TouchableOpacity>
            )
        })
    }, [navigation])

    useLayoutEffect(() => {
        const collectionRef = collection(db, 'chats')
        const q = query(collectionRef, orderBy('createdAt', 'desc'))
        const unsuscribe = onSnapshot(q, snapshot => {
            console.log('snapshot')
            setMessages(
                snapshot.docs.map(doc => ({
                    _id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            )
        })
        return () => unsuscribe()
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user } = messages[0]
        addDoc(collection(db, 'chat'), {
            _id,
            createdAt,
            text,
            user
        })
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://i.pravatar.cc/300'
            }}
            messagesContainerStyle={{
                backgroundColor: '#fafafa'
            }}

        />
    )
}

export default Chat