import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex mb-4">
      <div className="bg-gray-100 text-gray-500 rounded-2xl rounded-tl-none px-4 py-2">
        <div className="flex space-x-1 items-center h-6">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;