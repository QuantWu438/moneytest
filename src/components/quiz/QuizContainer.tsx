// src/components/quiz/QuizContainer.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoverPage from './CoverPage';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';



enum QuizState {
  COVER = 'COVER',
  QUESTION = 'QUESTION',
  RESULT = 'RESULT'
}

const questions = [
  // E vs I (1-3)
  "A financial opportunity arises—a friend shares a hot stock tip or an exciting business idea. Your first instinct is to dive into research independently to assess its validity before involving anyone else.",
  "You're at a gathering, and someone brings up their financial goals for the year. You feel energized and excited to share your own experiences and plans with the group.",
  "You're facing a financial setback, like a bad investment or unexpected expense. Your natural response is to reflect on it privately and work through it alone before sharing with others.",
  
  // S vs N (4-6)
  "You've decided to start tracking your monthly spending. You feel more comfortable logging every small detail—like daily coffee or transport costs—so you know exactly where your money goes.",
  "You're considering a major purchase, like upgrading your phone or buying new furniture. Your decision hinges on how well it matches your lifestyle or future aspirations, even if it costs a little more.",
  "You're presented with two options: a stable CPF top-up or an investment plan with higher but less predictable returns. You're naturally drawn to the innovative investment plan, intrigued by its long-term potential.",
  
  // T vs F (7-9)
  "A close friend confides in you about their financial struggles. Your first instinct is to offer logical, actionable advice to help them get back on track rather than focusing on their emotions.",
  "When deciding where to invest, you prioritize objective factors like performance data, reviews, and numbers over whether the investment feels personally meaningful to you.",
  "You receive a lucrative but ethically questionable investment opportunity. Even though it's a potential goldmine, you hesitate because it doesn't align with your values or principles.",
  
  // J vs P (10-12)
  "You're planning for an upcoming family vacation. You feel more comfortable mapping out a detailed itinerary and budgeting every part of the trip to avoid surprises.",
  "A sudden expense arises, like an unexpected medical bill or a car repair. You feel calm handling it because you already have a backup plan and savings in place for emergencies.",
  "At the start of the year, you set clear and specific financial goals for yourself and stick to them, even if unexpected distractions or opportunities come along."
];

interface Compatibility {
  good: {
    types: string[];
    reason: string;
  };
  challenging: {
    types: string[];
    reason: string;
  };
}

interface PersonalityType {
  name: string;
  description: string;
  traits: string[];
  recommendations: string[];
  compatibility: Compatibility;
}

interface PersonalityTypes {
  [key: string]: PersonalityType;
}

