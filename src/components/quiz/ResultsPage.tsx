"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SaveQuestModal from './SaveQuestModal';

interface MatchType {
  type: string;
  description: string;
  isGoodMatch: boolean;
  image?: string;
}

interface ResultsPageProps {
  name: string;
  description: string;
  traits: string[];
  recommendations: string[];
  compatibility: {
    good: {
      types: string[];
      reason: string;
    };
    challenging: {
      types: string[];
      reason: string;
    };
  };
  onRetake: () => void;
  onSaveQuest: () => void;
}

const BackgroundEffects = () => {
  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e3c72_1px,transparent_1px),linear-gradient(to_bottom,#1e3c72_1px,transparent_1px)]
          bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]
          animate-grid-flow opacity-20"
        />
      </div>

      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-blue/20 rounded-full blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-secondary-blue/20 rounded-full blur-3xl animate-glow-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="fixed inset-0 -z-5 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />
    </>
  );
};

const ResultsPage: React.FC<ResultsPageProps> = ({
  name,
  description,
  traits,
  recommendations,
  compatibility,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<MatchType | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const handleMatchClick = (type: string, description: string, isGoodMatch: boolean) => {
    const matchImage = `/assets/personalities/the-${type
      .toLowerCase()
      .replace(/^the\s+/, '')
      .replace(/\s+/g, '-')}.png`;

    setSelectedMatch({
      type,
      description,
      isGoodMatch,
      image: matchImage
    });
  };
  // First, add this helper function after your handleMatchClick function
  const handleShare = async () => {
    if (selectedMatch) {
      const shareText = `Check out our Money Personality match! I'm ${name} and you might be ${selectedMatch.type}. Take the quiz to discover your Money Personality!`;
      const shareUrl = window.location.href; // or your specific quiz URL
  
      if (typeof navigator !== 'undefined' && navigator.share) {
        try {
          await navigator.share({
            title: 'Money Personality Match',
            text: shareText,
            url: shareUrl
          });
          console.log('Shared successfully');
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        try {
          await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
          // Show a toast or notification
          alert('Link copied to clipboard!');
        } catch (err) {
          console.log('Error copying to clipboard:', err);
        }
      }
    }
  };

  const handleSaveQuest = () => {
    setShowSaveModal(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const PersonalityImage = () => {
    const [scanPosition, setScanPosition] = useState({ x: 0, y: 0 });
    
    React.useEffect(() => {
      const interval = setInterval(() => {
        setScanPosition({
          x: Math.random() * 100,
          y: Math.random() * 100
        });
      }, 2000);
  
      return () => clearInterval(interval);
    }, []);

    const imagePath = `/assets/personalities/the-${name
      .toLowerCase()
      .replace(/^the\s+/, '')
      .replace(/\s+/g, '-')}.png`;

    return (
      <div className="relative w-48 h-48 mx-auto md:w-64 md:h-64 group">
        <div className="relative border-2 border-neon-blue/20 rounded-lg overflow-hidden bg-black/40 
                      hover:scale-105 transition-transform duration-300 h-full w-full">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-neon-blue border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {imageError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <div className="text-neon-blue/60 text-6xl mb-2 font-orbitron">?</div>
              <p className="text-center text-neon-blue/60 font-orbitron">Image not available</p>
            </div>
          )}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-50">
              <motion.div 
                className="absolute w-0.5 h-full bg-neon-blue/50"
                animate={{
                  left: `${scanPosition.x}%`,
                  transition: { duration: 2, ease: "linear" }
                }}
              />
              <motion.div 
                className="absolute w-full h-0.5 bg-neon-blue/50"
                animate={{
                  top: `${scanPosition.y}%`,
                  transition: { duration: 2, ease: "linear" }
                }}
              />
              
              <motion.div
                className="absolute w-16 h-16 border border-neon-blue/30 rounded-full"
                style={{
                  left: `${scanPosition.x}%`,
                  top: `${scanPosition.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-blue rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.2, 0.8],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue/60" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-blue/60" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-blue/60" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue/60" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-neon-blue/5 transition-opacity duration-300" />

          <Image
            src={imagePath}
            alt={name}
            width={256}
            height={256}
            className={`transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit: 'contain' }}
            priority
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />

          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/90 px-4 py-1 
                    rounded-full border border-neon-blue/30 text-neon-blue/80 text-xs font-orbitron
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            <span className="animate-pulse">◈ SCANNING {Math.floor(scanPosition.x)}% ◈</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <BackgroundEffects />
      <div className="min-h-full p-4">
        <div className="container mx-auto py-6 md:py-12">
          <Card className="max-w-4xl mx-auto bg-black/30 border-neon-blue/30">
            <CardHeader className="text-center space-y-8">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.p 
                  variants={itemVariants} 
                  className="text-xl text-neon-blue/80 font-orbitron"
                >
                  Your Unique Money Personality is
                </motion.p>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron text-neon-blue">
                    {name}
                  </CardTitle>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex justify-center py-8"
              >
                <PersonalityImage />
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-16">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <motion.h2 variants={itemVariants} className="text-2xl font-orbitron text-neon-blue">
                  Description
                </motion.h2>
                <motion.div 
                  variants={itemVariants}
                  className="bg-black/20 p-6 rounded-lg border border-neon-blue/20 hover:border-neon-blue/40 transition-colors duration-300"
                >
                  <p className="text-base md:text-xl text-gray-200 leading-relaxed font-orbitron">{description}</p>
                </motion.div>
              </motion.div>

              {/* Key Traits Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8 md:space-y-16"
              >
                <motion.h2 variants={itemVariants} className="text-2xl font-orbitron text-neon-blue">
                  Key Traits
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {traits.map((trait, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="bg-black/20 p-4 rounded-lg border border-neon-blue/20 flex items-center
                               hover:border-neon-blue/40 hover:bg-black/30 transition-all duration-300"
                    >
                      <span className="h-3 w-3 bg-neon-blue rounded-full mr-3" />
                      <span className="text-base md:text-xl text-gray-200 leading-relaxed font-orbitron">{trait}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

         {/* Compatibility Section */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.h2 variants={itemVariants} className="text-2xl font-orbitron text-neon-blue">
                  Compatibility
                </motion.h2>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xl text-green-400 font-orbitron">Good Match</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {compatibility.good.types.map((type, index) => (
                      <button
                        key={index}
                        onClick={() => handleMatchClick(type, compatibility.good.reason, true)}
                        className="bg-green-400/10 p-4 rounded-lg border border-green-400/20 
                                 hover:bg-green-400/20 hover:border-green-400/40 
                                 transition-all duration-300 text-left group"
                      >
                        <p className="text-green-400 text-lg group-hover:scale-105 transition-transform font-orbitron">
                          {type}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="text-green-400/80 font-orbitron">{compatibility.good.reason}</p>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                  <h3 className="text-xl text-red-400 font-orbitron">Challenging Match</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {compatibility.challenging.types.map((type, index) => (
                      <button
                      key={index}
                      onClick={() => handleMatchClick(type, compatibility.challenging.reason, false)}
                      className="bg-red-400/10 p-4 rounded-lg border border-red-400/20 
                               hover:bg-red-400/20 hover:border-red-400/40 
                               transition-all duration-300 text-left group"
                    >
                      <p className="text-red-400 text-lg group-hover:scale-105 transition-transform font-orbitron">
                        {type}
                      </p>
                    </button>
                    ))}
                    </div>
                    <p className="text-red-400/80 font-orbitron">{compatibility.challenging.reason}</p>
                    </motion.div>
                    </motion.div>
                    
                    {/* Recommended Products Section */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="space-y-4"
                    >
                      <motion.h2 variants={itemVariants} className="text-2xl font-orbitron text-neon-blue">
                        Recommended Products
                      </motion.h2>
                      <div className="grid grid-cols-1 gap-4">
                        {recommendations.map((rec, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-black/20 p-4 rounded-lg border border-neon-blue/20 flex items-center
                                     hover:border-neon-blue/40 hover:bg-black/30 transition-all duration-300"
                          >
                            <span className="h-3 w-3 bg-neon-blue rounded-full mr-3" />
                            <span className="text-base md:text-xl text-gray-200 leading-relaxed font-orbitron">{rec}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* Action Buttons */}
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col sm:flex-row justify-center gap-4 pt-8"
                    >
                      <Button 
                        onClick={handleSaveQuest}
                        variant="neon"
                        size="lg"
                        className="font-orbitron text-lg hover:scale-105 transition-transform"
                      >
                        Save Quest
                      </Button>
                      <Button
                        onClick={() => window.location.href = 'https://quantquest.vercel.app/financial-tools'}
                        variant="outline"
                        size="lg"
                        className="font-orbitron text-lg hover:scale-105 transition-transform"
                      >
                        Other Financial Tools
                      </Button>
                    </motion.div>
                    </CardContent>
                    </Card>
                    </div>
                    </div>
                    
{/* Compatibility Modal */}
<AnimatePresence>
  {selectedMatch && (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <motion.div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedMatch(null)}
      />
      <motion.div 
        className="relative w-full max-w-2xl mx-4 z-[9999]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="bg-black/95 border border-neon-blue/30 p-8 rounded-lg shadow-lg shadow-neon-blue/20">
          <button 
            onClick={() => setSelectedMatch(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors font-orbitron"
          >
            ✕
          </button>

          <div className="space-y-6">
            <h2 className={`text-3xl font-orbitron ${selectedMatch.isGoodMatch ? 'text-green-400' : 'text-red-400'} text-center`}>
              {selectedMatch.type}
            </h2>

            <div className="flex justify-center items-center gap-8 py-6">
              <div className="space-y-2">
                <div className="relative w-32 h-32 border-2 border-neon-blue/20 rounded-lg overflow-hidden">
                  <Image
                    src={`/assets/personalities/the-${name.toLowerCase().replace(/^the\s+/, '').replace(/\s+/g, '-')}.png`}
                    alt={name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center text-sm text-neon-blue/80 font-orbitron">You</div>
              </div>

              <div className="flex flex-col items-center">
                <div className={`h-0.5 w-16 ${selectedMatch.isGoodMatch ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-2xl ${selectedMatch.isGoodMatch ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedMatch.isGoodMatch ? '✨' : '⚡'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="relative w-32 h-32 border-2 border-neon-blue/20 rounded-lg overflow-hidden">
                  {selectedMatch.image && (
                    <Image
                      src={selectedMatch.image}
                      alt={selectedMatch.type}
                      fill
                      className="object-contain"
                    />
                  )}
                </div>
                <div className="text-center text-sm text-neon-blue/80 font-orbitron">Their Type</div>
              </div>
            </div>

            <div className="bg-black/30 p-4 rounded-lg border border-neon-blue/20">
              <div className="text-gray-200 font-orbitron text-center">
                {selectedMatch.description}
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleShare}
                className="w-full p-4 rounded-lg bg-neon-blue/20 border border-neon-blue/30 
                         hover:bg-neon-blue/30 transition-all duration-300 font-orbitron
                         flex items-center justify-center space-x-2 group"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-neon-blue group-hover:scale-110 transition-transform"
                >
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                <span className="text-neon-blue text-lg">
                {typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? 'Share with Friend' : 'Copy Share Link'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )}
</AnimatePresence>

{/* Save Quest Modal */}
<SaveQuestModal
  isOpen={showSaveModal}
  onClose={() => setShowSaveModal(false)}
  personalityType={name}
  description={description}          // Pass Description
  traits={traits}                    // Pass Traits
  recommendations={recommendations}  // Pass Recommendations
/>
</div>
);
};

export default ResultsPage;