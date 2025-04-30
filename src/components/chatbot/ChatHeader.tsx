import React from 'react';
import { X, Minimize2, Settings, PlusCircle } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

interface ChatHeaderProps {
  onClose: () => void;
  onMinimize: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, onMinimize }) => {
  const { clearChat, newChat } = useChat();
  
  return (
    <div className="bg-blue-500 text-white p-4 rounded-t-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3">
            <span className="text-blue-500 font-bold text-lg">S</span>
          </div>
          <div>
            <h3 className="font-semibold">Shop Assistant</h3>
            <p className="text-xs text-blue-100">Online | Typically replies in minutes</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={newChat}
            className="flex items-center px-3 py-1.5 bg-white text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
            aria-label="Start new chat"
          >
            <PlusCircle size={16} className="mr-1" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="p-1.5 hover:bg-blue-600 rounded-full transition-colors"
              aria-label="Clear chat history"
            >
              <Settings size={18} />
            </button>
            <button
              onClick={onMinimize}
              className="p-1.5 hover:bg-blue-600 rounded-full transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-blue-600 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;