const personalityTypes: PersonalityTypes = {
    'INTJ': {
      name: 'The Zai Kia Saver',
      description: 'Disciplined like an "A-grade student," the Zai Kia Saver keeps a tight budget, loves CPF top-ups, and avoids risks. While exceptional at planning and ensuring long-term security, they may miss out on higher returns by sticking to overly safe, old-school methods.',
      traits: [
        'Strategic long-term planner',
        'Security-focused investor',
        'Analytical decision maker',
        'Disciplined saver'
      ],
      recommendations: [
        'Endowment plans for steady growth',
        'CPF top-ups for security',
        'Blue-chip stocks for stability'
      ],
      compatibility: {
        good: {
          types: ['The Bao Jiak Investor', 'The Sayang Saver'],
          reason: 'Works well with practical types who share their conservative approach'
        },
        challenging: {
          types: ['The Dream Chaser', 'The YOLO'],
          reason: 'Struggles with risk-takers who may seem reckless'
        }
      }
    },
   
    'ENTJ': {
      name: 'The Tow Kay Boss',
      description: 'A natural strategist, the Tow Kay Boss views finances like chess, always plotting the next big win. Their ambitious and goal-oriented nature drives them to take calculated risks, but they can sometimes overextend and lose sight of stability in the pursuit of growth.',
      traits: [
        'Strategic risk-taker',
        'Growth-oriented investor',
        'Natural leader',
        'Ambitious planner'
      ],
      recommendations: [
        'Investment-Linked Policies (ILPs)',
        'Exchange Traded Funds (ETFs)',
        'High-growth potential investments'
      ],
      compatibility: {
        good: {
          types: ['The Lobang King', 'The Dream Chaser'],
          reason: 'Best with dynamic types who share their drive for growth'
        },
        challenging: {
          types: ['The Zai Kia Saver', 'The Bao Jiak Investor'],
          reason: 'Conflicts with cautious types who resist ambitious strategies'
        }
      }
    },
   
    'INTP': {
      name: 'The Sibei Smart',
      description: 'Analytical and curious, the Sibei Smart loves diving deep into research, exploring trends like crypto and sustainable finance. While their insights are sharp, a tendency toward overanalysis can delay decisions, causing them to miss timely opportunities.',
      traits: [
        'Deep researcher',
        'Analytical thinker',
        'Innovation-focused',
        'Independent investor'
      ],
      recommendations: [
        'Cryptocurrencies',
        'ESG Funds',
        'Technology sector investments'
      ],
      compatibility: {
        good: {
          types: ['The Lobang King', 'The Baller'],
          reason: 'Bonds with open-minded types who appreciate their analytical insights'
        },
        challenging: {
          types: ['The Kiasu Keeper', 'The Bao Jiak Investor'],
          reason: 'Struggles with straightforward types who find their analysis overwhelming'
        }
      }
    },
   
    'ENTP': {
      name: 'The Lobang King',
      description: 'A deal hunter with a knack for spotting opportunities, the Lobang King thrives on exciting ventures like startups or REITs. While adaptable and quick to act, their eagerness for "shiok" deals may lead to frequent changes, sacrificing long-term stability.',
      traits: [
        'Opportunity seeker',
        'Trend spotter',
        'Quick adapter',
        'Creative investor'
      ],
      recommendations: [
        'Venture capital',
        'Early-stage startups',
        'REITs'
      ],
      compatibility: {
        good: {
          types: ['Tow Kay Boss', 'The Dream Chaser'],
          reason: 'Thrives with bold personalities who appreciate quick opportunities'
        },
        challenging: {
          types: ['The Sayang Saver', 'The Zai Kia Saver'],
          reason: 'Often clashes with cautious types who prefer stability'
        }
      }
    },
   
    'ISTJ': {
      name: 'The Bao Jiak Investor',
      description: 'Focused on safety, the Bao Jiak Investor prefers low-risk, predictable investments like bonds and CPF enhancements. Their disciplined nature ensures financial goals are met, but they might shy away from higher-risk opportunities that promise better returns.',
      traits: [
        'Conservative investor',
        'Traditional approach',
        'Detail-oriented',
        'Risk-averse'
      ],
      recommendations: [
        'Government bonds',
        'Fixed deposits',
        'Blue-chip stocks'
      ],
      compatibility: {
        good: {
          types: ['The Kiasu Keeper', 'The Sayang Saver'],
          reason: 'Best paired with steady types who value security'
        },
        challenging: {
          types: ['The Dream Chaser', 'The YOLO'],
          reason: 'Struggles with adventurous types who take risks'
        }
      }
    },
   
    'ESTJ': {
      name: 'The Kiasu Keeper',
      description: 'Organized and cautious, the Kiasu Keeper relies on tried-and-tested methods to secure their financial future. They excel at disciplined saving but can be slow to adopt new ideas, potentially missing innovative opportunities.',
      traits: [
        'Systematic planner',
        'Practical investor',
        'Organized manager',
        'Security-focused'
      ],
      recommendations: [
        'Fixed deposits',
        'High-interest savings accounts',
        'Property investments'
      ],
      compatibility: {
        good: {
          types: ['The Bao Jiak Investor', 'The Zai Kia Saver'],
          reason: 'Works well with structured types who value discipline'
        },
        challenging: {
          types: ['The Lobang King', 'The Baller'],
          reason: 'Clashes with spontaneous personalities who take risks'
        }
      }
    },
   
    'ISTP': {
      name: 'The Hands-On',
      description: 'A pragmatic investor, the Hands-On type seeks straightforward returns without unnecessary complications. They\'re adaptable and willing to take calculated risks, but their preference for simplicity might limit exposure to more lucrative opportunities.',
      traits: [
        'Practical investor',
        'Action-oriented',
        'Adaptable',
        'Independent thinker'
      ],
      recommendations: [
        'Dividend stocks',
        'Short-term bonds',
        'Simple ETFs'
      ],
      compatibility: {
        good: {
          types: ['The Dream Chaser', 'The Kiasu Keeper'],
          reason: 'Matches action-oriented types who value practicality'
        },
        challenging: {
          types: ['The Sibei Smart', 'The Deep Thinker'],
          reason: 'Struggles with abstract thinkers who overcomplicate decisions'
        }
      }
    },
   
    'ESTP': {
      name: 'The Dream Chaser',
      description: 'Bold and energetic, the Dream Chaser thrives on high-risk, high-reward investments. While quick to adapt and seize opportunities, their impulsiveness can lead to setbacks if risks aren\'t calculated carefully.',
      traits: [
        'Action-oriented',
        'Risk-tolerant',
        'Opportunistic',
        'Quick decision maker'
      ],
      recommendations: [
        'High-yield stocks',
        'Investment-linked policies',
        'Cryptocurrency'
      ],
      compatibility: {
        good: {
          types: ['The Tow Kay Boss', 'The Lobang King'],
          reason: 'Pairs well with ambitious types who embrace risk'
        },
        challenging: {
          types: ['The Bao Jiak Investor', 'The Sayang Saver'],
          reason: 'Struggles with conservative personalities who avoid risk'
        }
      }
    },
   
    'ISFJ': {
      name: 'The Sayang Saver',
      description: 'Family-focused and dependable, the Sayang Saver prioritizes low-risk investments to secure a stable foundation for loved ones. While careful planning ensures safety, they may miss out on higher returns by avoiding riskier options.',
      traits: [
        'Family-oriented planner',
        'Security-focused',
        'Careful investor',
        'Nurturing approach'
      ],
      recommendations: [
        'Savings bonds',
        'Family-oriented insurance plans',
        'Endowment plans'
      ],
      compatibility: {
        good: {
          types: ['The Kiasu Keeper', 'The Bao Jiak Investor'],
          reason: 'Best with steady personalities who value family security'
        },
        challenging: {
          types: ['The Dream Chaser', 'The Lobang King'],
          reason: 'Clashes with high-risk takers who prioritize growth over security'
        }
      }
    },
   
    'ESFJ': {
      name: 'The Steady Kia',
      description: 'Generous and loyal, the Steady Kia often prioritizes family and friends, building a stable financial foundation for loved ones. However, their tendency to help others may put their own financial stability at risk.',
      traits: [
        'Community-minded',
        'Stable planner',
        'Reliable manager',
        'Supportive approach'
      ],
      recommendations: [
        'Whole life insurance',
        'Conservative unit trusts',
        'Family savings plans'
      ],
      compatibility: {
        good: {
          types: ['The Sayang Saver', 'The Kind Soul'],
          reason: 'Works well with family-oriented types who share their values'
        },
        challenging: {
          types: ['The YOLO', 'The Dream Chaser'],
          reason: 'Clashes with independent types who prioritize personal goals'
        }
      }
    },
   
    'ISFP': {
      name: 'The Kind Soul',
      description: 'Guided by compassion, the Kind Soul favors ethical investments, often prioritizing causes over returns. While their values shine, they may overlook financial gains in pursuit of impact.',
      traits: [
        'Values-driven investor',
        'Ethical focus',
        'Compassionate approach',
        'Creative thinker'
      ],
      recommendations: [
        'ESG funds',
        'Green bonds',
        'Sustainable mutual funds'
      ],
      compatibility: {
        good: {
          types: ['The Deep Thinker', 'The Steady Kia'],
          reason: 'Aligns with thoughtful types who share their values'
        },
        challenging: {
          types: ['The Tow Kay Boss', 'The Sibei Smart'],
          reason: 'Clashes with profit-driven personalities who prioritize returns'
        }
      }
    },
   
    'ESFP': {
      name: 'The YOLO',
      description: 'A carefree spirit, the YOLO type prioritizes enjoying life over rigid planning. While their optimism is infectious, a lack of long-term strategy can lead to financial instability.',
      traits: [
        'Flexible investor',
        'Experience-focused',
        'Adaptable planner',
        'Social approach'
      ],
      recommendations: [
        'Flexible savings plans',
        'REITs',
        'Lifestyle-focused investments'
      ],
      compatibility: {
        good: {
          types: ['The Baller', 'The Dream Chaser'],
          reason: 'Bonds with spontaneous personalities who enjoy life'
        },
        challenging: {
          types: ['The Kiasu Keeper', 'The Zai Kia Saver'],
          reason: 'Struggles with structured types who demand planning'
        }
      }
    },
   
    'INFJ': {
      name: 'The Deep Thinker',
      description: 'Reflective and idealistic, the Deep Thinker values meaningful investments. However, overthinking decisions can delay action, potentially missing opportunities.',
      traits: [
        'Visionary planner',
        'Values-driven',
        'Long-term focus',
        'Purposeful investor'
      ],
      recommendations: [
        'ESG investments',
        'Impact investing',
        'Socially responsible funds'
      ],
      compatibility: {
        good: {
          types: ['The Kind Soul', 'The Sibei Smart'],
          reason: 'Matches values-driven types who appreciate deep analysis'
        },
        challenging: {
          types: ['The Hands-On', 'The Kiasu Keeper'],
          reason: 'Struggles with pragmatic types who prefer simple solutions'
        }
      }
    },
   
    'ENFJ': {
      name: 'The Kampung Hero',
      description: 'Generous and community-minded, the Kampung Hero focuses on supporting others but may neglect personal goals while helping loved ones.',
      traits: [
        'Community leader',
        'Supportive planner',
        'Inspiring approach',
        'People-focused'
      ],
      recommendations: [
        'Community investment schemes',
        'Family-oriented plans',
        'Socially responsible investments'
      ],
      compatibility: {
        good: {
          types: ['The Steady Kia', 'The Kind Soul'],
          reason: 'Bonds with supportive types who value community'
        },
        challenging: {
          types: ['The YOLO', 'The Baller'],
          reason: 'Clashes with individualistic personalities focused on personal enjoyment'
        }
      }
    },
   
    'INFP': {
      name: 'The Kena Inspired',
      description: 'Creative and idealistic, the Kena Inspired seeks meaningful investments but often lacks concrete financial goals, relying more on dreams than plans.',
      traits: [
        'Idealistic investor',
        'Creative approach',
        'Values-aligned',
        'Purpose-driven'
      ],
      recommendations: [
        'Impact investing',
        'Arts and culture funds',
        'Sustainable investments'
      ],
      compatibility: {
        good: {
          types: ['The Deep Thinker', 'The Kind Soul'],
          reason: 'Connects with thoughtful types who share their idealism'
        },
        challenging: {
          types: ['The Tow Kay Boss', 'The Kiasu Keeper'],
          reason: 'Mismatches with goal-oriented types focused on practical results'
        }
      }
    },
   
    'ENFP': {
      name: 'The Baller',
      description: 'Spontaneous and adaptable, the Baller balances treating themselves with saving flexibly. However, impulsive spending can lead to short-term financial challenges.',
      traits: [
        'Enthusiastic investor',
        'Creative opportunist',
        'Flexible approach',
        'Adventure-seeker'
      ],
      recommendations: [
        'High-interest savings',
        'Diverse ETF portfolio',
        'Flexible investment schemes'
      ],
      compatibility: {
        good: {
          types: ['The YOLO', 'The Lobang King'],
          reason: 'Best with free-spirited types who embrace flexibility'
        },
        challenging: {
          types: ['The Zai Kia Saver', 'The Bao Jiak Investor'],
          reason: 'Clashes with structured types who demand strict planning'
        }
      }
    }
   };

   const QuizContainer = () => {
    const [currentState, setCurrentState] = useState<QuizState>(QuizState.COVER);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, boolean>>({});
  
    const calculatePersonalityType = () => {
      const scores = {
        EI: 0, // Negative = E, Positive = I
        SN: 0, // Negative = S, Positive = N
        TF: 0, // Negative = T, Positive = F
        JP: 0  // Negative = J, Positive = P
      };
  
      console.log('Calculating with answers:', answers);
  
      // Questions 1-3: E/I
      [0, 1, 2].forEach(i => {
        scores.EI += answers[i] ? 1 : -1;
      });
  
      // Questions 4-6: S/N
      [3, 4, 5].forEach(i => {
        scores.SN += answers[i] ? 1 : -1;
      });
  
      // Questions 7-9: T/F
      [6, 7, 8].forEach(i => {
        scores.TF += answers[i] ? 1 : -1;
      });
  
      // Questions 10-12: J/P
      [9, 10, 11].forEach(i => {
        scores.JP += answers[i] ? 1 : -1;
      });
  
      const type = [
        scores.EI >= 0 ? 'I' : 'E',
        scores.SN >= 0 ? 'N' : 'S',
        scores.TF >= 0 ? 'T' : 'F',
        scores.JP >= 0 ? 'J' : 'P'
      ].join('');
  
      console.log('Scores:', scores);
      console.log('Calculated type:', type);
      console.log('Found personality:', personalityTypes[type]);
  
      return personalityTypes[type];
    };
  
    const handleRetake = () => {
      setCurrentState(QuizState.COVER);
      setCurrentQuestionIndex(0);
      setAnswers({});
    };
  
    const handleStart = () => {
      setCurrentState(QuizState.QUESTION);
    };
  
    const handleAnswer = (answer: boolean) => {
      setAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answer
      }));
  
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        const result = calculatePersonalityType();
        console.log('Final answers:', answers);
        console.log('Calculated personality:', result);
        setCurrentState(QuizState.RESULT);
      }
    };
  
    const handleSaveQuest = () => {
      console.log('Saving quest...');
      // Implement the consent page transition or functionality here
    };
  
    const pageVariants = {
      initial: { x: "100%" },
      enter: { 
        x: 0,
        transition: {
          duration: 0.3,
          ease: [0.33, 1, 0.68, 1]
        }
      }
    };
  
    return (
      <div className="fixed inset-0 overflow-hidden bg-black">
        <div className="relative w-full h-full">
          <AnimatePresence initial={false}>
            {currentState === QuizState.COVER && (
              <motion.div key="cover" {...pageVariants} className="absolute inset-0">
                <CoverPage onStart={handleStart} />
              </motion.div>
            )}
  
            {currentState === QuizState.QUESTION && (
              <div className="absolute inset-0 flex">
                <motion.div
                  key={`question-${currentQuestionIndex}`}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute w-full h-full"
                >
                  <QuestionPage
                    questionNumber={currentQuestionIndex + 1}
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswer}
                  />
                </motion.div>
              </div>
            )}
  
            {currentState === QuizState.RESULT && (
              <motion.div 
                key="result"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut"
                }}
                className="absolute w-full h-full"
              >
                <ResultsPage
                  name={calculatePersonalityType().name}
                  description={calculatePersonalityType().description}
                  traits={calculatePersonalityType().traits}
                  recommendations={calculatePersonalityType().recommendations}
                  compatibility={calculatePersonalityType().compatibility}
                  onRetake={handleRetake}
                  onSaveQuest={handleSaveQuest}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };
  
  export default QuizContainer;