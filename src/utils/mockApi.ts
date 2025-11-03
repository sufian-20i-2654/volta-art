/**
 * Mock API utility that simulates a network request with a 2-second delay
 * Returns processed data based on input text
 */
export const mockApi = async (inputText: string): Promise<string> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // Generate mock response based on input
  const wordCount = inputText.split(' ').length;
  const charCount = inputText.length;
  
  return `ANALYSIS COMPLETE\n\nInput processed: "${inputText}"\n\nMetrics:\n- Words: ${wordCount}\n- Characters: ${charCount}\n- Processing Time: 2.0s\n- Status: SUCCESS\n- Confidence: ${Math.floor(Math.random() * 20) + 80}%`;
};
