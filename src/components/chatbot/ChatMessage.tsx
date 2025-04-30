import React from 'react';
import { Message } from '../../types/chat';
import { formatTimestamp } from '../../utils/chatUtils';

interface ChatMessageProps {
  message: Message;
  showTimestamp: boolean;
  isLastInGroup: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  showTimestamp, 
  isLastInGroup 
}) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-1`}
    >
      <div 
        className={`max-w-[80%] ${isBot 
          ? 'bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none' 
          : 'bg-blue-500 text-white rounded-2xl rounded-tr-none'
        } px-4 py-3 animate-[fadeIn_0.3s_ease-in-out]`}
        style={{
          animation: `fadeIn 0.3s ease-in-out, ${isBot 
            ? 'slideInLeft 0.3s ease-in-out' 
            : 'slideInRight 0.3s ease-in-out'}`
        }}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        
        {isLastInGroup && showTimestamp && (
          <span 
            className={`text-xs block mt-1 ${isBot 
              ? 'text-gray-500' 
              : 'text-blue-100'
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;