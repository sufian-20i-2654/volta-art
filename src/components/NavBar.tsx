interface NavBarProps {
  currentView: 'home' | 'input' | 'result';
  onNavigate: (view: 'home' | 'input' | 'result') => void;
}

/**
 * Persistent navigation bar with neon active state indicators
 */
const NavBar = ({ currentView, onNavigate }: NavBarProps) => {
  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'input' as const, label: 'Input' },
    { id: 'result' as const, label: 'Result' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-secondary to-accent rounded animate-pulse-slow"></div>
            <span className="text-xl font-bold font-mono bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              CYBERNET
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="flex gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    relative px-6 py-2 font-mono uppercase tracking-wider transition-all duration-300
                    ${currentView === item.id 
                      ? 'text-primary' 
                      : 'text-muted-foreground hover:text-foreground'
                    }
                  `}
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  
                  {/* Active indicator */}
                  {currentView === item.id && (
                    <>
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_hsl(var(--primary))]"></span>
                      <span className="absolute inset-0 bg-primary/10 rounded"></span>
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
