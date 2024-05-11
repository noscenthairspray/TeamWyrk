import styles from "./Chat.module.css";
import { useAuthState } from "../../hooks/useAuthState";
import { Header } from "../../components/Typography";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import MessagerBar from "./components/MessagerBar";
import SideBar from "./components/SideBar";

import {messages} from "./mockData"; //mock data for testing front end
import ChatBox from "./components/ChatBox";

const Chat = () => {

    const { user, isAuthenticated } = useAuthState();
    //testing a message already selected
    const [selectedMessages, setSelectedMessages] = useState(messages[0]);
    //testing a message not selected
    // const [selectedMessages, setSelectedMessages] = useState(null);
    const [numUnreadMessages, setNumUnreadMessages] = useState(1);

    // const testingMessagesSelected = true;



    if (!isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
            <Header color="darkBlue">Messages</Header>
            </div>
            <MessagerBar activeMessages={selectedMessages} numUnreadMessages={numUnreadMessages} />
            <div className={styles.sideAndBlobContainer}>
                <SideBar messages={messages} />
                <ChatBox />
            </div>
        </div>
)
}

export default Chat