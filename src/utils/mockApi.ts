/**
 * Converts Windows path to Linux WSL path
 * Example: D:\raffay_fyp\video_input\00002.mp4 -> /mnt/d/raffay_fyp/video_input/00002.mp4
 */
const convertToLinuxPath = (windowsPath: string): string => {
  // Check if it's a Windows path (contains drive letter with colon)
  const driveMatch = windowsPath.match(/^([A-Za-z]):\\/);
  
  if (driveMatch) {
    const driveLetter = driveMatch[1].toLowerCase();
    const pathWithoutDrive = windowsPath.substring(3); // Remove "D:\"
    const linuxPath = `/mnt/${driveLetter}/${pathWithoutDrive.replace(/\\/g, '/')}`;
    return linuxPath;
  }
  
  // If already a Linux path or no drive letter, return as is
  return windowsPath;
};

/**
 * API utility that sends video path to inference endpoint
 * Returns processed data from the API
 */
export const mockApi = async (videoPath: string): Promise<any> => {
  try {
    // Convert Windows path to Linux format
    const linuxPath = convertToLinuxPath(videoPath);
    
    console.log('Original path:', videoPath);
    console.log('Converted path:', linuxPath);
    
    // Call the actual API endpoint
    const response = await fetch('http://172.18.159.74:8000/run_inference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_path: linuxPath,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
