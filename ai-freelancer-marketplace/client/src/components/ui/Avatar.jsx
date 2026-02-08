const sizes = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
  xl: 'h-20 w-20 text-xl',
};

const bgColors = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
  'bg-teal-500',
];

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function getColor(name) {
  if (!name) return bgColors[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return bgColors[Math.abs(hash) % bgColors.length];
}

const Avatar = ({ src, name, size = 'md', className = '', ...props }) => {
  const initials = getInitials(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`
          rounded-full object-cover
          ${sizes[size]}
          ${className}
        `}
        {...props}
      />
    );
  }

  return (
    <div
      className={`
        rounded-full flex items-center justify-center
        font-semibold text-white
        ${getColor(name)}
        ${sizes[size]}
        ${className}
      `}
      aria-label={name || 'Avatar'}
      role="img"
      {...props}
    >
      {initials}
    </div>
  );
};

export default Avatar;
