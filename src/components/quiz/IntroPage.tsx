"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CardContent from '@/components/ui/CardContent';
import { Button } from '@/components/ui/button';
import CyberCard from '@/components/ui/CyberCard';

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onStart }) => {
  return (
    <div className="main-container cyber-grid h-screen">
      {/* Main Content */}
      <div className="h-screen w-full flex items-center justify-center p-2 sm:p-4">
        <CardContent className="w-full max-w-3xl bg-black/30 border-neon-blue/30 backdrop-blur-sm p-4 sm:p-8 rounded-xl">
          <motion.div
            className="space-y-4 sm:space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="text-center space-y-2 sm:space-y-4">
              <h2 className="text-2xl sm:text-3xl font-orbitron text-neon-blue">
                Understand Your Money Personality
              </h2>
              <p className="text-lg text-neon-blue/80">
              </p>
            </div>

            {/* Cyber Card */}
            <CyberCard />

            {/* Journey Section */}
            <div className="space-y-3 sm:space-y-6">
              <h3 className="text-xl font-orbitron text-neon-blue text-center">
                Your Journey
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { step: "1", text: "Answer 12 Simple Questions" },
                  { step: "2", text: "Get Your Money Type" },
                  { step: "3", text: "Share With Your Friends" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row items-center sm:space-x-4 bg-black/20 p-2 sm:p-4 rounded-lg 
                               border border-neon-blue/20 group hover:border-neon-blue/40"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-neon-blue/10 flex items-center justify-center 
                                   text-neon-blue font-bold group-hover:bg-neon-blue/20 mb-2 sm:mb-0">
                      {item.step}
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm text-center sm:text-left">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Begin Assessment Button */}
            <div className="flex justify-center pt-2 sm:pt-6">
              <Button
                onClick={onStart}
                variant="neon"
                size="lg"
                className="font-orbitron text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-6 relative overflow-hidden group"
              >
                <span className="relative z-10">Begin Assessment</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </div>
    </div>
  );
};

export default IntroPage;