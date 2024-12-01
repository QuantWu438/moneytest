// src/components/quiz/CoverPage.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CoverPageProps {
  onNext: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onNext }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black px-2 sm:px-4">
      <Card className="w-full max-w-md sm:max-w-lg bg-black/30 border-neon-blue/30">
        <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-8">
          <motion.div 
            className="space-y-4 sm:space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Title */}
            <h1 className="neon-title text-2xl sm:text-3xl font-orbitron">
              <span className="title-gradient">Quant</span>Quest
            </h1>
            
            {/* Subtitle */}
            <motion.h2 
              className="text-xl sm:text-2xl font-orbitron text-neon-blue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Discover your Unique Money Personality
            </motion.h2>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 gap-2 sm:gap-4 px-1 sm:px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {[
                { icon: "⚡", title: "Quick", desc: "2 Min Quiz" },
                { icon: "🎯", title: "Precise", desc: "12 Questions" },
                { icon: "🧠", title: "Research", desc: "Data-Driven" },
                { icon: "💡", title: "Personal", desc: "Tailored Insights" }
              ].map((item, i) => (
                <div key={i} className="bg-black/20 p-2 sm:p-4 rounded-lg border border-neon-blue/20 
                                     hover:border-neon-blue/40 transition-all duration-300">
                  <div className="text-xl sm:text-2xl mb-1">{item.icon}</div>
                  <div className="text-neon-blue/80 text-xs sm:text-sm font-bold">{item.title}</div>
                  <div className="text-white/60 text-xs">{item.desc}</div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-xl text-neon-blue/80 font-orbitron"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Do you agree that everyone may have different money personalities at different phases in life?
            </motion.p>

            {/* Additional Information */}
            <motion.div
              className="bg-black/20 border border-neon-blue/20 rounded-lg p-3 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-white/80 text-xs sm:text-base leading-relaxed">
                Based on research by behavioral finance experts, this test helps you understand your natural 
                tendencies in managing money. Unlock insights that can transform your financial decisions.
              </p>
            </motion.div>

            {/* Start Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                onClick={onNext}
                variant="neon"
                size="lg"
                className="w-full sm:w-auto px-6 py-3 sm:px-12 sm:py-4 font-orbitron text-base sm:text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">Start Quest</span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverPage;