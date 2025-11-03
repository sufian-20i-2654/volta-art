import NeonButton from '@/components/NeonButton';

interface ResultProps {
  data: string;
  onNavigate: (view: 'input') => void;
}

/**
 * Result view - Dashboard-style data display with asymmetric layout
 */
const Result = ({ data, onNavigate }: ResultProps) => {
  // Parse the data into sections
  const lines = data.split('\n').filter(line => line.trim());
  const title = lines[0] || 'RESULT';
  const mainContent = lines.slice(1);

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold font-mono mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {title}
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
              Neural Output
            </span>
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Asymmetric Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Result Panel - Larger */}
          <div className="lg:col-span-2 bg-card/50 backdrop-blur-md border border-primary/30 rounded-xl p-8 shadow-[0_0_40px_hsl(var(--primary)/0.2)] hover:border-primary/50 transition-all duration-500">
            <h3 className="text-xl font-mono font-bold mb-6 text-primary flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></span>
              PRIMARY OUTPUT
            </h3>
            <div className="space-y-3 font-mono text-sm">
              {mainContent.map((line, index) => (
                <div 
                  key={index}
                  className="p-3 bg-background/50 rounded border border-border/50 hover:border-primary/30 transition-colors"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-6">
            {/* Metadata Panel */}
            <div className="bg-card/50 backdrop-blur-md border border-secondary/30 rounded-xl p-6 shadow-[0_0_30px_hsl(var(--secondary)/0.2)] hover:border-secondary/50 transition-all duration-500">
              <h3 className="text-lg font-mono font-bold mb-4 text-secondary flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse-slow"></span>
                METADATA
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Timestamp', value: new Date().toLocaleTimeString() },
                  { label: 'Process ID', value: `#${Math.floor(Math.random() * 10000)}` },
                  { label: 'Protocol', value: 'CYBER-v2' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-mono">{item.label}</span>
                    <span className="text-foreground font-mono font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-card/50 backdrop-blur-md border border-accent/30 rounded-xl p-6 shadow-[0_0_30px_hsl(var(--accent)/0.2)] hover:border-accent/50 transition-all duration-500">
              <h3 className="text-lg font-mono font-bold mb-4 text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></span>
                STATISTICS
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Efficiency', value: 98, color: 'primary' },
                  { label: 'Integrity', value: 100, color: 'accent' },
                  { label: 'Speed', value: 95, color: 'secondary' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground font-mono">{stat.label}</span>
                      <span className="text-foreground font-mono font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${stat.color} rounded-full transition-all duration-1000 shadow-[0_0_10px_hsl(var(--${stat.color}))]`}
                        style={{ width: `${stat.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-12">
          <NeonButton
            variant="cyan"
            size="lg"
            onClick={() => onNavigate('input')}
          >
            New Analysis
          </NeonButton>
          <NeonButton
            variant="lime"
            size="lg"
            onClick={() => window.location.reload()}
          >
            Reset System
          </NeonButton>
        </div>
      </div>
    </div>
  );
};

export default Result;
