"use client";

import React from 'react';
import Image from 'next/image';

const CyberCard = () => {
  return (
    <div className="relative w-full max-w-lg mx-auto bg-black/30 backdrop-blur-sm border-2 border-neon-blue/30 rounded-xl animate-float3D h-96">
      <div className="absolute inset-0 rounded-xl animate-glow pointer-events-none" />
      <div className="relative z-10 w-full h-full overflow-hidden rounded-xl">
        <Image
          src="/1 (1).png"
          alt="Cyber Image"
          width={400}
          height={300}
          priority
          loading="eager"
          quality={50}
          onLoadingComplete={(img) => {
            if (img.naturalWidth === 0) {
              // Reload image if it fails to load
              img.src = img.src;
            }
          }}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </div>
  );
};

export default CyberCard;