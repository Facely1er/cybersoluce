# CyberSoluce™ Orchestration & Tasking Module
## REST API Documentation v1.0

---

## 🚀 **API Overview**

**Base URL:** `https://api.cybersoluce.com/v1/orchestration`  
**Authentication:** Bearer Token (JWT)  
**Content-Type:** `application/json`  
**Rate Limits:** 1000 requests/hour per organization

### **Authentication Example**
```bash
curl -H "Authorization: Bearer <your-jwt-token>" \
     -H "Content-Type: application/json" \
     https://api.cybersoluce.com/v1/orchestration/tasks
```

---

## 📝 **Task Assignment Engine APIs**

### **1. Create Task**
```http
POST /tasks
```

**Request Body:**
```json
{
  "title": "Implement MFA for privileged accounts",
  "description": "Configure multi-factor authentication for all administrative and privileged user accounts as required by NIST 800-171r3 AC-3.13",
  "task_type": "remediation",
  "framework": "NIST_800_171r3",
  "control_id": "AC-3.13",
  "priority": "high",
  "estimated_hours": 16,
  "due_date": "2025-09-15T17:00:00Z",
  "tags": ["mfa", "privileged_access", "authentication"],
  "custom_fields": {
    "business_unit": "IT Security",
    "budget_code": "CYBER-2025-Q3",
    "technical_complexity": "medium"
  },
  "dependencies": [
    {
      "task_id": "task-123",
      "type": "blocks"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "task-456",
  "title": "Implement MFA for privileged accounts",
  "description": "Configure multi-factor authentication for all administrative and privileged user accounts as required by NIST 800-171r3 AC-3.13",
  "task_type": "remediation",
  "framework": "NIST_800_171r3",
  "control_id": "AC-3.13",
  "priority": "high",
  "status": "draft",
  "estimated_hours": 16,
  "assigned_to": null,
  "assigned_by": null,
  "due_date": "2025-09-15T17:00:00Z",
  "created_at": "2025-08-13T10:30:00Z",
  "updated_at": "2025-08-13T10:30:00Z",
  "progress": 0,
  "tags": ["mfa", "privileged_access", "authentication"],
  "custom_fields": {
    "business_unit": "IT Security",
    "budget_code": "CYBER-2025-Q3",
    "technical_complexity": "medium"
  },
  "dependencies": [
    {
      "task_id": "task-123",
      "type": "blocks",
      "status": "active"
    }
  ],
  "assignable_users": []
}
```

### **2. Get Assignment Suggestions**
```http
POST /tasks/{task_id}/suggest-assignee
```

**Request Body:**
```json
{
  "consider_workload": true,
  "consider_skills": true,
  "consider_availability": true,
  "max_suggestions": 5,
  "filters": {
    "department": "IT Security",
    "skill_level": "intermediate"
  }
}
```

**Response (200 OK):**
```json
{
  "suggestions": [
    {
      "user_id": "user-789",
      "name": "Sarah Johnson",
      "email": "sarah.johnson@company.com",
      "score": 92,
      "reasoning": {
        "skill_match": 95,
        "workload_capacity": 85,
        "previous_performance": 98,
        "availability": 90
      },
      "current_workload": {
        "active_tasks": 3,
        "estimated_hours": 24,
        "capacity_utilization": 60
      },
      "relevant_skills": [
        "Multi-Factor Authentication",
        "Identity Management",
        "NIST 800-171",
        "Privileged Access Management"
      ],
      "recent_performance": {
        "completion_rate": 98,
        "avg_quality_score": 4.7,
        "on_time_delivery": 96
      }
    },
    {
      "user_id": "user-234",
      "name": "Michael Chen",
      "email": "michael.chen@company.com",
      "score": 87,
      "reasoning": {
        "skill_match": 88,
        "workload_capacity": 95,
        "previous_performance": 92,
        "availability": 75
      },
      "current_workload": {
        "active_tasks": 2,
        "estimated_hours": 16,
        "capacity_utilization": 40
      },
      "relevant_skills": [
        "Authentication Systems",
        "Security Architecture",
        "Compliance Implementation"
      ],
      "recent_performance": {
        "completion_rate": 94,
        "avg_quality_score": 4.5,
        "on_time_delivery": 89
      }
    }
  ],
  "assignment_recommendation": {
    "recommended_user": "user-789",
    "confidence": "high",
    "expected_completion": "2025-09-12T16:00:00Z"
  }
}
```

