import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile, Bot, Sparkles } from 'lucide-react';
import useProjectStore from '../../stores/projectStore';
import useUIStore from '../../stores/uiStore';
import ChatMessage from './ChatMessage';

export default function ChatPanel() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chat = useProjectStore((s) => s.dashboardState.chat);
  const addToast = useUIStore((s) => s.addToast);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  // Simulate typing indicator periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2500);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput('');
    addToast({
      type: 'info',
      message: 'Demo verze – chat bude dostupný v plné verzi',
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-slate-800">AI Asistent</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span className="text-xs text-emerald-600">Online</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-violet-50 text-violet-600 rounded-full px-2 py-0.5 font-medium">
            Claude Sonnet
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50/50">
        <div className="text-center">
          <span className="text-[11px] text-slate-500 bg-white rounded-full px-3 py-1 border border-slate-100">
            Dnes
          </span>
        </div>
        {chat.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 pt-2 pb-1 flex gap-2 overflow-x-auto">
        {['📊 Stav projektu', '📋 Shrnutí úkolů', '💡 Doporučení'].map((action) => (
          <button
            key={action}
            onClick={() => addToast({ type: 'info', message: 'Demo verze – plná funkčnost v produkci' })}
            className="text-xs bg-white border border-slate-200 rounded-full px-3 py-1.5 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors whitespace-nowrap flex-shrink-0"
          >
            {action}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-100 p-3 flex items-center gap-2 bg-white"
      >
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Připojit soubor"
        >
          <Paperclip className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Napište zprávu AI agentovi..."
          className="flex-1 border-0 bg-slate-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-colors placeholder:text-slate-400"
          aria-label="Zpráva"
        />
        <button
          type="button"
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Emoji"
        >
          <Smile className="w-4 h-4" />
        </button>
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Odeslat zprávu"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
