import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import PersonalityCarousel from '@/components/ui/PersonalityCarousel';

const IntermediatePage = ({ onContinue }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="max-w-3xl text-center mb-2">
        <h2 className="text-3xl font-orbitron text-neon-blue mb-2">
          You're Halfway There!
        </h2>
        <p className="text-lg text-white/80">
          Based on your responses, you might align with one of these fascinating money personalities.
        </p>
      </div>

      <PersonalityCarousel />

      <Button
        onClick={onContinue}
        variant="neon"
        size="xl"
        className="mt-2 font-orbitron text-xl px-12 py-6 relative overflow-hidden group"
      >
        <span className="relative z-10">Continue Journey</span>
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                     translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </Button>
    </div>
  );
};

export default IntermediatePage;