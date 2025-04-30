import React, { useRef, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';
import { groupMessagesByTime } from '../../utils/chatUtils';

import ChatHeader from './ChatHeader';
import MessageGroup from './MessageGroup';
import ChatInput from './ChatInput';
import SuggestedQuestions from './SuggestedQuestions';
import TypingIndicator from './TypingIndicator';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  isOpen, 
  onClose, 
  onMinimize 
}) => {
  const { chatHistory, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory.messages, isTyping, isOpen]);
  
  if (!isOpen) return null;
  
  const messageGroups = groupMessagesByTime(chatHistory.messages);
  
  return (
    <div 
      className="fixed bottom-20 right-4 md:right-8 w-full max-w-sm md:max-w-md h-[550px] flex flex-col rounded-lg shadow-xl bg-white"
      style={{
        animation: 'scaleIn 0.3s ease-out',
        transformOrigin: 'bottom right',
        zIndex: 50
      }}
    >
      <ChatHeader onClose={onClose} onMinimize={onMinimize} />
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messageGroups.map((group, index) => (
          <MessageGroup key={index} messages={group} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <SuggestedQuestions />
      <ChatInput />
    </div>
  );
};

export default ChatWindow;