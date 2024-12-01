// @/components/ui/JourneyStep.tsx

import React from 'react';

interface JourneyStepProps {
  step: string;
  text: string;
}

const JourneyStep: React.FC<JourneyStepProps> = ({ step, text }) => {
  return (
    <div className="flex items-center space-x-4 bg-black/20 p-4 rounded-lg 
                    border border-neon-blue/20 group hover:border-neon-blue/40">
      <div className="w-8 h-8 rounded-full bg-neon-blue/10 flex items-center justify-center 
                     text-neon-blue font-bold group-hover:bg-neon-blue/20">
        {step}
      </div>
      <p className="text-white/80 text-sm">{text}</p>
    </div>
  );
};

export default JourneyStep;
