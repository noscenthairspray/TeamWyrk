import { useEffect } from 'react';
import styles from './ConversationCard.module.css';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useAuthState } from '../../../../../hooks/useAuthState';
import { useConversationContext } from '../../../Chat';


const ConversationCard = ({conversation}) => {
    const { user, isAuthenticated } = useAuthState();

    const { selectedConversation, setSelectedConversation } = useConversationContext();

    const currentlyActive = selectedConversation === conversation;

    const [receiver, setReceiver] = useState(null);

    //use effect for getting the receiver of the conversation
    useEffect(() => {
        async function fetchReceiver() {
            const receiverRef = doc(db, "user", conversation.receiverID);
            try {
                const docSnap = await getDoc(receiverRef);
                let data = null;
                if (docSnap.exists()) {
                    data = docSnap.data();
                    setReceiver(data);
                }
            } catch (error) {
                console.log("Error getting document:", error);
            } 
        }
        fetchReceiver();

    }, [conversation, isAuthenticated, user]);
    

    //check if there are any messages in the conversation
    let lastMessage = conversation.lastMessage;
    // let lastMessageTime = new Date(conversation.updatedAt);
    let lastMessageTime = conversation.updatedAt.toDate();
    if(lastMessage === ""){
        lastMessage = 'Request Accepted, start a chat!';
    }
    // // //trim the last message to 32 characters
    const lastMessageTrimmed = lastMessage.length > 32 ? `${lastMessage.substring(0, 32)}...` : lastMessage;


    // //convert time to Month Day from timestamp
    const month = lastMessageTime.toLocaleString('default', { month: 'short' });
    const day = lastMessageTime.getDate();
    const year = lastMessageTime.toLocaleDateString('en', {year: '2-digit'});
    // //check if year is current year
    const currentYear = new Date().toLocaleDateString('en', {year: '2-digit'});
    // //if year is current year, don't display year
    const lastMessageTimeFormatted = `${month} ${day} ${year === currentYear ? '' : `'${year}`}`;

    if(!receiver || !isAuthenticated || !receiver.profile_image){
        return <div>Loading...</div>
    }

    return (
        <div 
            onClick={() => setSelectedConversation(conversation)}    
            className={`${styles.convoCard} ${currentlyActive ? styles.convoCardActive : ''}`}
        >
            <img className={styles.convoCardImage} src={receiver.profile_image} alt={`${receiver.name} headshot`} />
            <div className={styles.convoCardInfo}>
                <div className={styles.convoCardHeader}>
                    <div className={styles.convoCardName}>{receiver?.name}</div>
                    <div className={styles.convoCardHeaderInfo}>
                        <div className={styles.convoCardTime}>{lastMessageTimeFormatted}</div>
                        {!conversation.lastMessageRead &&(
                        <div className={styles.convoCardNotification}></div>
                        )}
                    </div>
                </div>
                <div className={styles.sideBarChatMessage}>{lastMessageTrimmed}</div>
            </div>
        </div>
    )
}

export default ConversationCard