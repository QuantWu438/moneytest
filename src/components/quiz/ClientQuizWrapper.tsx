// src/components/quiz/ClientQuizWrapper.tsx
"use client";

import dynamic from 'next/dynamic';

const QuizContainer = dynamic(() => import('./QuizContainer'), {
  ssr: false
});

export default function ClientQuizWrapper() {
  return <QuizContainer />;
}