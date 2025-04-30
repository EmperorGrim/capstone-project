import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatButton from './ChatButton';
import { ChatProvider } from '../../context/ChatContext';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const closeChat = () => {
    setIsOpen(false);
  };
  
  const minimizeChat = () => {
    setIsOpen(false);
  };
  
  return (
    <ChatProvider>
      <div className="chatbot-container">
        <ChatWindow 
          isOpen={isOpen} 
          onClose={closeChat} 
          onMinimize={minimizeChat} 
        />
        <ChatButton isOpen={isOpen} onClick={toggleChat} />
      </div>
    </ChatProvider>
  );
};

export default Chatbot;