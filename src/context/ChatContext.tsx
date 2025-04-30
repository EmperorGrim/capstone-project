import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Message, ChatHistory } from '../types/chat';
import { generateId, generateBotResponse } from '../utils/chatUtils';

interface ChatContextProps {
  chatHistory: ChatHistory;
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  sendMessage: (content: string) => void;
  isTyping: boolean;
  clearChat: () => void;
  newChat: () => void;
  suggestedQuestions: string[];
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'ecommerce-chat-history';

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory>({ messages: [] });
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([
    'How can I track my order?',
    'What is your return policy?',
    'Do you ship internationally?',
    'What payment methods do you accept?'
  ]);
  
  // Load chat history from local storage on initial render
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsed.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        
        setChatHistory({ messages: messagesWithDateObjects });
      } catch (error) {
        console.error('Failed to parse chat history from localStorage', error);
      }
    } else {
      // Add welcome message for new users
      addMessage(
        "Hi there! I'm your shopping assistant. How can I help you today?",
        'bot'
      );
    }
  }, []);
  
  // Save chat history to local storage whenever it changes
  useEffect(() => {
    if (chatHistory.messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    }
  }, [chatHistory]);
  
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: generateId(),
      content,
      sender,
      timestamp: new Date()
    };
    
    setChatHistory(prev => ({
      messages: [...prev.messages, newMessage]
    }));
  };
  
  const sendMessage = (content: string) => {
    if (content.trim() === '') return;
    
    // Add user message
    addMessage(content, 'user');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Generate and add bot response with a realistic delay
    setTimeout(() => {
      const response = generateBotResponse(content);
      addMessage(response, 'bot');
      setIsTyping(false);
      
      // Update suggested questions based on context
      updateSuggestedQuestions(content, response);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  const clearChat = () => {
    setChatHistory({ messages: [] });
    localStorage.removeItem(STORAGE_KEY);
    
    // Add welcome message after clearing
    setTimeout(() => {
      addMessage(
        "Chat history cleared. How else can I assist you today?",
        'bot'
      );
    }, 300);
  };

  const newChat = () => {
    // Save current chat history before starting new chat
    const timestamp = new Date().toISOString();
    const historyKey = `chat-history-${timestamp}`;
    localStorage.setItem(historyKey, JSON.stringify(chatHistory));
    
    // Clear current chat and start fresh
    setChatHistory({ messages: [] });
    
    // Add welcome message for new chat
    setTimeout(() => {
      addMessage(
        "Hello! I'm ready to help you with a fresh conversation. What can I do for you?",
        'bot'
      );
    }, 300);
  };
  
  const updateSuggestedQuestions = (userMessage: string, botResponse: string) => {
    // Logic to update suggested questions based on conversation context
    const lowercaseMsg = userMessage.toLowerCase();
    const lowercaseResponse = botResponse.toLowerCase();
    
    if (lowercaseMsg.includes('order') || lowercaseResponse.includes('order')) {
      setSuggestedQuestions([
        'How can I track my order?',
        'How do I change my order?',
        'What if my item arrives damaged?'
      ]);
    } else if (lowercaseMsg.includes('return') || lowercaseResponse.includes('return')) {
      setSuggestedQuestions([
        'What is your return policy?',
        'How do I start a return?',
        'Can I exchange instead of return?'
      ]);
    } else if (lowercaseMsg.includes('shipping') || lowercaseResponse.includes('shipping')) {
      setSuggestedQuestions([
        'Do you ship internationally?',
        'How long does shipping take?',
        'Can I change my shipping address?'
      ]);
    } else if (lowercaseMsg.includes('product') || lowercaseResponse.includes('product')) {
      setSuggestedQuestions([
        'What\'s your best-selling product?',
        'Are your products eco-friendly?',
        'How do I find my size?'
      ]);
    } else {
      setSuggestedQuestions([
        'What payment methods do you accept?',
        'Do you have a loyalty program?',
        'How do I contact customer service?',
        'What is your return policy?'
      ]);
    }
  };
  
  return (
    <ChatContext.Provider
      value={{
        chatHistory,
        addMessage,
        sendMessage,
        isTyping,
        clearChat,
        newChat,
        suggestedQuestions
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};