### **3. Assign Task**
```http
PUT /tasks/{task_id}/assign
```

**Request Body:**
```json
{
  "assigned_to": "user-789",
  "assignment_note": "Sarah has the most relevant MFA implementation experience and current capacity",
  "priority_override": null,
  "due_date_adjustment": null
}
```

**Response (200 OK):**
```json
{
  "id": "task-456",
  "status": "assigned",
  "assigned_to": "user-789",
  "assigned_by": "user-101",
  "assigned_at": "2025-08-13T11:15:00Z",
  "assignment_note": "Sarah has the most relevant MFA implementation experience and current capacity",
  "notifications_sent": [
    {
      "recipient": "user-789",
      "type": "task_assignment",
      "channels": ["email", "slack"],
      "sent_at": "2025-08-13T11:15:05Z"
    },
    {
      "recipient": "user-101",
      "type": "assignment_confirmation",
      "channels": ["email"],
      "sent_at": "2025-08-13T11:15:05Z"
    }
  ]
}
```

### **4. Bulk Task Creation**
```http
POST /tasks/bulk-create
```

**Request Body:**
```json
{
  "source": "assessment",
  "assessment_id": "assessment-789",
  "task_template": {
    "framework": "NIST_800_171r3",
    "default_priority": "medium",
    "due_date_offset_days": 30,
    "auto_assign": true,
    "business_unit": "IT Security"
  },
  "gaps": [
    {
      "control_id": "AC-2.1",
      "gap_description": "Account management procedures not documented",
      "remediation_type": "documentation",
      "estimated_effort": "low"
    },
    {
      "control_id": "SC-7.1", 
      "gap_description": "Network boundary protection needs enhancement",
      "remediation_type": "technical",
      "estimated_effort": "high"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "bulk_operation_id": "bulk-op-123",
  "tasks_created": 2,
  "tasks": [
    {
      "id": "task-567",
      "control_id": "AC-2.1",
      "title": "Document account management procedures",
      "status": "assigned",
      "assigned_to": "user-345",
      "estimated_hours": 8
    },
    {
      "id": "task-568", 
      "control_id": "SC-7.1",
      "title": "Enhance network boundary protection",
      "status": "assigned",
      "assigned_to": "user-678",
      "estimated_hours": 40
    }
  ],
  "summary": {
    "total_estimated_hours": 48,
    "auto_assigned": 2,
    "requires_manual_assignment": 0,
    "high_priority": 1,
    "medium_priority": 1,
    "low_priority": 0
  }
}
```

---

## 📅 **Timeline & Milestones APIs**

### **5. Create Project Timeline**
```http
POST /timelines
```

**Request Body:**
```json
{
  "name": "NIST 800-171r3 Implementation",
  "description": "Complete implementation of NIST 800-171r3 controls for DoD contract compliance",
  "framework": "NIST_800_171r3",
  "start_date": "2025-08-15T00:00:00Z",
  "target_completion": "2025-12-31T23:59:59Z",
  "milestones": [
    {
      "name": "Assessment Complete",
      "type": "framework",
      "target_date": "2025-09-01T17:00:00Z",
      "dependencies": ["assessment-789"]
    },
    {
      "name": "High Priority Controls Implemented", 
      "type": "business",
      "target_date": "2025-10-15T17:00:00Z",
      "success_criteria": "All high priority gaps closed"
    },
    {
      "name": "Executive Review",
      "type": "business", 
      "target_date": "2025-11-30T15:00:00Z",
      "attendees": ["ceo@company.com", "ciso@company.com"]
    }
  ],
  "resource_allocation": {
    "fte_security_engineers": 2.5,
    "fte_compliance_officers": 1.0,
    "budget_allocated": 150000
  }
}
```

