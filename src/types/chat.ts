export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'orders' | 'products' | 'shipping' | 'returns' | 'account' | 'payment';
  keywords: string[];
}