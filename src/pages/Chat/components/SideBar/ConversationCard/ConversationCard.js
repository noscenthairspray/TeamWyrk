import { useEffect } from 'react';
import styles from './ConversationCard.module.css';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import { useAuthState } from '../../../../../hooks/useAuthState';


const ConversationCard = ({conversation, currentlyActive, setSelectedConversation}) => {
    console.log(conversation);
    const { user, isAuthenticated } = useAuthState();

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

    }, [conversation]);
    

    //check if there are any messages in the conversation
    // let lastMessage;
    // let lastMessageTime = new Date();
    // if(conversation.messages.length === 0){
    //     lastMessage = {content: 'Request Accepted, start a chat!'};
    // }
    // else{
    //     //get the last message in the array
    //     lastMessage = conversation.messages[conversation.messages.length - 1];
    //     //get the last message time
    //     lastMessageTime = new Date(lastMessage.timestamp);
    // }

    // //trim the last message to 32 characters
    // const lastMessageTrimmed = lastMessage.content.length > 32 ? `${lastMessage.content.substring(0, 32)}...` : lastMessage.content;


    // //convert time to Month Day from timestamp
    // const month = lastMessageTime.toLocaleString('default', { month: 'short' });
    // const day = lastMessageTime.getDate();
    // const year = lastMessageTime.toLocaleDateString('en', {year: '2-digit'});
    // //check if year is current year
    // const currentYear = new Date().toLocaleDateString('en', {year: '2-digit'});
    // //if year is current year, don't display year
    // const lastMessageTimeFormatted = `${month} ${day} ${year === currentYear ? '' : `'${year}`}`;

    return (
        <div 
            onClick={() => setSelectedConversation(conversation)}    
            className={`${styles.convoCard} ${currentlyActive ? styles.convoCardActive : ''}`}
        >
            {console.log(receiver)}
            <img className={styles.convoCardImage} src={receiver.profile_image} alt={`${receiver.name} headshot`} />
            <div className={styles.convoCardInfo}>
                <div className={styles.convoCardHeader}>
                    <div className={styles.convoCardName}>{receiver.name}</div>
                    {/* <div className={styles.convoCardHeaderInfo}>
                        <div className={styles.convoCardTime}>{lastMessageTimeFormatted}</div>
                        {!conversation.lastMessageRead &&(
                        <div className={styles.convoCardNotification}></div>
                        )}
                    </div> */}
                </div>
                {/* <div className={styles.sideBarChatMessage}>{lastMessageTrimmed}</div> */}
            </div>
        </div>
    )
}

export default ConversationCard