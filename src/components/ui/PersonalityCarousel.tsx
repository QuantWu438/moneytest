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
                width={300}
                height={225}
                loading={index < 3 ? "eager" : "lazy"}
                quality={60}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx0fHRsdHSIeHx8iLCYlJSYmLCwoLC0tLS0sLCwtQC03Nz1AREREREREREREREREREb/2wBDARUXFyAeIB4gIB4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                sizes="(max-width: 768px) 100vw, 300px"
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