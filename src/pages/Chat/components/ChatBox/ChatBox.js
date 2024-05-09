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
        <pre>{JSON.stringify(messages, null, 2)}</pre>
    </div>
  )
}

export default ChatBox