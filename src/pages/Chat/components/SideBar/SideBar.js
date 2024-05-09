import styles from "./SideBar.module.css";
import ConversationCard from "./ConversationCard";

const SideBar = ({conversations}) => {
  //order the conversations by date
  conversations.sort((a, b) => {
    return a.toDate() - b.toDate();
  });

  return (
    <aside className={styles.sideBarWrapper}>
        <div className={styles.sideBarAllChats}>
            {conversations.map((conversation, index) => 
              <ConversationCard 
                conversation={conversation} 
                key={index}
              />
            )}
        </div>
    </aside>
  )
}

export default SideBar