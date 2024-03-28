import styles from "./Chat.module.css";
import { useAuthState } from "../../hooks/useAuthState";
import { Header } from "../../components/Typography";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import MessagerBar from "./components/MessagerBar";

import {messages} from "./mockData";//mock data for testing front end

const Chat = () => {

    const { user, isAuthenticated } = useAuthState();
    const [selectedMessages, setSelectedMessages] = useState(messages[0]);



    if (!isAuthenticated) {
        return <Navigate replace to="/" />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
            <Header color="darkBlue">Messages</Header>
            </div>
            <MessagerBar activeMessages={selectedMessages} setActiveMessages={setSelectedMessages}/>
        </div>
)
}

export default Chat