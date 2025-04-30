import { Message, FAQItem } from '../types/chat';
import { faqData } from '../data/faqData';

// Generate a unique ID for messages
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

// Find the most relevant FAQ based on user input
export const findRelevantFAQ = (userInput: string): FAQItem | null => {
  const normalizedInput = userInput.toLowerCase().trim();
  
  // First check for exact question matches
  const exactMatch = faqData.find(
    item => item.question.toLowerCase() === normalizedInput
  );
  
  if (exactMatch) return exactMatch;
  
  // Then check for keyword matches
  let bestMatch: FAQItem | null = null;
  let highestScore = 0;
  
  faqData.forEach(item => {
    let score = 0;
    const keywords = [...item.keywords, ...item.question.toLowerCase().split(' ')];
    
    keywords.forEach(keyword => {
      if (normalizedInput.includes(keyword.toLowerCase())) {
        score += 1;
      }
    });
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  });
  
  // Only return if we have a meaningful match
  return highestScore > 1 ? bestMatch : null;
};

// Generate a bot response based on user input
export const generateBotResponse = (userInput: string): string => {
  // Check for greetings
  if (/^(hi|hello|hey|howdy)[\s!.?]*$/i.test(userInput)) {
    return "Hello! How can I help you with your shopping today?";
  }
  
  // Check FAQ database
  const relevantFAQ = findRelevantFAQ(userInput);
  if (relevantFAQ) {
    return relevantFAQ.answer;
  }
  
  // Check for product inquiries
  if (userInput.toLowerCase().includes('recommend') || 
      userInput.toLowerCase().includes('suggest') || 
      userInput.toLowerCase().includes('looking for')) {
    return "I'd be happy to recommend some products! Could you tell me more about what you're looking for? Or you can browse our featured collections from the main menu.";
  }
  
  // Check for order status
  if (userInput.toLowerCase().includes('order status') || 
      userInput.toLowerCase().includes('where is my order') ||
      userInput.toLowerCase().includes('track package')) {
    return "To check your order status, please provide your order number or email address associated with the purchase.";
  }
  
  // Default response
  return "I'm not sure I understand. Could you rephrase your question, or ask about our products, orders, shipping, returns, or account services?";
};

// Format timestamp for display
export const formatTimestamp = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${formattedHours}:${formattedMinutes} ${amPm}`;
};

// Group messages by time (within 2 minutes of each other)
export const groupMessagesByTime = (messages: Message[]): Message[][] => {
  if (messages.length === 0) return [];
  
  const groups: Message[][] = [];
  let currentGroup: Message[] = [messages[0]];
  
  for (let i = 1; i < messages.length; i++) {
    const currentMessage = messages[i];
    const previousMessage = messages[i - 1];
    const timeDifference = currentMessage.timestamp.getTime() - previousMessage.timestamp.getTime();
    const sameUser = currentMessage.sender === previousMessage.sender;
    
    // Group messages if they're from the same sender and within 2 minutes
    if (sameUser && timeDifference < 2 * 60 * 1000) {
      currentGroup.push(currentMessage);
    } else {
      groups.push([...currentGroup]);
      currentGroup = [currentMessage];
    }
  }
  
  groups.push(currentGroup);
  return groups;
};