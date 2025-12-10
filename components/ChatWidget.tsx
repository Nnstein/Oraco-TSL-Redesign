import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { generateResponse } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hi there! I\'m OracoBot. Ask me anything about our digital services.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const botResponse = await generateResponse(userMsg);

    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl transition-all duration-500 hover:scale-105 ${isOpen ? 'bg-slate-800 dark:bg-slate-700 rotate-90' : 'bg-brand-primary animate-bounce-subtle'
            } text-white ring-2 md:ring-4 ring-white/50 dark:ring-slate-800/50`}
          aria-label="Toggle Support Chat"
        >
          {isOpen ? <X size={20} className="md:w-6 md:h-6" /> : <MessageCircle size={24} className="md:w-8 md:h-8 text-white" fill="currentColor" />}
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 md:right-8 w-[calc(100%-2rem)] md:w-full max-w-[360px] sm:max-w-[400px] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl z-40 flex flex-col transition-all duration-500 origin-bottom-right border border-slate-100 dark:border-slate-800 overflow-hidden ${isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
          }`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 150px)' }}
      >
        {/* Header */}
        <div className="bg-brand-dark dark:bg-slate-950 p-6 flex items-center gap-4 border-b border-transparent dark:border-slate-800">
          <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg font-serif">Oraco Assistant</h3>
            <p className="text-slate-400 text-xs font-medium tracking-wide uppercase">AI Powered Support</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                    ? 'bg-brand-primary text-white rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                <Loader2 size={16} className="animate-spin text-brand-primary" />
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none text-slate-700 dark:text-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-3 p-2 text-white bg-brand-primary rounded-lg hover:bg-brand-secondary disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors shadow-md"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;