**Response (201 Created):**
```json
{
  "id": "timeline-123",
  "name": "NIST 800-171r3 Implementation", 
  "description": "Complete implementation of NIST 800-171r3 controls for DoD contract compliance",
  "framework": "NIST_800_171r3",
  "status": "active",
  "start_date": "2025-08-15T00:00:00Z",
  "target_completion": "2025-12-31T23:59:59Z",
  "current_progress": 0,
  "health_score": 100,
  "milestones": [
    {
      "id": "milestone-101",
      "name": "Assessment Complete",
      "type": "framework",
      "target_date": "2025-09-01T17:00:00Z",
      "status": "pending",
      "progress": 15,
      "dependencies": ["assessment-789"]
    },
    {
      "id": "milestone-102", 
      "name": "High Priority Controls Implemented",
      "type": "business",
      "target_date": "2025-10-15T17:00:00Z",
      "status": "pending",
      "progress": 0,
      "success_criteria": "All high priority gaps closed"
    },
    {
      "id": "milestone-103",
      "name": "Executive Review",
      "type": "business",
      "target_date": "2025-11-30T15:00:00Z", 
      "status": "pending",
      "progress": 0,
      "attendees": ["ceo@company.com", "ciso@company.com"]
    }
  ],
  "critical_path": [
    "task-456",
    "task-567", 
    "task-568"
  ],
  "resource_allocation": {
    "fte_security_engineers": 2.5,
    "fte_compliance_officers": 1.0,
    "budget_allocated": 150000,
    "budget_spent": 0
  },
  "analytics": {
    "projected_completion": "2025-12-28T17:00:00Z",
    "risk_score": "low",
    "buffer_days": 3
  }
}
```

### **6. Get Timeline Analytics**
```http
GET /timelines/{timeline_id}/analytics
```

**Response (200 OK):**
```json
{
  "timeline_id": "timeline-123",
  "current_status": {
    "overall_progress": 25,
    "milestones_completed": 1,
    "milestones_total": 3,
    "tasks_completed": 5,
    "tasks_total": 20,
    "days_elapsed": 15,
    "days_remaining": 125
  },
  "performance_metrics": {
    "velocity": {
      "tasks_per_week": 2.3,
      "projected_completion": "2025-12-28T17:00:00Z",
      "on_schedule": true
    },
    "quality": {
      "rework_rate": 5,
      "first_time_success": 95,
      "stakeholder_satisfaction": 4.6
    },
    "resource_utilization": {
      "team_capacity": 85,
      "budget_utilization": 15,
      "efficiency_score": 92
    }
  },
  "risk_analysis": {
    "overall_risk": "low",
    "risk_factors": [
      {
        "factor": "Resource availability",
        "impact": "medium",
        "probability": "low",
        "mitigation": "Cross-train backup team members"
      }
    ],
    "critical_path_risks": [],
    "schedule_confidence": 88
  },
  "predictive_insights": {
    "likely_completion_range": {
      "earliest": "2025-12-20T17:00:00Z",
      "most_likely": "2025-12-28T17:00:00Z", 
      "latest": "2026-01-05T17:00:00Z"
    },
    "budget_forecast": {
      "projected_total": 147500,
      "confidence": 92
    },
    "recommended_actions": [
      "Consider accelerating SC-7.1 implementation",
      "Schedule additional resource review for Q4"
    ]
  }
}
```

---

## 🗄️ **Evidence Vault APIs**

### **7. Upload Evidence**
```http
POST /evidence
```

**Request Body (multipart/form-data):**
```
Content-Type: multipart/form-data

control_id: AC-3.13
framework: NIST_800_171r3
evidence_type: screenshot
title: MFA Configuration Screenshots
description: Screenshots showing successful MFA implementation for privileged accounts
validity_period: 365
tags: ["mfa", "privileged_access", "configuration"]
file: <binary_data>
```

