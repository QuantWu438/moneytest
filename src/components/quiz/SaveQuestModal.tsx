// src/components/quiz/SaveQuestModal.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

interface SaveQuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalityType: string;
  description: string;
  traits: string[];
  recommendations: string[];
}

const PhoneInputCustom = ({ value, onChange }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className="flex items-center bg-black/50 border border-neon-blue/30 text-white p-2 rounded">
      <Image
        src="/Flag_of_Singapore.svg"
        alt="Singapore Flag"
        width={24}
        height={16}
        className="mr-2"
      />
      <span className="text-white mr-2">+65</span>
      <input
        type="tel"
        className="flex-grow bg-transparent border-none outline-none text-white"
        placeholder="Enter phone number"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-black/95 border border-neon-blue/30 max-w-lg rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

const SaveQuestModal: React.FC<SaveQuestModalProps> = ({
  isOpen,
  onClose,
  personalityType,
  description,
  traits,
  recommendations,
}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(300);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 2) {
      if (otpInputRef.current) {
        otpInputRef.current.focus();
      }

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setOtpError('OTP has expired. Please resend OTP.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [step]);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: '+65' + phoneNumber,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send OTP');
      }

      setStep(2);
      setCountdown(300);
    } catch (err: unknown) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setOtpError('Please enter the OTP');
      return;
    }

    setOtpError('');
    setIsVerifying(true);

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: '+65' + phoneNumber,
          otp,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to verify OTP');
      }

      // After OTP verification, send email with additional details
      try {
        const emailResponse = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            personalityType,
            description,        // Include Description
            traits,             // Include Traits
            recommendations,    // Include Recommendations
            // phoneNumber and otp are optional and won't be used in email
          }),
        });

        if (!emailResponse.ok) {
          const emailData = await emailResponse.json();
          throw new Error(emailData.message || 'Failed to send email');
        }

        setStep(3);
      } catch (err: unknown) {
        setError(err.message || 'Failed to send email after OTP verification.');
      }
    } catch (err: unknown) {
      setOtpError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    setError('');
    setOtpError('');
    setOtp('');
    setCountdown(300);

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: '+65' + phoneNumber,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setOtpError('OTP resent successfully');
      setStep(2);
      setCountdown(300);
    } catch (err: unknown) {
      setOtpError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-neon-blue font-orbitron">
                🚀 Unlock Your Financial Potential
              </h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-4 text-gray-200 font-orbitron">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0">
                    ✓
                  </div>
                  <p>Get a detailed report of your {personalityType} traits</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0">
                    ✓
                  </div>
                  <p>Join our authentic commmunity together</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-neon-blue/10 flex items-center justify-center text-neon-blue shrink-0">
                    ✓
                  </div>
                  <p>Personalized financial growth roadmap</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-black/50 border-neon-blue/30 text-white font-orbitron"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-black/50 border-neon-blue/30 text-white font-orbitron"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PhoneInputCustom
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {error && (
                  <p className="text-red-400 text-sm font-orbitron">{error}</p>
                )}
                <p className="text-xs text-gray-400 text-center font-orbitron">
                  We&apos;ll send your personality insights right away!
                </p>
              </div>

              <button
                className="w-full py-4 text-lg relative overflow-hidden group bg-neon-blue hover:bg-neon-blue/90 text-white rounded 
                  font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span className="relative z-10">Get Your Free Report</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </>
                )}
              </button>

              <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 font-orbitron">
                <div className="flex flex-col items-center justify-center space-y-1 bg-black/30 p-2 rounded-lg">
                  <span className="text-lg">🔒</span>
                  <span>Secure & Private</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1 bg-black/30 p-2 rounded-lg">
                  <span className="text-lg">📊</span>
                  <span>Data Driven</span>
                </div>
                <div className="flex flex-col items-center justify-center space-y-1 bg-black/30 p-2 rounded-lg">
                  <span className="text-lg">🔎</span>
                  <span>Transparency</span>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-neon-blue font-orbitron">
                🔐 Verify Your Phone Number
              </h2>
              <p className="text-gray-400 mt-2 font-orbitron">Enter the OTP sent to your phone</p>
            </div>

            <div className="space-y-4">
              <Input
                ref={otpInputRef}
                type="text"
                placeholder="Enter OTP"
                className="bg-black/50 border-neon-blue/30 text-white font-orbitron"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              {otpError && (
                <p className="text-red-400 text-sm font-orbitron">{otpError}</p>
              )}
              <p className="text-center text-sm text-gray-400 font-orbitron">
                OTP expires in: {Math.floor(countdown / 60)}:{('0' + (countdown % 60)).slice(-2)}
              </p>
            </div>

            <button
              className="w-full py-4 text-lg relative overflow-hidden group bg-neon-blue hover:bg-neon-blue/90 
                text-white rounded font-orbitron disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleVerifyOtp}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Verify OTP</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/30 to-neon-blue/0 
                              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 font-orbitron">
              Didn&apos;t receive the OTP?{' '}
              <button
                onClick={handleResendOtp}
                className="text-neon-blue hover:underline disabled:opacity-50"
                disabled={isSubmitting}
              >
                Resend OTP
              </button>
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-neon-blue/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
            
            <h2 className="text-2xl text-neon-blue font-orbitron">
              Welcome Aboard, {name}!
            </h2>
            
            <div className="space-y-4">
              <p className="text-gray-200 font-orbitron">
                Your personalized {personalityType} report is on its way to your inbox!
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  Check your email: {email}
                </p>
                <p className="text-xs text-gray-400">
                  (Don&apos;t see it? Check your spam folder)
                </p>
              </div>
            </div>

            <button
              className="w-full py-3 bg-neon-blue hover:bg-neon-blue/90 text-white rounded font-orbitron"
              onClick={onClose}
            >
              Return to Results
            </button>
          </div>
        )}
      </motion.div>
    </Modal>
  );
};

export default SaveQuestModal;
