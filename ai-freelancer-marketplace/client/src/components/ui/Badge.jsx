const colorMap = {
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
};

const Badge = ({ children, color = 'blue', className = '', ...props }) => {
  return (
    <span
      className={`
        inline-flex items-center
        rounded-full px-3 py-1 text-xs font-medium
        ${colorMap[color] || colorMap.blue}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
