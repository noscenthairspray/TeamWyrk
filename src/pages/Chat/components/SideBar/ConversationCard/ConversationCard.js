import styles from './ConversationCard.module.css'


const ConversationCard = ({conversation, currentlyActive, setSelectedConversation}) => {
    //check if there are any messages in the conversation
    let lastMessage;
    let lastMessageTime = new Date();
    if(conversation.messages.length === 0){
        lastMessage = {content: 'Request Accepted, start a chat!'};
    }
    else{
        //get the last message in the array
        lastMessage = conversation.messages[conversation.messages.length - 1];
        //get the last message time
        lastMessageTime = new Date(lastMessage.timestamp);
    }

    //trim the last message to 32 characters
    const lastMessageTrimmed = lastMessage.content.length > 32 ? `${lastMessage.content.substring(0, 32)}...` : lastMessage.content;


    //convert time to Month Day from timestamp
    const month = lastMessageTime.toLocaleString('default', { month: 'short' });
    const day = lastMessageTime.getDate();
    const year = lastMessageTime.toLocaleDateString('en', {year: '2-digit'});
    //check if year is current year
    const currentYear = new Date().toLocaleDateString('en', {year: '2-digit'});
    //if year is current year, don't display year
    const lastMessageTimeFormatted = `${month} ${day} ${year === currentYear ? '' : `'${year}`}`;

    return (
        <div 
            onClick={() => setSelectedConversation(conversation)}    
            className={`${styles.convoCard} ${currentlyActive ? styles.convoCardActive : ''}`}
        >
            <img className={styles.convoCardImage} src={conversation.image} alt={`${conversation.name} headshot`} />
            <div className={styles.convoCardInfo}>
                <div className={styles.convoCardHeader}>
                <div className={styles.convoCardName}>{conversation.name}</div>
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