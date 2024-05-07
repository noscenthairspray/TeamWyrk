import styles from "./Chat.module.css";
import { useAuthState } from "../../hooks/useAuthState";
import { Header } from "../../components/Typography";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import MessagerBar from "./components/MessagerBar";
import SideBar from "./components/SideBar";

import { useEffect } from "react";

import {conversations} from "./mockData"; //mock data for testing front end
import ChatBox from "./components/ChatBox";

import {collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Chat = () => {

    const { user, isAuthenticated } = useAuthState();
    //testing a message already selected
    // const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    //testing a message not selected
    const [testSelectedConversation, setTestSelectedConversation] = useState(null);


    const [selectedConversation, setSelectedConversation] = useState(null);
    
    //getting the number of unread messages
    let unreadMessages = 0;
    conversations.forEach((conversation) => {
        if(!conversation.lastMessageRead){
            unreadMessages++;
        }
    });
    const [numUnreadMessages, setNumUnreadMessages] = useState(unreadMessages);

    useEffect(() => {

        async function fetchUserConversations() {
            const userConversationLogsRef = collection(db, "userConversationLogs");
            const userConversationLogDocRef = doc(userConversationLogsRef, user.uid);
            const docSnap = await getDoc(userConversationLogDocRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("data: ", data);
                //setConversations(data.conversations);
            }
            else {
                const data = await setDoc(userConversationLogDocRef, {
                    conversations: [],
                });
                console.log("data: ", data);
                console.log("userConversations doc created");
                setTestSelectedConversation(data);
            }
        }
        fetchUserConversations();
      
    }, [user.uid])
    



    if (!isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
            <Header color="darkBlue">Messages</Header>
            </div>
            <MessagerBar activeMessages={selectedConversation} numUnreadMessages={numUnreadMessages} />
            <div className={styles.sideAndBlobContainer}>
                <SideBar 
                    conversations={conversations} 
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                />
                <ChatBox messages={selectedConversation}/>
            </div>
        </div>
)
}

export default Chat;