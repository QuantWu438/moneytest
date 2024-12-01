// src/components/ui/CyberCard.tsx

"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const CyberCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    // No additional JavaScript needed for automatic floating
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-lg mx-auto bg-black/30 backdrop-blur-sm border-2 border-neon-blue/30 rounded-xl
                 transition-transform duration-300 transform-gpu animate-float3D"
      style={{ transformStyle: 'preserve-3d', height: '400px' }} // Adjust height as needed
    >
      <div ref={glowRef} className="absolute inset-0 rounded-xl transition-all duration-300 pointer-events-none animate-glow" />
      <div className="relative z-10 w-full h-full">
        {/* Image Section */}
        <Image
          src="/1 (1).png"
          alt="Cyber Image"
          width={500}  // Add appropriate width
          height={300} // Add appropriate height
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
};

export default CyberCard;
