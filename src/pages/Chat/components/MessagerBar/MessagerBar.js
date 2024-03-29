import styles from "./MessagerBar.module.css";

const MessagerBar = ({activeMessages, numUnreadMessages}) => {

    if(!activeMessages){
        return (
            <div className={styles.msgBar}>
                <div className={styles.msgBarWrapper}>
                    <p className={styles.msgBarText}>({numUnreadMessages}) Unread Message{numUnreadMessages === 1 ? '': 's'}</p>
                </div>
            </div>
        )
    }
    const messagerName = activeMessages.name.split(" ")[0];
    const messagerRelationship = activeMessages.relationship;
    console.log(activeMessages);
    return (
        <div className={styles.msgBar}>
            <div className={styles.msgBarWrapper}>
                <p className={styles.msgBarText}>{messagerName} | {messagerRelationship}</p>
            </div>
            
        </div>
    )
}

export default MessagerBar