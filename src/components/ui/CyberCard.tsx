"use client";

import React from 'react';
import Image from 'next/image';

const CyberCard = () => {
  return (
    <div
      className="relative w-full max-w-lg mx-auto bg-black/30 backdrop-blur-sm border-2 border-neon-blue/30 rounded-xl
                 animate-float3D h-96"
    >
      <div className="absolute inset-0 rounded-xl animate-glow pointer-events-none" />
      <div className="relative z-10 w-full h-full overflow-hidden rounded-xl">
      <Image
          src="/1 (1).png"
          alt="Cyber Image"
          width={500}
          height={300}
          priority
          quality={75}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CyberCard;