**Response (201 Created):**
```json
{
  "id": "evidence-789",
  "control_id": "AC-3.13",
  "framework": "NIST_800_171r3",
  "evidence_type": "screenshot",
  "title": "MFA Configuration Screenshots",
  "description": "Screenshots showing successful MFA implementation for privileged accounts",
  "file_info": {
    "original_name": "mfa_config_screenshots.zip",
    "size_bytes": 2147483,
    "mime_type": "application/zip",
    "file_hash": "sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  },
  "collection_info": {
    "collected_by": "manual",
    "collector_id": "user-789",
    "collection_date": "2025-08-13T14:30:00Z"
  },
  "validity": {
    "validity_period": 365,
    "expires_at": "2026-08-13T14:30:00Z",
    "validation_status": "pending"
  },
  "retention_policy": "compliance_default_7_years",
  "tags": ["mfa", "privileged_access", "configuration"],
  "metadata": {
    "controls_addressed": ["AC-3.13"],
    "systems_involved": ["Active Directory", "RSA SecurID"],
    "business_unit": "IT Security"
  },
  "chain_of_custody": [
    {
      "action": "created",
      "user_id": "user-789",
      "timestamp": "2025-08-13T14:30:00Z",
      "ip_address": "192.168.1.100"
    }
  ]
}
```

### **8. Validate Evidence**
```http
POST /evidence/{evidence_id}/validate
```

**Request Body:**
```json
{
  "validation_type": "manual",
  "validator_notes": "Screenshots clearly show MFA enabled for all privileged accounts. Configuration appears compliant with NIST requirements.",
  "validation_criteria": [
    {
      "criterion": "MFA enabled for all privileged accounts",
      "status": "pass",
      "notes": "All 15 privileged accounts show MFA enabled"
    },
    {
      "criterion": "Strong authentication methods used",
      "status": "pass", 
      "notes": "RSA SecurID tokens and mobile app authenticators in use"
    }
  ],
  "compliance_score": 95,
  "recommendations": [
    "Consider implementing backup authentication methods",
    "Document MFA bypass procedures for emergency access"
  ]
}
```

**Response (200 OK):**
```json
{
  "validation_id": "validation-456",
  "evidence_id": "evidence-789",
  "validation_status": "approved",
  "validator_id": "user-234",
  "validation_date": "2025-08-13T15:45:00Z",
  "compliance_score": 95,
  "validation_summary": {
    "criteria_met": 2,
    "criteria_total": 2,
    "overall_assessment": "fully_compliant"
  },
  "recommendations": [
    "Consider implementing backup authentication methods",
    "Document MFA bypass procedures for emergency access"
  ],
  "next_validation_due": "2026-02-13T15:45:00Z",
  "audit_trail": {
    "evidence_updated_at": "2025-08-13T15:45:00Z",
    "validation_method": "manual_review",
    "supporting_documentation": []
  }
}
```

### **9. Search Evidence**
```http
GET /evidence/search
```

**Query Parameters:**
```
?framework=NIST_800_171r3
&control_id=AC-3.13
&evidence_type=screenshot
&validation_status=approved
&created_after=2025-08-01T00:00:00Z
&page=1
&limit=20
```

**Response (200 OK):**
```json
{
  "results": [
    {
      "id": "evidence-789",
      "control_id": "AC-3.13",
      "framework": "NIST_800_171r3",
      "title": "MFA Configuration Screenshots",
      "evidence_type": "screenshot",
      "validation_status": "approved",
      "compliance_score": 95,
      "collection_date": "2025-08-13T14:30:00Z",
      "expires_at": "2026-08-13T14:30:00Z",
      "file_info": {
        "size_bytes": 2147483,
        "mime_type": "application/zip"
      },
      "tags": ["mfa", "privileged_access", "configuration"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total_results": 1,
    "total_pages": 1
  },
  "search_metadata": {
    "query_time_ms": 45,
    "filters_applied": 5,
    "search_id": "search-123"
  }
}
```

---

## 🔔 **Notification & Reminder APIs**

### **10. Configure Notifications**
```http
POST /notifications/rules
```

