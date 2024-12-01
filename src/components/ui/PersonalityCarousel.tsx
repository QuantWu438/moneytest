import React from 'react';
import styles from '@/styles/PersonalityCarousel.module.css';
import Image from 'next/image';

const personalities = [
  { title: 'The Kiasu Keeper', image: '/assets/personalities/the-kiasu-keeper.png' },
  { title: 'The Kena Inspired', image: '/assets/personalities/the-kena-inspired.png' },
  { title: 'The Tow Kay Boss', image: '/assets/personalities/the-tow-kay-boss.png' },
  { title: 'The Kampung Hero', image: '/assets/personalities/the-kampung-hero.png' },
  { title: 'The Dream Chaser', image: '/assets/personalities/the-dream-chaser.png' },
  { title: 'The Sayang Saver', image: '/assets/personalities/the-sayang-saver.png' },
  { title: 'The Lobang King', image: '/assets/personalities/the-lobang-king.png' },
  { title: 'The Zai Kia Saver', image: '/assets/personalities/the-zai-kia-saver.png' }
];

const PersonalityCarousel = () => {
  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel}>
        {personalities.map((personality, index) => (
          <div 
            key={index} 
            className={styles.slide}
            style={{ 
              '--i': index,
              '--total': personalities.length
            } as React.CSSProperties}
          >
            <div className={styles.card}>
              <p className={styles.title}>{personality.title}</p>
              <Image
              src={personality.image} 
              alt={personality.title} 
              width={400}    // Add appropriate width
              height={300}   // Add appropriate height
              className={styles.image}
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalityCarousel;