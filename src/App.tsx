import { useState } from "react";
import NavBar from "@/components/NavBar";
import Home from "@/views/Home";
import Input from "@/views/Input";
import Result from "@/views/Result";

type View = 'home' | 'input' | 'result';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [resultData, setResultData] = useState<string>('');

  const handleNavigate = (view: View, data?: string) => {
    if (data) {
      setResultData(data);
    }
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar currentView={currentView} onNavigate={handleNavigate} />
      
      <main className="pt-16">
        {currentView === 'home' && (
          <Home onNavigate={handleNavigate} />
        )}
        
        {currentView === 'input' && (
          <Input onNavigate={handleNavigate} />
        )}
        
        {currentView === 'result' && (
          <Result data={resultData} onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
};

export default App;
