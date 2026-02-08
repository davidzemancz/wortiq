import { useState, useId } from 'react';

const positions = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const Tooltip = ({ children, content, position = 'top', className = '' }) => {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();

  if (!content) return children;

  return (
    <div
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <div aria-describedby={visible ? tooltipId : undefined}>
        {children}
      </div>
      <div
        id={tooltipId}
        className={`
          absolute z-50 whitespace-nowrap
          px-3 py-1.5 text-xs font-medium
          text-white bg-slate-800 rounded-lg shadow-lg
          pointer-events-none
          transition-all duration-150 ease-out
          ${positions[position]}
          ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95 pointer-events-none'}
        `}
        role="tooltip"
        aria-hidden={!visible}
      >
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
