import styles from "./Chat.module.css";
import { useAuthState } from "../../hooks/useAuthState";
import { Header } from "../../components/Typography";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { createContext, useContext } from "react";
import MessagerBar from "./components/MessagerBar";
import SideBar from "./components/SideBar";

import { useEffect } from "react";
// import {conversations} from "./mockData"; //mock data for testing front end
import ChatBox from "./components/ChatBox";

import {collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ConversationContext = createContext();

const Chat = () => {

    const { user, isAuthenticated } = useAuthState();
    //testing a message already selected
    // const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    //testing a message not selected

    const [conversations, setConversations] = useState(null);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState(0);
    
    //getting the number of unread messages


    const [numUnreadMessages, setNumUnreadMessages] = useState(unreadMessages);

    useEffect(() => {
        if(!isAuthenticated){
            return;
        }

        async function fetchUserConversations() {
            const userConversationLogsRef = collection(db, "userConversationLogs");
            const userConversationLogDocRef = doc(userConversationLogsRef, user.uid);
            const docSnap = await getDoc(userConversationLogDocRef);
            let data = null;
            if (docSnap.exists()) {
                data = docSnap.data();
                
            }
            else {
                data = await setDoc(userConversationLogDocRef, {
                    conversations: [],
                });
                console.log("userConversations doc created");
                // setTestSelectedConversation(data);
            }
            setConversations(data.conversations);

            let unread = 0;
            data.conversations.forEach((conversation) => {
                if(!conversation.lastMessageRead){
                    unread ++;
                }
            });
            setNumUnreadMessages(unread);
        }
        fetchUserConversations();
      
    }, [user.uid])
    if (!isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    if (!conversations) {
        return <div>Loading...</div>;
    }

    return (
        <ConversationContext.Provider value={{selectedConversation, setSelectedConversation}}>
            <div className={styles.container}>
                <div className={styles.title}>
                <Header color="darkBlue">Messages</Header>
                </div>
                <MessagerBar 
                    numUnreadMessages={numUnreadMessages} 
                />
                <div className={styles.sideAndBlobContainer}>
                    <SideBar conversations={conversations} />
                    <ChatBox messages={selectedConversation}/>
                </div>
            </div>
        </ConversationContext.Provider>
    )
}

export const useConversationContext = () => useContext(ConversationContext);
export default Chat;