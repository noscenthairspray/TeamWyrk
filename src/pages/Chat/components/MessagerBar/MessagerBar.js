import styles from "./MessagerBar.module.css";

const MessagerBar = ({activeMessages, numUnreadMessages}) => {

    let stringToDisplay = '';
    if(!activeMessages){
        stringToDisplay = `(${numUnreadMessages}) Unread Message${numUnreadMessages === 1 ? '': 's'}`;
    }
    else {
        let name = activeMessages.name.split(" ")[0];
        let relationship = activeMessages.relationship;
        stringToDisplay = `${name} | ${relationship}`;
    }
    return (
        <div className={styles.msgBar}>
            <div className={styles.msgBarWrapper}>
                <p className={styles.msgBarText}>{stringToDisplay}</p>
            </div>
            
        </div>
    )
}

export default MessagerBar