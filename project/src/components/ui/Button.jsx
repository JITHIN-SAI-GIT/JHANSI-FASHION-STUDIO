export default function Button({ variant = 'primary', children, className = '', ...props }) {
  const baseStyles = 'px-6 py-3 text-sm uppercase tracking-wider font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-black hover:scale-105',
    secondary: 'bg-white hover:bg-gray-100 text-black hover:scale-105',
    outline: 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
