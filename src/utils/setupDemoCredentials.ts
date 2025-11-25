import { v4 as uuidv4 } from 'uuid';
import { isDemoEnvironment } from './environment';

// Storage keys used by the application
const STORAGE_KEYS = {
  USERS: 'cybersoluceUsers',
  CURRENT_USER: 'cybersoluceCurrentUser',
  ASSESSMENTS: 'cybersoluceAssessments',
  USED_ASSESSMENTS: 'cybersoluceUsedAssessments'
};

// Demo user details
const demoUser = {
  id: '12345-demo-user',
  email: 'demo@cybersoluce.com',
  firstName: 'Demo',
  lastName: 'User',
  organization: 'Demo Organization',
  userTier: 'professional', // 'free', 'professional', or 'enterprise'
  createdAt: new Date().toISOString()
};

// Demo assessment examples
const demoAssessments = [
  {
    id: uuidv4(),
    name: 'Q3 2023 CyberCaution Assessment',
    domain: 'threat-intelligence',
    progress: 100,
    score: 3.5,
    status: 'completed',
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
    userId: demoUser.id,
    frameworks: ['nist-csf', 'iso27001'],
    regions: ['na', 'eu']
  },
  {
    id: uuidv4(),
    name: 'VendorSoluce Review',
    domain: 'supply-chain-risk',
    progress: 75,
    score: 2.8,
    status: 'inProgress',
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    userId: demoUser.id,
    frameworks: ['nist-csf'],
    regions: ['na']
  },
  {
    id: uuidv4(),
    name: 'CyberCorrect Audit',
    domain: 'compliance-management',
    progress: 90,
    score: 4.2,
    status: 'completed',
    lastUpdated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
    userId: demoUser.id,
    frameworks: ['iso27001', 'cis'],
    regions: ['eu']
  },
  {
    id: uuidv4(),
    name: 'CyberCertitude Assessment',
    domain: 'training-awareness',
    progress: 30,
    score: 3.1,
    status: 'inProgress',
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    userId: demoUser.id,
    frameworks: ['cis'],
    regions: ['apac']
  }
];

// Used assessments tracking for the demo user
const demoUsedAssessments = {
  [demoUser.id]: {
    'threat-intelligence': true,
    'supply-chain-risk': true,
    'compliance-management': false,
    'training-awareness': false
  }
};

/**
 * Initialize the demo user and assessments
 */
export const setupDemoCredentials = () => {
  // Check if we're in a development or demo environment
  if (!isDemoEnvironment()) {
    console.warn('Demo credentials can only be set up in development or demo environments.');
    return {
      error: 'Demo credentials can only be set up in development or demo environments.',
      allowed: false
    };
  }
  
  // Get existing data or initialize empty arrays/objects
  const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const existingAssessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');
  const existingUsedAssessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.USED_ASSESSMENTS) || '{}');
  
  // Remove any existing demo user to avoid duplicates
  const filteredUsers = existingUsers.filter((user: any) => user.email !== demoUser.email);
  filteredUsers.push(demoUser);
  
  // Remove any existing assessments for the demo user
  const filteredAssessments = existingAssessments.filter((assessment: any) => assessment.userId !== demoUser.id);
  demoAssessments.forEach(assessment => filteredAssessments.push(assessment));
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
  localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filteredAssessments));
  
  // Set used assessments
  existingUsedAssessments[demoUser.id] = demoUsedAssessments[demoUser.id];
  localStorage.setItem(STORAGE_KEYS.USED_ASSESSMENTS, JSON.stringify(existingUsedAssessments));
  
  console.log('Demo credentials created successfully!');
  console.log('Email: demo@cybersoluce.com');
  console.log('Password: any value will work for the demo user');
  
  return {
    email: demoUser.email,
    message: 'Demo credentials created successfully. You can now login with the demo email.',
    allowed: true
  };
};

/**
 * Remove the demo user and assessments
 */
export const cleanupDemoCredentials = () => {
  // Check if we're in a development or demo environment
  if (!isDemoEnvironment()) {
    console.warn('Demo credentials can only be cleaned up in development or demo environments.');
    return {
      error: 'Demo credentials can only be cleaned up in development or demo environments.',
      allowed: false
    };
  }
  
  // Get existing data
  const existingUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const existingAssessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSESSMENTS) || '[]');
  const existingUsedAssessments = JSON.parse(localStorage.getItem(STORAGE_KEYS.USED_ASSESSMENTS) || '{}');
  
  // Remove demo user
  const filteredUsers = existingUsers.filter((user: any) => user.email !== demoUser.email);
  
  // Remove demo assessments
  const filteredAssessments = existingAssessments.filter((assessment: any) => assessment.userId !== demoUser.id);
  
  // Remove used assessments for demo user
  if (existingUsedAssessments[demoUser.id]) {
    delete existingUsedAssessments[demoUser.id];
  }
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
  localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filteredAssessments));
  localStorage.setItem(STORAGE_KEYS.USED_ASSESSMENTS, JSON.stringify(existingUsedAssessments));
  
  // Check if the demo user is currently logged in and log them out
  const currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
  if (currentUser && currentUser.email === demoUser.email) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
  
  console.log('Demo credentials removed successfully!');
  
  return {
    message: 'Demo credentials removed successfully.',
    allowed: true
  };
};