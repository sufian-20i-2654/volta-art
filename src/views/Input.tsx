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
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!videoFile) return;

    setIsLoading(true);

    try {
      // Call mock API with video file info
      const fileInfo = `${videoFile.name} (${(videoFile.size / 1024 / 1024).toFixed(2)} MB)`;
      const result = await mockApi(fileInfo);
      
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
              {/* Video upload field */}
              <div className="relative">
                <label 
                  htmlFor="video-upload" 
                  className="block text-sm font-mono uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Video Upload
                </label>
                <div className="relative">
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="video-upload"
                    className="
                      w-full
                      bg-background/50
                      border-2
                      border-border
                      border-dashed
                      rounded-lg
                      px-6
                      py-12
                      text-foreground
                      font-mono
                      hover:border-primary
                      hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]
                      transition-all
                      duration-300
                      cursor-pointer
                      flex
                      flex-col
                      items-center
                      justify-center
                      gap-4
                    "
                  >
                    {videoFile ? (
                      <>
                        <div className="text-primary text-lg">✓</div>
                        <div className="text-center">
                          <div className="text-sm text-foreground">{videoFile.name}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {(videoFile.size / 1024 / 1024).toFixed(2)} MB
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">Click to change</div>
                      </>
                    ) : (
                      <>
                        <div className="text-primary text-4xl">+</div>
                        <div className="text-sm text-muted-foreground">Click to upload video</div>
                        <div className="text-xs text-muted-foreground">MP4, MOV, AVI, WebM</div>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="flex justify-center pt-4">
                <NeonButton
                  type="submit"
                  variant="pink"
                  size="lg"
                  disabled={!videoFile}
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
