import NeonButton from '@/components/NeonButton';

interface HomeProps {
  onNavigate: (view: 'input') => void;
}

/**
 * Home view - Artistic hero page with cyberpunk aesthetics
 */
const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        
        {/* Scanline effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent animate-scanline"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
        {/* Glowing title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold font-mono tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-glow">
              CYBER
            </span>
            <br />
            <span className="text-foreground">
              PROTOCOL
            </span>
          </h1>
          
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <p className="text-muted-foreground font-mono uppercase tracking-[0.3em] text-sm">
              Neural Interface v2.0
            </p>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {[
            { title: 'ANALYZE', color: 'primary', icon: '◈' },
            { title: 'PROCESS', color: 'secondary', icon: '◆' },
            { title: 'EXECUTE', color: 'accent', icon: '◇' },
          ].map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <div className="relative">
                <div className={`text-4xl mb-3 text-${feature.color}`}>{feature.icon}</div>
                <h3 className="font-mono font-bold text-lg tracking-wider">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <NeonButton
            variant="cyan"
            size="lg"
            onClick={() => onNavigate('input')}
          >
            Initialize System
          </NeonButton>
        </div>

        {/* Decorative elements */}
        <div className="flex items-center justify-center gap-2 pt-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-pulse-slow"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
