import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Paperclip, Smile } from 'lucide-react';
import { useChat } from '../../context/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const autoResizeTextarea = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResizeTextarea();
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t border-gray-200 bg-white p-3 flex items-end gap-2"
    >
      <button
        type="button"
        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Add attachment"
      >
        <Paperclip size={20} />
      </button>
      
      <div className="flex-1 relative">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full py-2 px-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-[120px] pr-10"
          rows={1}
        />
        <button
          type="button"
          className="absolute right-2 bottom-2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Add emoji"
        >
          <Smile size={20} />
        </button>
      </div>
      
      <button
        type="submit"
        disabled={!message.trim()}
        className={`p-2 rounded-full ${
          message.trim() 
            ? 'bg-blue-500 text-white hover:bg-blue-600' 
            : 'bg-gray-200 text-gray-400'
        } transition-colors`}
        aria-label="Send message"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;