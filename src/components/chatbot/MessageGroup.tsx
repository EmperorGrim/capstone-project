import React from 'react';
import { Message } from '../../types/chat';
import ChatMessage from './ChatMessage';

interface MessageGroupProps {
  messages: Message[];
}

const MessageGroup: React.FC<MessageGroupProps> = ({ messages }) => {
  if (messages.length === 0) return null;
  
  return (
    <div className="mb-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          showTimestamp={index === messages.length - 1}
          isLastInGroup={index === messages.length - 1}
        />
      ))}
    </div>
  );
};

export default MessageGroup;