**Request Body:**
```json
{
  "rule_name": "High Priority Task Reminders",
  "description": "Send reminders for high priority tasks approaching due dates",
  "trigger": {
    "event_type": "task_due_approaching",
    "conditions": {
      "priority": "high",
      "days_before_due": [7, 3, 1],
      "task_status": ["assigned", "in_progress"]
    }
  },
  "recipients": {
    "include_assignee": true,
    "include_manager": true,
    "include_stakeholders": false,
    "custom_recipients": []
  },
  "delivery_channels": [
    {
      "channel": "email",
      "priority": 1,
      "template": "task_reminder_email"
    },
    {
      "channel": "slack",
      "priority": 2,
      "template": "task_reminder_slack",
      "conditions": {
        "business_hours_only": true
      }
    }
  ],
  "escalation": {
    "enabled": true,
    "escalate_after_days": 1,
    "escalate_to": "manager",
    "escalation_channels": ["email", "sms"]
  },
  "active": true
}
```

**Response (201 Created):**
```json
{
  "rule_id": "notification-rule-123",
  "rule_name": "High Priority Task Reminders",
  "status": "active",
  "created_at": "2025-08-13T16:00:00Z",
  "created_by": "user-101",
  "next_evaluation": "2025-08-14T08:00:00Z",
  "estimated_notifications_per_month": 25,
  "effectiveness_metrics": {
    "enabled": true,
    "track_open_rates": true,
    "track_response_rates": true
  }
}
```

### **11. Send Immediate Notification**
```http
POST /notifications/send
```

**Request Body:**
```json
{
  "notification_type": "urgent_compliance_issue",
  "recipients": [
    {
      "user_id": "user-789",
      "channels": ["email", "sms", "slack"]
    },
    {
      "user_id": "user-234", 
      "channels": ["email"]
    }
  ],
  "message": {
    "subject": "URGENT: Critical compliance gap identified",
    "body": "A critical compliance gap has been identified in control SC-7.1 that requires immediate attention. Please review the attached assessment results and assign remediation tasks within 24 hours.",
    "priority": "critical",
    "context": {
      "assessment_id": "assessment-789",
      "control_id": "SC-7.1",
      "risk_level": "critical",
      "compliance_deadline": "2025-09-30T23:59:59Z"
    }
  },
  "attachments": [
    {
      "type": "assessment_report",
      "assessment_id": "assessment-789"
    }
  ],
  "tracking": {
    "require_acknowledgment": true,
    "escalate_if_no_response_hours": 4
  }
}
```

**Response (200 OK):**
```json
{
  "notification_id": "notification-456",
  "status": "sent",
  "sent_at": "2025-08-13T16:30:00Z",
  "delivery_summary": {
    "email": {
      "sent": 2,
      "delivered": 2,
      "failed": 0
    },
    "sms": {
      "sent": 1,
      "delivered": 1,
      "failed": 0
    },
    "slack": {
      "sent": 1,
      "delivered": 1,
      "failed": 0
    }
  },
  "tracking": {
    "acknowledgments_required": 2,
    "acknowledgments_received": 0,
    "escalation_scheduled": "2025-08-13T20:30:00Z"
  },
  "cost": {
    "email": 0.02,
    "sms": 0.05,
    "slack": 0.00,
    "total": 0.07
  }
}
```

---

## 📊 **Analytics & Reporting APIs**

### **12. Get Orchestration Analytics**
```http
GET /analytics/dashboard
```

**Query Parameters:**
```
?period=last_30_days
&organization_id=org-123
&framework=NIST_800_171r3
&include_predictions=true
```

