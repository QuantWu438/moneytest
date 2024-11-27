"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoverPageProps {
  onStart: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-black/30 border-neon-blue/30">
        <CardContent className="p-8 space-y-12">
          <motion.div 
            className="space-y-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="neon-title">
              <span className="title-gradient">Quant</span>Quest
            </h1>
            
            {/* Subtitle */}
            <motion.h2 
              className="text-2xl md:text-3xl font-orbitron text-neon-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Discover your Unique Money Personality
            </motion.h2>

            {/* Question */}
            <motion.p 
              className="text-xl md:text-2xl text-neon-blue/80 font-orbitron"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Do you agree that everyone may have different money personality at different phases in life?
            </motion.p>

            {/* Time indication */}
            <div className="space-y-4">
              <motion.p 
                className="text-lg md:text-2xl text-neon-blue/80 font-orbitron"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Have your unique money personality ready in just
              </motion.p>
              <motion.p
                className="text-2xl text-neon-blue font-bold font-orbitron"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                2 minutes
              </motion.p>
            </div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="pt-6"
            >
              <Button 
                onClick={onStart}
                variant="neon"
                size="xl"
                className="cyber-button neon-pulse font-orbitron text-xl px-12 py-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Start Quest</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3c72_1px,transparent_1px),linear-gradient(to_bottom,#1e3c72_1px,transparent_1px)]
                     bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]
                     animate-grid-flow opacity-20" />
      </div>
    </div>
  );
};

export default CoverPage;