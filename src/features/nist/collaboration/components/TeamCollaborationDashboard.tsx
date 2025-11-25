import React, { useState } from 'react';
import { 
  Users, UserPlus
} from 'lucide-react';
import { Breadcrumbs } from '../../../../shared/components/layout';
import { TeamMember } from '../types';

interface TeamCollaborationDashboardProps {
  onBack: () => void;
  addNotification: (type: 'success' | 'error' | 'warning' | 'info', message: string) => void;
}

export const TeamCollaborationDashboard: React.FC<TeamCollaborationDashboardProps> = ({
  onBack: _onBack,
  addNotification
}) => {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteFormData, setInviteFormData] = useState({
    email: '',
    name: '',
    role: 'member',
    department: '',
    nistFunctions: [] as string[]
  });

  // Mock team members data
  const teamMembers: TeamMember[] = [
    {
      id: 'tm-001',
      userId: 'user-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: {
        id: 'ciso',
        name: 'Chief Information Security Officer',
        description: 'Strategic cybersecurity leadership and governance oversight',
        nistFunctionMapping: [
          { function: 'Govern', categories: ['Organizational Context', 'Risk Management'], subcategories: ['GV.OC-01', 'GV.RM-01'], responsibility: 'owner', priority: 'primary' }
        ],
        defaultPermissions: [],
        requiredCertifications: ['CISSP', 'CISM'],
        requiredExperience: '10+ years cybersecurity leadership',
        canAssignTasks: true,
        canReviewAssessments: true,
        canApproveReports: true,
        canManageTeam: true,
        workflowStage: ['approval', 'oversight']
      },
      department: 'Information Security',
      expertiseAreas: [
        { domain: 'governance', level: 'expert', frameworks: ['NIST CSF', 'ISO 27001'], certifications: ['CISSP', 'CISM'] }
      ],
      nistFunctionResponsibilities: ['Govern', 'Protect'],
      assignedControls: ['gv.oc-01', 'gv.rm-01', 'pr.aa-01'],
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date(),
      permissions: [],
      status: 'active',
      certifications: ['CISSP', 'CISM', 'CRISC'],
      workload: 85,
      timezone: 'America/New_York'
    },
    {
      id: 'tm-002',
      userId: 'user-002',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: {
        id: 'security-analyst',
        name: 'Security Analyst',
        description: 'Technical security analysis and implementation',
        nistFunctionMapping: [
          { function: 'Identify', categories: ['Asset Management'], subcategories: ['ID.AM-01'], responsibility: 'owner', priority: 'primary' }
        ],
        defaultPermissions: [],
        requiredCertifications: ['Security+', 'GSEC'],
        requiredExperience: '3+ years security analysis',
        canAssignTasks: false,
        canReviewAssessments: true,
        canApproveReports: false,
        canManageTeam: false,
        workflowStage: ['implementation', 'testing']
      },
      department: 'Information Security',
      expertiseAreas: [
        { domain: 'technical-controls', level: 'expert', frameworks: ['NIST CSF'], certifications: ['GSEC'] }
      ],
      nistFunctionResponsibilities: ['Identify', 'Detect'],
      assignedControls: ['id.am-01', 'de.cm-01'],
      joinedAt: new Date('2023-03-01'),
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
      permissions: [],
      status: 'active',
      certifications: ['Security+', 'GSEC'],
      workload: 78,
      timezone: 'America/Los_Angeles'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'inactive': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';
    }
  };

  const handleInviteTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inviteFormData.email.trim() || !inviteFormData.name.trim()) {
      addNotification('error', 'Email and name are required');
      return;
    }

    addNotification('success', `Invitation sent to ${inviteFormData.email}`);
    setShowInviteModal(false);
    
    setInviteFormData({
      email: '',
      name: '',
      role: 'member',
      department: '',
      nistFunctions: []
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs 
          items={[
            { label: 'Team Collaboration', isActive: true }
          ]} 
        />
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Team Collaboration Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Coordinate NIST CSF v2.0 implementation across your team
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setShowInviteModal(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {member.role.name} • {member.department}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {member.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {member.workload}%
                </span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  NIST Functions
                </h4>
                <div className="flex flex-wrap gap-1">
                  {member.nistFunctionResponsibilities.map((func, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded"
                    >
                      {func}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Expertise
                </h4>
                <div className="space-y-1">
                  {member.expertiseAreas.map((expertise, index) => (
                    <div key={index} className="text-sm text-gray-700 dark:text-gray-300">
                      {expertise.domain.replace('-', ' ')} ({expertise.level})
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Certifications
                </h4>
                <div className="flex flex-wrap gap-1">
                  {member.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Invite Team Member
            </h3>
            
            <form onSubmit={handleInviteTeamMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={inviteFormData.email}
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={inviteFormData.name}
                  onChange={(e) => setInviteFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};