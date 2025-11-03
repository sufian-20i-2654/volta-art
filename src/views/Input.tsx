import { useState, FormEvent } from 'react';
import NeonButton from '@/components/NeonButton';
import Loader from '@/components/Loader';
import { mockApi } from '@/utils/mockApi';

interface InputProps {
  onNavigate: (view: 'result', data: string) => void;
}

/**
 * Input view - Processing hub with form and mock API integration
 */
const Input = ({ onNavigate }: InputProps) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;

    setIsLoading(true);

    try {
      // Call mock API with 2-second delay
      const result = await mockApi(inputText);
      
      // Navigate to result view with returned data
      onNavigate('result', result);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        {isLoading ? (
          <div className="bg-card/50 backdrop-blur-md border border-primary/30 rounded-xl p-12">
            <Loader />
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur-md border border-primary/30 rounded-xl p-8 md:p-12 shadow-[0_0_50px_hsl(var(--primary)/0.2)]">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold font-mono mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PROCESSING HUB
              </h2>
              <p className="text-muted-foreground font-mono text-sm tracking-wider">
                Enter data for neural analysis
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Input field with glowing focus */}
              <div className="relative">
                <label 
                  htmlFor="input-field" 
                  className="block text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Input Data
                </label>
                <textarea
                  id="input-field"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                  className="
                    w-full
                    bg-background/50
                    border-2
                    border-border
                    rounded-lg
                    px-4
                    py-3
                    text-foreground
                    font-mono
                    focus:outline-none
                    focus:border-primary
                    focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)]
                    transition-all
                    duration-300
                    resize-none
                  "
                />
                
                {/* Character count */}
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground font-mono">
                  {inputText.length} chars
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-4">
                <NeonButton
                  type="submit"
                  variant="pink"
                  size="lg"
                  disabled={!inputText.trim()}
                >
                  Execute Analysis
                </NeonButton>
              </div>
            </form>

            {/* Decorative grid */}
            <div className="mt-8 pt-8 border-t border-border/30">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Speed', value: '2.0s' },
                  { label: 'Accuracy', value: '99.8%' },
                  { label: 'Status', value: 'READY' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-primary font-mono font-bold text-lg">{stat.value}</div>
                    <div className="text-muted-foreground text-xs uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
