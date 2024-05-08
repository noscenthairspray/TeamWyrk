import styles from "./SideBar.module.css";
import ConversationCard from "./ConversationCard";

const SideBar = ({conversations, selectedConversation, setSelectedConversation}) => {

  // const click = (conversation) => {

  return (
    <aside className={styles.sideBarWrapper}>
        <div className={styles.sideBarAllChats}>
            {conversations.map((conversation, index) => 
              <ConversationCard 
                conversation={conversation} 
                key={index}
                currentlyActive={selectedConversation === conversation} 
                setSelectedConversation={setSelectedConversation}  
              />
            )}
        </div>
    </aside>
  )
}

export default SideBar