import { forwardRef } from 'react';

const TextArea = forwardRef(
  (
    {
      label,
      error,
      id,
      rows = 4,
      className = '',
      ...props
    },
    ref,
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          className={`
            w-full border rounded-lg px-4 py-3
            text-slate-900 placeholder:text-slate-400
            transition-colors duration-200 resize-y
            focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
            ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-300'}
            disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={`${textareaId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