**Response (200 OK):**
```json
{
  "analytics_period": {
    "start_date": "2025-07-14T00:00:00Z",
    "end_date": "2025-08-13T23:59:59Z",
    "period_type": "last_30_days"
  },
  "task_metrics": {
    "total_tasks": 85,
    "completed_tasks": 68,
    "in_progress_tasks": 12,
    "overdue_tasks": 5,
    "completion_rate": 80,
    "average_completion_time_hours": 18.5,
    "on_time_delivery_rate": 85
  },
  "timeline_metrics": {
    "active_timelines": 3,
    "milestones_hit": 8,
    "milestones_missed": 1,
    "average_schedule_variance": -2.3,
    "critical_path_delays": 0
  },
  "evidence_metrics": {
    "evidence_items_collected": 145,
    "automated_collection_rate": 62,
    "validation_success_rate": 94,
    "average_validation_time_hours": 4.2,
    "evidence_coverage_percentage": 87
  },
  "notification_metrics": {
    "notifications_sent": 234,
    "email_open_rate": 78,
    "response_rate": 65,
    "escalation_rate": 12,
    "user_satisfaction": 4.3
  },
  "team_performance": {
    "top_performers": [
      {
        "user_id": "user-789",
        "name": "Sarah Johnson",
        "tasks_completed": 12,
        "completion_rate": 100,
        "quality_score": 4.8
      }
    ],
    "workload_distribution": {
      "balanced": true,
      "utilization_variance": 0.15,
      "overloaded_users": 0
    }
  },
  "compliance_impact": {
    "controls_implemented": 23,
    "compliance_score_improvement": 15,
    "risk_reduction_percentage": 32,
    "audit_readiness": 87
  },
  "predictions": {
    "projected_completion_dates": {
      "timeline-123": "2025-12-28T17:00:00Z",
      "confidence": 88
    },
    "resource_needs": {
      "additional_fte_needed": 0.5,
      "budget_variance": -5000,
      "bottleneck_areas": ["network_security", "documentation"]
    },
    "risk_forecast": {
      "schedule_risk": "low",
      "resource_risk": "medium", 
      "compliance_risk": "low"
    }
  }
}
```

---

## 🔐 **Error Handling**

### **Standard Error Response Format**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid parameters",
    "details": [
      {
        "field": "due_date",
        "issue": "Due date cannot be in the past",
        "value": "2025-08-01T00:00:00Z"
      }
    ],
    "request_id": "req-789123",
    "timestamp": "2025-08-13T16:45:00Z",
    "support_url": "https://docs.cybersoluce.com/api/errors/VALIDATION_ERROR"
  }
}
```

### **Common Error Codes**
- **400 BAD_REQUEST**: Invalid request parameters
- **401 UNAUTHORIZED**: Invalid or missing authentication token
- **403 FORBIDDEN**: Insufficient permissions for the requested operation
- **404 NOT_FOUND**: Requested resource does not exist
- **409 CONFLICT**: Resource conflict (e.g., task already assigned)
- **422 VALIDATION_ERROR**: Request validation failed
- **429 RATE_LIMIT_EXCEEDED**: Too many requests
- **500 INTERNAL_ERROR**: Server error

---

## 🚀 **SDK Examples**

### **JavaScript/Node.js**
```javascript
const CyberSoluceAPI = require('@cybersoluce/orchestration-sdk');

const client = new CyberSoluceAPI({
  apiKey: process.env.CYBERSOLUCE_API_KEY,
  baseURL: 'https://api.cybersoluce.com/v1/orchestration'
});

// Create and assign a task
async function createAndAssignTask() {
  try {
    const task = await client.tasks.create({
      title: "Implement MFA for privileged accounts",
      framework: "NIST_800_171r3",
      control_id: "AC-3.13",
      priority: "high"
    });
    
    const suggestions = await client.tasks.getSuggestions(task.id);
    
    await client.tasks.assign(task.id, {
      assigned_to: suggestions.assignment_recommendation.recommended_user
    });
    
    console.log(`Task ${task.id} assigned successfully`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

### **Python**
```python
from cybersoluce import OrchestrationAPI

client = OrchestrationAPI(
    api_key=os.environ['CYBERSOLUCE_API_KEY'],
    base_url='https://api.cybersoluce.com/v1/orchestration'
)

# Upload and validate evidence
def upload_evidence(control_id, file_path):
    try:
        with open(file_path, 'rb') as file:
            evidence = client.evidence.upload(
                control_id=control_id,
                framework="NIST_800_171r3",
                evidence_type="screenshot",
                title="MFA Configuration Evidence",
                file=file
            )
        
        validation = client.evidence.validate(
            evidence_id=evidence.id,
            validation_type="manual",
            compliance_score=95
        )
        
        print(f"Evidence {evidence.id} uploaded and validated successfully")
        return evidence, validation
    
    except Exception as error:
        print(f"Error: {error}")
```

---

This API documentation provides comprehensive coverage of all Orchestration & Tasking module endpoints with detailed examples, enabling smooth integration with the CyberSoluce ecosystem and external systems.