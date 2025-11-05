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
  const [videoPath, setVideoPath] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!videoPath.trim()) return;

    setIsLoading(true);

    try {
      // Call API with video path
      const result = await mockApi(videoPath);
      
      // Navigate to result view with returned data
      onNavigate('result', JSON.stringify(result, null, 2));
    } catch (error) {
      console.error('API Error:', error);
      alert('Failed to process video. Please check console for details.');
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
              {/* Video path input field */}
              <div className="relative">
                <label 
                  htmlFor="video-path" 
                  className="block text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Video Path
                </label>
                <div className="relative">
                  <input
                    id="video-path"
                    type="text"
                    value={videoPath}
                    onChange={(e) => setVideoPath(e.target.value)}
                    placeholder="D:\raffay_fyp\video_input\00002.mp4"
                    className="
                      w-full
                      bg-background/50
                      border-2
                      border-border
                      rounded-lg
                      px-6
                      py-4
                      text-foreground
                      font-mono
                      text-sm
                      focus:border-primary
                      focus:shadow-[0_0_20px_hsl(var(--primary)/0.3)]
                      focus:outline-none
                      transition-all
                      duration-300
                      placeholder:text-muted-foreground/50
                    "
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  Enter the full path to the video file (Windows or Linux format)
                </p>
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-4">
                <NeonButton
                  type="submit"
                  variant="pink"
                  size="lg"
                  disabled={!videoPath.trim()}
                >
                  Execute Analysis
                </NeonButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
