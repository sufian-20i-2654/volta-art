/**
 * Animated neon loader component with pulsing glow effect
 */
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Spinning neon ring */}
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-secondary border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-secondary/20"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-transparent border-b-secondary border-l-primary animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
      </div>
      
      {/* Pulsing text */}
      <p className="text-primary font-mono text-sm tracking-wider animate-pulse-slow">
        PROCESSING DATA...
      </p>
      
      {/* Scanline effect */}
      <div className="w-64 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse-slow"></div>
    </div>
  );
};

export default Loader;
