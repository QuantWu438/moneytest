// src/app/page.tsx
import ClientQuizWrapper from '@/components/quiz/ClientQuizWrapper';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ClientQuizWrapper />
    </main>
  );
}