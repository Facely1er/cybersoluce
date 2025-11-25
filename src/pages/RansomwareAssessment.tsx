import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AlertTriangle, CheckCircle, Circle, Info, Shield, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AssessmentStartScreen, { SectionInfo } from '../components/assessment/AssessmentStartScreen';

const RansomwareAssessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showStartScreen, setShowStartScreen] = useState(true);

  const sections = [
    {
      title: "Risk Management",
      description: "Ransomware risk management and governance",
      estimatedTime: "10min",
      complexity: "Basic" as const,
      questionCount: 5,
      questions: [
        {
          id: "RM-1",
          question: "Has your organization performed a ransomware-specific risk assessment?",
          control: "NIST IR 8374 2.1 | CSF ID.RA-1",
          guidance: "Perform a ransomware-specific risk assessment aligned with CSF Identify function"
        },
        {
          id: "RM-2",
          question: "Are ransomware risks included in your overall cybersecurity risk register?",
          control: "NIST IR 8374 2.1.1 | CSF ID.RM-1",
          guidance: "Integrate ransomware risks into enterprise risk management processes"
        },
        {
          id: "RM-3",
          question: "Have you identified critical systems and data that would be high-value ransomware targets?",
          control: "NIST IR 8374 2.1.2 | CSF ID.AM-5",
          guidance: "Identify and prioritize high-value assets according to criticality and business value"
        },
        {
          id: "RM-4",
          question: "Do you have a specific ransomware prevention strategy with executive support?",
          control: "NIST IR 8374 2.1.3 | CSF ID.GV-1",
          guidance: "Develop and maintain a comprehensive ransomware prevention strategy with leadership support"
        },
        {
          id: "RM-5",
          question: "Are third-party and supply chain ransomware risks evaluated?",
          control: "NIST IR 8374 2.1.4 | CSF ID.SC-2",
          guidance: "Assess ransomware risks from third-party suppliers and business partners"
        }
      ]
    },
    {
      title: "Identity Management & Access Control",
      description: "Authentication and access control practices",
      estimatedTime: "15min",
      complexity: "Intermediate" as const,
      questionCount: 5,
      questions: [
        {
          id: "AC-1",
          question: "Is multi-factor authentication (MFA) implemented for all remote access?",
          control: "NIST IR 8374 2.2.1 | CSF PR.AC-1",
          guidance: "Implement MFA for all remote access to enterprise resources"
        },
        {
          id: "AC-2",
          question: "Is MFA implemented for all privileged user accounts?",
          control: "NIST IR 8374 2.2.2 | CSF PR.AC-4",
          guidance: "Require MFA for all administrators and privileged users"
        },
        {
          id: "AC-3",
          question: "Are privileged accounts managed with just-enough and just-in-time access principles?",
          control: "NIST IR 8374 2.2.3 | CSF PR.AC-4",
          guidance: "Implement just-in-time and just-enough access for privileges"
        },
        {
          id: "AC-4",
          question: "Do you regularly audit user accounts and remove unused accounts?",
          control: "NIST IR 8374 2.2.4 | CSF PR.AC-1",
          guidance: "Regularly audit and remove unnecessary accounts"
        },
        {
          id: "AC-5",
          question: "Are administrator accounts separated from user accounts?",
          control: "NIST IR 8374 2.2.5 | CSF PR.AC-4",
          guidance: "Maintain separation between user and administrator accounts to limit privilege escalation"
        }
      ]
    },
    {
      title: "Protective Technology",
      description: "Technical controls to prevent ransomware",
      estimatedTime: "20min",
      complexity: "Advanced" as const,
      questionCount: 5,
      questions: [
        {
          id: "PT-1",
          question: "Do you maintain offline, encrypted backups of data?",
          control: "NIST IR 8374 2.3.1 | CSF PR.IP-4",
          guidance: "Maintain offline, encrypted backups of critical data with integrity verification"
        },
        {
          id: "PT-2",
          question: "Is anti-malware/anti-ransomware software deployed and kept updated?",
          control: "NIST IR 8374 2.3.2 | CSF PR.DS-5",
          guidance: "Deploy and maintain anti-malware solutions that include ransomware protection"
        },
        {
          id: "PT-3",
          question: "Are all operating systems and applications kept updated with security patches?",
          control: "NIST IR 8374 2.3.3 | CSF PR.IP-12",
          guidance: "Implement a vulnerability management program with timely patching"
        },
        {
          id: "PT-4",
          question: "Do you use application allowlisting to prevent unauthorized code execution?",
          control: "NIST IR 8374 2.3.4 | CSF PR.PT-3",
          guidance: "Implement application allowlisting to prevent unauthorized code execution"
        },
        {
          id: "PT-5",
          question: "Are network segments isolated to limit lateral movement?",
          control: "NIST IR 8374 2.3.5 | CSF PR.AC-5",
          guidance: "Implement network segmentation and micro-segmentation to limit propagation"
        }
      ]
    },
    {
      title: "Email & Phishing Defense",
      description: "Controls to prevent phishing-based ransomware attacks",
      estimatedTime: "10min",
      complexity: "Basic" as const,
      questionCount: 4,
      questions: [
        {
          id: "EP-1",
          question: "Is email filtering technology implemented to detect malicious attachments and links?",
          control: "NIST IR 8374 2.4.1 | CSF PR.DS-2",
          guidance: "Implement email filtering and scanning solutions to detect malware and phishing"
        },
        {
          id: "EP-2",
          question: "Do you block macros in documents from the internet?",
          control: "NIST IR 8374 2.4.2 | CSF PR.PT-3",
          guidance: "Block or restrict macros from Internet-sourced documents"
        },
        {
          id: "EP-3",
          question: "Are users trained regularly on phishing awareness?",
          control: "NIST IR 8374 2.4.3 | CSF PR.AT-1",
          guidance: "Conduct regular phishing awareness training and simulations"
        },
        {
          id: "EP-4",
          question: "Do you have a process for users to report suspicious emails?",
          control: "NIST IR 8374 2.4.4 | CSF DE.CM-8",
          guidance: "Establish a streamlined process for reporting suspicious emails and phishing attempts"
        }
      ]
    },
    {
      title: "Detection & Monitoring",
      description: "Capabilities to detect ransomware activity",
      estimatedTime: "15min",
      complexity: "Intermediate" as const,
      questionCount: 5,
      questions: [
        {
          id: "DM-1",
          question: "Do you have monitoring in place to detect unusual file activity (encryption, renaming)?",
          control: "NIST IR 8374 2.5.1 | CSF DE.CM-1",
          guidance: "Monitor for mass file changes and encryption attempts characteristic of ransomware"
        },
        {
          id: "DM-2",
          question: "Are system logs centralized and monitored for suspicious activities?",
          control: "NIST IR 8374 2.5.2 | CSF DE.CM-6",
          guidance: "Implement centralized logging and monitoring with ransomware-specific detection rules"
        },
        {
          id: "DM-3",
          question: "Do you monitor for unauthorized encryption tools or processes?",
          control: "NIST IR 8374 2.5.3 | CSF DE.CM-4",
          guidance: "Monitor for unauthorized encryption processes or tools that may indicate ransomware"
        },
        {
          id: "DM-4",
          question: "Is there a 24/7 monitoring capability for ransomware detection?",
          control: "NIST IR 8374 2.5.4 | CSF DE.CM-7",
          guidance: "Establish continuous security monitoring for ransomware indicators"
        },
        {
          id: "DM-5",
          question: "Do you conduct regular vulnerability scanning for ransomware vulnerabilities?",
          control: "NIST IR 8374 2.5.5 | CSF DE.CM-8",
          guidance: "Perform regular vulnerability scanning with focus on ransomware vectors"
        }
      ]
    },
    {
      title: "Incident Response & Recovery",
      description: "Readiness to respond to ransomware incidents",
      estimatedTime: "20min",
      complexity: "Advanced" as const,
      questionCount: 6,
      questions: [
        {
          id: "IR-1",
          question: "Do you have a ransomware-specific incident response plan?",
          control: "NIST IR 8374 2.6.1 | CSF RS.RP-1",
          guidance: "Develop a ransomware-specific incident response plan that defines roles and procedures"
        },
        {
          id: "IR-2",
          question: "Are backups tested regularly to ensure they can be successfully restored?",
          control: "NIST IR 8374 2.6.2 | CSF RC.RP-1",
          guidance: "Test backup restoration procedures regularly to verify integrity and reliability"
        },
        {
          id: "IR-3",
          question: "Do you conduct tabletop exercises for ransomware scenarios?",
          control: "NIST IR 8374 2.6.3 | CSF PR.IP-10",
          guidance: "Conduct exercises simulating ransomware incidents to test response capabilities"
        },
        {
          id: "IR-4",
          question: "Is there a clear decision-making framework for ransomware response?",
          control: "NIST IR 8374 2.6.4 | CSF RS.CO-1",
          guidance: "Establish clear incident decision-making processes including ransom payment considerations"
        },
        {
          id: "IR-5",
          question: "Do you have offline copies of recovery procedures?",
          control: "NIST IR 8374 2.6.5 | CSF RC.CO-3",
          guidance: "Maintain offline, accessible recovery documentation that cannot be compromised in an attack"
        },
        {
          id: "IR-6",
          question: "Is there a communication plan for internal and external stakeholders during an incident?",
          control: "NIST IR 8374 2.6.6 | CSF RS.CO-4",
          guidance: "Develop communication templates and procedures for ransomware incidents"
        }
      ]
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateSectionScore = (sectionIndex: number) => {
    const sectionQuestions = sections[sectionIndex].questions;
    let score = 0;
    let answered = 0;

    sectionQuestions.forEach(question => {
      const answer = answers[question.id];
      if (answer === 'yes') {
        score += 2;
        answered++;
      } else if (answer === 'partial') {
        score += 1;
        answered++;
      } else if (answer === 'no') {
        answered++;
      }
    });

    return {
      score,
      total: sectionQuestions.length * 2,
      completed: answered === sectionQuestions.length,
      percentage: Math.round((score / (sectionQuestions.length * 2)) * 100)
    };
  };

  const getOverallScore = () => {
    let totalScore = 0;
    let totalPossible = 0;

    sections.forEach((_, index) => {
      const sectionScore = calculateSectionScore(index);
      totalScore += sectionScore.score;
      totalPossible += sectionScore.total;
    });

    return Math.round((totalScore / totalPossible) * 100);
  };

  const renderAnswerButtons = (questionId: string) => {
    const currentAnswer = answers[questionId];
    
    return (
      <div className="flex gap-2 mt-2">
        <Button
          variant={currentAnswer === 'yes' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'yes')}
          className="flex items-center gap-1"
        >
          <CheckCircle className="w-4 h-4" />
          Yes
        </Button>
        <Button
          variant={currentAnswer === 'partial' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'partial')}
          className="flex items-center gap-1"
        >
          <Circle className="w-4 h-4" />
          Partial
        </Button>
        <Button
          variant={currentAnswer === 'no' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleAnswer(questionId, 'no')}
          className="flex items-center gap-1"
        >
          <AlertTriangle className="w-4 h-4" />
          No
        </Button>
      </div>
    );
  };

  const getCsfCategory = (controlRef: string) => {
    if (!controlRef.includes('CSF')) return null;
    
    const csfPart = controlRef.split('CSF')[1].trim();
    const category = csfPart.split('.')[0];
    
    switch (category) {
      case 'ID': return 'Identify';
      case 'PR': return 'Protect';
      case 'DE': return 'Detect';
      case 'RS': return 'Respond';
      case 'RC': return 'Recover';
      default: return null;
    }
  };

  // Determine if we have enough answers to show results
  const hasCompletedMinimumSections = () => {
    let completedSections = 0;
    sections.forEach((_, index) => {
      if (calculateSectionScore(index).completed) {
        completedSections++;
      }
    });
    return completedSections >= Math.ceil(sections.length / 2);
  };

  const handleViewResults = () => {
    // In a real application, you would save the assessment results
    // before navigating to the results page
    navigate('/ransomware-results');
  };

  // Create a list of section info for the start screen
  const sectionInfoList: SectionInfo[] = sections.map(section => ({
    title: section.title,
    description: section.description,
    estimatedTime: section.estimatedTime,
    complexity: section.complexity,
    questionCount: section.questions.length
  }));

  if (showStartScreen) {
    return (
      <AssessmentStartScreen
        title="Ransomware Readiness Assessment"
        description="Evaluate your organization's preparedness against ransomware threats"
        frameworkName="NIST IR 8374"
        sections={sectionInfoList}
        onStart={() => setShowStartScreen(false)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Ransomware Readiness Assessment</h1>
        <p className="text-muted-foreground mb-6">Based on NIST IR 8374 and NIST Cybersecurity Framework</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {sections.map((section, index) => {
          const score = calculateSectionScore(index);
          return (
            <Card key={index} className="p-4 border dark:border-muted">
              <h3 className="font-semibold mb-2 text-foreground">{section.title}</h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Score: {score.percentage}%</p>
                  <p className="text-sm text-muted-foreground">
                    {score.completed ? 'Complete' : 'Incomplete'}
                  </p>
                </div>
                <Button
                  variant={currentSection === index ? 'default' : 'outline'}
                  onClick={() => setCurrentSection(index)}
                  size="sm"
                >
                  {currentSection === index ? 'Current' : 'View'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 border dark:border-muted">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">{sections[currentSection].title}</h2>
            <p className="text-muted-foreground">{sections[currentSection].description}</p>
          </div>
          <div className="text-xl font-semibold text-foreground">
            Overall Score: {getOverallScore()}%
          </div>
        </div>

        <div className="space-y-6">
          {sections[currentSection].questions.map((question) => {
            const csfCategory = getCsfCategory(question.control);
            return (
              <div key={question.id} className="border-b border-border pb-4 last:border-b-0">
                <div className="flex items-start gap-2 mb-2">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono">
                    {question.id}
                  </div>
                  <p className="font-medium text-foreground flex-1">{question.question}</p>
                </div>
                
                <div className="bg-muted/50 dark:bg-muted/20 p-3 rounded mb-3">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-1" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{question.control}</p>
                        {csfCategory && (
                          <span className="bg-blue-100/80 dark:bg-blue-900/80 text-blue-800 dark:text-blue-200 text-xs px-2 py-0.5 rounded">
                            CSF: {csfCategory}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{question.guidance}</p>
                    </div>
                  </div>
                </div>
                
                {renderAnswerButtons(question.id)}
              </div>
            );
          })}
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
            disabled={currentSection === 0}
          >
            Previous Section
          </Button>
          
          {currentSection < sections.length - 1 ? (
            <Button
              onClick={() => setCurrentSection(prev => prev + 1)}
            >
              Next Section
            </Button>
          ) : (
            <Button
              onClick={handleViewResults}
              disabled={!hasCompletedMinimumSections()}
              className="flex items-center gap-2"
            >
              View Results
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RansomwareAssessment;