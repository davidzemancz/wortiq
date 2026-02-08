import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = '', hover = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-xl shadow-sm border border-slate-200 bg-white
        ${hover ? 'transition-all duration-300 ease-out hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1.5 hover:border-slate-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-b border-slate-100 ${className}`} {...props}>
    {children}
  </div>
);

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 border-t border-slate-100 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
export { CardHeader, CardBody, CardFooter };
