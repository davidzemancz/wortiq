import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-lg hover:shadow-blue-500/25',
  secondary:
    'border border-violet-200 hover:border-violet-400 text-violet-700 hover:text-violet-800 bg-white hover:shadow-md hover:shadow-violet-500/10',
  ghost:
    'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
  danger:
    'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-lg hover:shadow-red-500/25',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      className = '',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg font-medium
          transition-all duration-200 ease-out
          hover:-translate-y-[1px]
          active:scale-[0.97] active:translate-y-0
          focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
          ${variants[variant]}
          ${sizes[size]}
          ${className}
        `}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
