"use client";

import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const handleWelcomeClick = () => {
    showSuccess("Welcome to Dyad!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a192f] p-4">
      <div className="text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          Hello, Vibe Coder!
        </h1>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleWelcomeClick}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg border-none"
          >
            Click Me!
          </Button>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0">
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;