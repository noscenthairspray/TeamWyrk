import styles from "./ChatBox.module.css";

const ChatBox = ({messages}) => {
  if(!messages){
    return (
      <div className={styles.chatBoxWrapper}>
          <p className={styles.noMessages}>No Messages Selected</p>
      </div>
    )
  }


  return (
    <div className={styles.chatBoxWrapper}>
        {JSON.stringify(messages)}
    </div>
  )
}

export default ChatBox