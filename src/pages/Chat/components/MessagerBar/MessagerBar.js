import styles from "./MessagerBar.module.css";
import { useConversationContext } from "../../Chat";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const MessagerBar = ({activeMessages, numUnreadMessages}) => {

    const {selectedConversation} = useConversationContext();
    const [selectedUser, setSelectedUser] = useState(null);

    //get the user from the selected conversation
    useEffect(() => {
        async function fetchUser() {
            if(!selectedConversation){
                return;
            }
            const userRef = doc(db, "user", selectedConversation.receiverID);
            const userSnap = await getDoc(userRef);
            if(userSnap.exists()){
                const user = userSnap.data();
                console.log("user: ", user);
                setSelectedUser(user);
            }
        }
        fetchUser();
    }, [selectedConversation]);

    let stringToDisplay = '';
    if(!selectedUser){
        stringToDisplay = `(${numUnreadMessages}) Unread Message${numUnreadMessages === 1 ? '': 's'}`;
    }
    else {
        let name = selectedUser.name.split(" ")[0];
        let relationship = selectedConversation.receiverRelationship;
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