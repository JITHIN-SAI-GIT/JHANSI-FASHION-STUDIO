export default function Section({ children, className = '', dark = true }) {
  return (
    <section className={`py-20 ${dark ? 'bg-black' : 'bg-black'} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
