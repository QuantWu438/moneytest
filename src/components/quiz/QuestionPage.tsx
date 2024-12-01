import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuestionPageProps {
  questionNumber: number;
  question: React.ReactNode;
  onAnswer: (answer: boolean) => void;
}

const QuestionPage: React.FC<QuestionPageProps> = ({
  questionNumber,
  question,
  onAnswer,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 relative">
      <Card className="w-full max-w-2xl bg-black/30 border-neon-blue/30 lg:h-96">
        <CardHeader className="space-y-4">
          <div className="text-xl text-neon-blue font-orbitron">
            Question {questionNumber}
          </div>
          <div className="lg:h-40 lg:overflow-y-auto">
            <h2 className="text-1xl text-white font-orbitron leading-relaxed">
              {question}
            </h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-orbitron hover:bg-neon-blue/10 hover:text-neon-blue transition-all duration-300"
              onClick={() => onAnswer(true)}
            >
              True
            </Button>
            <Button
              variant="outline"
              className="w-full py-6 text-lg font-orbitron hover:bg-neon-blue/10 hover:text-neon-blue transition-all duration-300"
              onClick={() => onAnswer(false)}
            >
              False
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPage;