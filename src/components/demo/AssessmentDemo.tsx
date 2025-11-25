import React, { useState, useRef, useEffect } from 'react';
import { Shield, Lock, Box, FileText, ChevronRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AssessmentDemo: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const progressBarRef = useRef<HTMLDivElement>(null);

  const domains = [
    { id: 'threat-intelligence', name: 'CyberCaution', icon: Shield, score: 3.5 },
    { id: 'supply-chain-risk', name: 'VendorSoluce', icon: Box, score: 2.8 },
    { id: 'compliance-management', name: 'CyberCorrect', icon: Lock, score: 4.2 },
    { id: 'training-awareness', name: 'CyberCertitude', icon: FileText, score: 3.1 },
  ];

  const questions = [
    {
      id: 'q1',
      domain: 'threat-intelligence',
      question: 'How would you rate your organization\'s incident response capabilities?',
      description: 'Evaluate your ability to detect, respond to, and recover from security incidents.',
      maturityLevels: [
        { level: 1, label: 'Initial', description: 'Ad-hoc response with no formal procedures' },
        { level: 2, label: 'Developing', description: 'Basic procedures documented but not regularly tested' },
        { level: 3, label: 'Defined', description: 'Formal procedures with regular testing' },
        { level: 4, label: 'Managed', description: 'Measured and controlled response processes' },
        { level: 5, label: 'Optimizing', description: 'Continuous improvement of response capabilities' },
      ],
      frameworks: ['NIST CSF PR.IP-9', 'ISO 27001 A.16'],
    },
    {
      id: 'q2',
      domain: 'threat-intelligence',
      question: 'How mature is your backup and recovery strategy?',
      description: 'Assess your organization\'s ability to protect and restore critical data.',
      maturityLevels: [
        { level: 1, label: 'Initial', description: 'Basic backups with no formal strategy' },
        { level: 2, label: 'Developing', description: 'Regular backups but limited testing' },
        { level: 3, label: 'Defined', description: 'Documented strategy with periodic testing' },
        { level: 4, label: 'Managed', description: 'Automated backups with regular validation' },
        { level: 5, label: 'Optimizing', description: 'Advanced strategy with continuous validation' },
      ],
      frameworks: ['NIST CSF PR.IP-4', 'ISO 27001 A.12.3'],
    },
  ];

  useEffect(() => {
    if (progressBarRef.current) {
      const progressWidth = `${((currentQuestion + 1) / questions.length) * 100}%`;
      progressBarRef.current.style.setProperty('--progress-width', progressWidth);
    }
  }, [currentQuestion, questions.length]);

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Security Assessment Demo
        </h2>

        <AnimatePresence mode="wait">
          {!selectedDomain ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <p className="text-gray-600 dark:text-gray-300">
                Select a security domain to begin the assessment:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {domains.map(({ id, name, icon: Icon, score }) => (
                  <motion.button
                    key={id}
                    onClick={() => setSelectedDomain(id)}
                    className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900 dark:text-white">{name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Current Score: {score}/5.0</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedDomain(null)}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  ← Back to Domains
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <div 
                    ref={progressBarRef}
                    className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"
                  >
                    <div
                      className="h-2 bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-300 w-[var(--progress-width)]"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {questions[currentQuestion].question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {questions[currentQuestion].description}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    {questions[currentQuestion].frameworks.map((framework) => (
                      <span
                        key={framework}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {framework}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {questions[currentQuestion].maturityLevels.map(({ level, label, description }) => (
                    <motion.button
                      key={level}
                      onClick={() => {
                        setAnswers({
                          ...answers,
                          [questions[currentQuestion].id]: level,
                        });
                      }}
                      className={`w-full p-4 border dark:border-gray-700 rounded-lg text-left transition-colors ${
                        answers[questions[currentQuestion].id] === level
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50'
                          : 'hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-medium text-gray-900 dark:text-white">
                          Level {level}: {label}
                        </span>
                        {answers[questions[currentQuestion].id] === level && (
                          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 ml-2" />
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{description}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="flex justify-between pt-6">
                  <button
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === questions.length - 1}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50"
                  >
                    Next Question
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AssessmentDemo;