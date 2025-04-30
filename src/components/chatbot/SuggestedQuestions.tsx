import React from 'react';
import { useChat } from '../../context/ChatContext';

const SuggestedQuestions: React.FC = () => {
  const { suggestedQuestions, sendMessage } = useChat();
  
  if (!suggestedQuestions.length) return null;
  
  return (
    <div className="border-t border-gray-200 p-3 bg-gray-50">
      <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
      <div className="flex flex-wrap gap-2">
        {suggestedQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => sendMessage(question)}
            className="text-sm bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-100 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;