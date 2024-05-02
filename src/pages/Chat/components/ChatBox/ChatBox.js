import React, { useState } from 'react';
import styles from './ChatBox.module.css'

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      console.log(inputValue) //send message to backend, then update chat timeline
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className={inputValue.length <= 300 ? styles.border : styles.borderError}>
        <textarea
          id='message'
          type="text"
          placeholder="Type message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={styles.inputField}
        />
        <div className={inputValue.length > 300 ? styles.characterLimit : styles.character}>{'max 300 characters'}</div>
        <button
          className={inputValue.length <= 300 ? styles.sendIcon : styles.sendIconError}
          onClick={inputValue.length <= 300 ? handleSendMessage : null}>
          <img
            src={inputValue.length <= 300 ? '/images/chat/send.svg' : '/images/chat/send_disabled.svg'}
            alt="Send"
          />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
