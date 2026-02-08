import { Bot, User, Check, CheckCheck } from 'lucide-react';

export default function ChatMessage({ message }) {
  const isAgent = message.isAgent;

  return (
    <div className={`flex gap-3 ${isAgent ? '' : 'flex-row-reverse'}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
          isAgent
            ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white'
            : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
        }`}
      >
        {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>

      <div className={`max-w-[75%] ${isAgent ? '' : 'text-right'}`}>
        <div className={`flex items-center gap-2 mb-1 ${isAgent ? '' : 'justify-end'}`}>
          <span className="text-xs font-medium text-slate-600">
            {message.sender}
          </span>
          <span className="text-[11px] text-slate-500">{message.time}</span>
        </div>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isAgent
              ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-md'
              : 'bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-md'
          }`}
        >
          {message.text}
        </div>
        {!isAgent && (
          <div className="flex items-center justify-end gap-1 mt-0.5">
            <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
        )}
      </div>
    </div>
  );
}
