import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Plus,
  Settings,
  Mail,
  MessageSquare,
  Smartphone,
  Webhook,
  Clock,
  Users,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  X,
  Edit,
  Trash2,
  Eye,
  User
} from 'lucide-react';
import { NotificationRule } from '../types/orchestration';
import { orchestrationService } from '../services/orchestrationService';
import PageHeader from '../components/common/PageHeader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import EnhancedTable from '../components/tables/EnhancedTable';
import StatusBadge from '../components/ui/StatusBadge';
import { Modal } from '../components/ui/modal';
import { useNotify } from '../components/notifications/NotificationSystem';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

// Helper function to get channel icons - moved outside component to be accessible globally
const getChannelIcon = (channel: string) => {
  switch (channel) {
    case 'email': return Mail;
    case 'slack': return MessageSquare;
    case 'sms': return Smartphone;
    case 'webhook': return Webhook;
    default: return Bell;
  }
};

const NotificationCenter: React.FC = () => {
  const [rules, setRules] = useState<NotificationRule[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<NotificationRule | null>(null);
  const [activeTab, setActiveTab] = useState('rules');

  const notify = useNotify();

  const handleExportNotifications = () => {
    try {
      const exportData = notifications.map(notification => ({
        'Subject': notification.subject,
        'Recipient': notification.recipient,
        'Channel': notification.channel,
        'Status': notification.status,
        'Sent At': notification.sentAt.toLocaleString(),
        'Opened At': notification.openedAt?.toLocaleString() || 'Not opened',
        'Rule': notification.rule
      }));

      const headers = Object.keys(exportData[0] || {}).join(',');
      const rows = exportData.map(row => 
        Object.values(row).map(value => {
          const stringValue = value?.toString() || '';
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      );
      
      const csvContent = [headers, ...rows].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `notifications-export-${new Date().toISOString().split('T')[0]}.csv`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      notify.success('Notifications exported successfully');
    } catch (error) {
      console.error('Export failed:', error);
      notify.error('Export failed');
    }
  };

  useEffect(() => {
    loadNotificationData();
  }, []);

  const loadNotificationData = async () => {
    try {
      setLoading(true);
      
      // Mock notification rules for demonstration
      const mockRules: NotificationRule[] = [
        {
          id: 'rule-1',
          ruleName: 'High Priority Task Reminders',
          description: 'Send reminders for high priority tasks approaching due dates',
          trigger: {
            eventType: 'task_due_approaching',
            conditions: {
              priority: 'high',
              daysBefore: [7, 3, 1],
              taskStatus: ['assigned', 'in_progress']
            }
          },
          recipients: {
            includeAssignee: true,
            includeManager: true,
            includeStakeholders: false,
            customRecipients: []
          },
          deliveryChannels: [
            {
              channel: 'email',
              priority: 1,
              template: 'task_reminder_email',
              conditions: {}
            },
            {
              channel: 'slack',
              priority: 2,
              template: 'task_reminder_slack',
              conditions: { businessHoursOnly: true }
            }
          ],
          escalation: {
            enabled: true,
            escalateAfterDays: 1,
            escalateTo: 'manager',
            escalationChannels: ['email', 'sms']
          },
          active: true,
          createdAt: new Date('2024-02-01'),
          createdBy: 'user-admin'
        },
        {
          id: 'rule-2',
          ruleName: 'Evidence Expiration Alerts',
          description: 'Alert when compliance evidence is about to expire',
          trigger: {
            eventType: 'evidence_expiring',
            conditions: {
              daysBefore: [30, 14, 7],
              validationStatus: 'valid'
            }
          },
          recipients: {
            includeAssignee: false,
            includeManager: true,
            includeStakeholders: true,
            customRecipients: ['compliance@company.com']
          },
          deliveryChannels: [
            {
              channel: 'email',
              priority: 1,
              template: 'evidence_expiring_email',
              conditions: {}
            }
          ],
          active: true,
          createdAt: new Date('2024-02-05'),
          createdBy: 'user-compliance'
        },
        {
          id: 'rule-3',
          ruleName: 'Critical Compliance Gaps',
          description: 'Immediate notifications for critical compliance issues',
          trigger: {
            eventType: 'compliance_gap',
            conditions: {
              severity: 'critical',
              immediate: true
            }
          },
          recipients: {
            includeAssignee: true,
            includeManager: true,
            includeStakeholders: true,
            customRecipients: ['ciso@company.com', 'legal@company.com']
          },
          deliveryChannels: [
            {
              channel: 'email',
              priority: 1,
              template: 'critical_gap_email',
              conditions: {}
            },
            {
              channel: 'sms',
              priority: 2,
              template: 'critical_gap_sms',
              conditions: {}
            },
            {
              channel: 'slack',
              priority: 3,
              template: 'critical_gap_slack',
              conditions: {}
            }
          ],
          escalation: {
            enabled: true,
            escalateAfterDays: 0,
            escalateTo: 'custom',
            escalationChannels: ['sms', 'webhook']
          },
          active: true,
          createdAt: new Date('2024-01-15'),
          createdBy: 'user-admin'
        }
      ];

      // Mock recent notifications
      const mockNotifications = [
        {
          id: 'notif-1',
          type: 'task_reminder',
          subject: 'Task Due Tomorrow: Implement MFA for privileged accounts',
          recipient: 'sarah.johnson@company.com',
          channel: 'email',
          status: 'delivered',
          sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          openedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
          rule: 'High Priority Task Reminders'
        },
        {
          id: 'notif-2',
          type: 'evidence_expiring',
          subject: 'Evidence Expiring: Firewall Configuration',
          recipient: 'compliance@company.com',
          channel: 'email',
          status: 'delivered',
          sentAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          rule: 'Evidence Expiration Alerts'
        },
        {
          id: 'notif-3',
          type: 'milestone_approaching',
          subject: 'Milestone Due: High Priority Controls Implementation',
          recipient: 'project-team',
          channel: 'slack',
          status: 'delivered',
          sentAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          rule: 'Project Milestone Alerts'
        }
      ];

      setRules(mockRules);
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Failed to load notification data:', error);
      notify.error('Failed to load notification data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRule = async (ruleData: Partial<NotificationRule>) => {
    try {
      const newRule = await orchestrationService.createNotificationRule(ruleData);
      setRules(prev => [newRule, ...prev]);
      setRuleModalOpen(false);
      notify.success('Notification rule created successfully');
    } catch (error) {
      console.error('Failed to create notification rule:', error);
      notify.error('Failed to create notification rule');
    }
  };

  const handleToggleRule = async (ruleId: string, active: boolean) => {
    try {
      // Update rule status
      setRules(prev => prev.map(rule => 
        rule.id === ruleId ? { ...rule, active } : rule
      ));
      notify.success(`Rule ${active ? 'activated' : 'deactivated'}`);
    } catch (error) {
      console.error('Failed to toggle rule:', error);
      notify.error('Failed to update rule');
    }
  };

  const getNotificationStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'failed': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const ruleColumns = [
    {
      key: 'ruleName' as keyof NotificationRule,
      header: 'Rule Name',
      sortable: true,
      render: (value: string, rule: NotificationRule) => (
        <div>
          <div className="flex items-center">
            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-medium text-gray-900 dark:text-white">{rule.ruleName}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {rule.description}
          </p>
        </div>
      )
    },
    {
      key: 'trigger' as keyof NotificationRule,
      header: 'Trigger',
      render: (trigger: any) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {trigger.eventType.replace('_', ' ')}
        </span>
      )
    },
    {
      key: 'deliveryChannels' as keyof NotificationRule,
      header: 'Channels',
      render: (channels: any[]) => (
        <div className="flex items-center space-x-1">
          {channels.slice(0, 3).map((channel, index) => {
            const Icon = getChannelIcon(channel.channel);
            return (
              <div key={index} className="bg-gray-100 dark:bg-gray-700 p-1 rounded">
                <Icon className="h-3 w-3 text-gray-600 dark:text-gray-400" />
              </div>
            );
          })}
          {channels.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{channels.length - 3}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'active' as keyof NotificationRule,
      header: 'Status',
      render: (active: boolean, rule: NotificationRule) => (
        <div className="flex items-center">
          <button
            onClick={() => handleToggleRule(rule.id, !active)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              active ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                active ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            {active ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    }
  ];

  const notificationColumns = [
    {
      key: 'subject' as keyof any,
      header: 'Notification',
      render: (value: string, notification: any) => {
        const Icon = getChannelIcon(notification.channel);
        return (
          <div className="flex items-start space-x-3">
            <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {notification.subject}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                via {notification.channel} • {notification.rule}
              </p>
            </div>
          </div>
        );
      }
    },
    {
      key: 'recipient' as keyof any,
      header: 'Recipient',
      render: (value: string) => (
        <div className="flex items-center">
          <User className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900 dark:text-white">{value}</span>
        </div>
      )
    },
    {
      key: 'status' as keyof any,
      header: 'Status',
      render: (value: string) => (
        <StatusBadge status={value} size="sm" />
      )
    },
    {
      key: 'sentAt' as keyof any,
      header: 'Sent',
      formatter: 'date' as const,
      render: (value: Date) => (
        <div className="text-sm">
          <div className="text-gray-900 dark:text-white">
            {value.toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {value.toLocaleTimeString()}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <PageHeader
        title="Notification Center"
        subtitle="Manage automated notifications and communication rules"
        icon={Bell}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={handleExportNotifications}>
              <Settings className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setRuleModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
          </div>
        }
      />

      {/* Notification Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Rules',
            value: rules.filter(r => r.active).length,
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Notifications Sent',
            value: notifications.length,
            icon: Mail,
            color: 'blue'
          },
          {
            title: 'Delivery Rate',
            value: '98.5%',
            icon: CheckCircle,
            color: 'green'
          },
          {
            title: 'Pending Actions',
            value: notifications.filter(n => n.status === 'pending').length,
            icon: Clock,
            color: 'orange'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                stat.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30' :
                'bg-red-100 dark:bg-red-900/30'
              }`}>
                <stat.icon className={`h-8 w-8 ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-400' :
                  stat.color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
                  'text-red-600 dark:text-red-400'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <TabsList>
              <TabsTrigger value="rules">Notification Rules</TabsTrigger>
              <TabsTrigger value="history">Notification History</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="rules">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Rules
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {rules.filter(r => r.active).length} of {rules.length} rules active
                  </div>
                </div>

                <EnhancedTable
                  data={rules}
                  columns={ruleColumns}
                  loading={loading}
                  searchable
                  pagination
                  pageSize={10}
                  onRowClick={(rule) => {
                    setSelectedRule(rule);
                    setRuleModalOpen(true);
                  }}
                  emptyState={{
                    title: 'No notification rules',
                    description: 'Create your first notification rule to automate communications',
                    action: {
                      label: 'Create Rule',
                      onClick: () => setRuleModalOpen(true)
                    }
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Notifications
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Search notifications..."
                      className="w-64"
                    />
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <EnhancedTable
                  data={notifications}
                  columns={notificationColumns}
                  loading={loading}
                  pagination
                  pageSize={15}
                  emptyState={{
                    title: 'No notifications sent',
                    description: 'Notification history will appear here once rules are triggered'
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="templates">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notification Templates
                  </h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Template
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Task Reminder Email',
                      type: 'email',
                      description: 'Standard task reminder with due date and priority',
                      usage: 45
                    },
                    {
                      name: 'Critical Alert SMS',
                      type: 'sms',
                      description: 'Urgent notification for critical issues',
                      usage: 12
                    },
                    {
                      name: 'Milestone Slack',
                      type: 'slack',
                      description: 'Project milestone notifications for teams',
                      usage: 23
                    }
                  ].map((template, index) => {
                    const Icon = getChannelIcon(template.type);
                    return (
                      <motion.div
                        key={template.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {template.usage} uses
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          {template.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {template.description}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                            template.type === 'email' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            template.type === 'sms' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                          }`}>
                            {template.type}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Create/Edit Rule Modal */}
      <Modal
        isOpen={ruleModalOpen}
        onClose={() => {
          setRuleModalOpen(false);
          setSelectedRule(null);
        }}
        title={selectedRule ? 'Edit Notification Rule' : 'Create Notification Rule'}
        size="lg"
      >
        <NotificationRuleForm
          rule={selectedRule}
          onSubmit={handleCreateRule}
          onCancel={() => {
            setRuleModalOpen(false);
            setSelectedRule(null);
          }}
        />
      </Modal>
    </div>
  );
};

// Notification Rule Form Component
const NotificationRuleForm: React.FC<{
  rule?: NotificationRule | null;
  onSubmit: (ruleData: any) => void;
  onCancel: () => void;
}> = ({ rule, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    ruleName: rule?.ruleName || '',
    description: rule?.description || '',
    eventType: 'task_due_approaching',
    conditions: {
      priority: 'high',
      daysBefore: '7,3,1'
    },
    includeAssignee: true,
    includeManager: false,
    channels: ['email']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ruleData = {
      ruleName: formData.ruleName,
      description: formData.description,
      trigger: {
        eventType: formData.eventType,
        conditions: {
          ...formData.conditions,
          daysBefore: formData.conditions.daysBefore.split(',').map(d => parseInt(d.trim()))
        }
      },
      recipients: {
        includeAssignee: formData.includeAssignee,
        includeManager: formData.includeManager,
        includeStakeholders: false,
        customRecipients: []
      },
      deliveryChannels: formData.channels.map((channel, index) => ({
        channel,
        priority: index + 1,
        template: `${formData.eventType}_${channel}`,
        conditions: {}
      })),
      active: true
    };

    onSubmit(ruleData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Rule Name"
          value={formData.ruleName}
          onChange={(e) => setFormData({...formData, ruleName: e.target.value})}
          placeholder="e.g., High Priority Task Reminders"
          required
        />
        
        <Select
          label="Event Type"
          value={formData.eventType}
          onChange={(e) => setFormData({...formData, eventType: e.target.value})}
          options={[
            { value: 'task_due_approaching', label: 'Task Due Approaching' },
            { value: 'milestone_approaching', label: 'Milestone Approaching' },
            { value: 'evidence_expiring', label: 'Evidence Expiring' },
            { value: 'compliance_gap', label: 'Compliance Gap' }
          ]}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Describe when this rule should trigger notifications"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Recipients
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.includeAssignee}
              onChange={(e) => setFormData({...formData, includeAssignee: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include task assignee</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.includeManager}
              onChange={(e) => setFormData({...formData, includeManager: e.target.checked})}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Include manager</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Delivery Channels
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {['email', 'slack', 'sms', 'webhook'].map(channel => {
            const Icon = getChannelIcon(channel);
            return (
              <label key={channel} className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="checkbox"
                  checked={formData.channels.includes(channel)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({...formData, channels: [...formData.channels, channel]});
                    } else {
                      setFormData({...formData, channels: formData.channels.filter(c => c !== channel)});
                    }
                  }}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300"
                />
                <Icon className="h-4 w-4 mx-2 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{channel}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {rule ? 'Update Rule' : 'Create Rule'}
        </Button>
      </div>
    </form>
  );
};

export default NotificationCenter;