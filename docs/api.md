# API Documentation

CyberSoluce™ provides comprehensive REST APIs for integration, automation, and extending platform capabilities.

## Overview

**Base URL**: `https://api.cybersoluce.com/v1`  
**Authentication**: Bearer Token (JWT)  
**Content Type**: `application/json`  
**Rate Limits**: 1000 requests/hour per organization

### Authentication

All API requests require authentication using a Bearer token:

```bash
curl -H "Authorization: Bearer YOUR_API_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.cybersoluce.com/v1/assessments
```

Get your API token from **Settings > API Keys** in the platform.

## Assessment API

### List Assessments

Retrieve all assessments for your organization.

```http
GET /assessments
```

**Query Parameters**:
- `status` (optional): Filter by status (`draft`, `in_progress`, `completed`)
- `domain` (optional): Filter by security domain
- `framework` (optional): Filter by framework
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "assessments": [
    {
      "id": "assessment_123",
      "name": "Q3 2024 Ransomware Assessment",
      "domain": "ransomware",
      "frameworks": ["nist-csf-2", "iso-27001"],
      "status": "completed",
      "score": 3.5,
      "completion_date": "2024-08-15T10:30:00Z",
      "created_at": "2024-08-01T09:00:00Z"
    }
  ],
  "total": 1,
  "has_more": false
}
```

### Create Assessment

Start a new security assessment.

```http
POST /assessments
```

**Request Body**:
```json
{
  "name": "Q4 2024 Supply Chain Review",
  "domain": "supply_chain",
  "frameworks": ["nist-sp-800-161", "iso-28000"],
  "regions": ["na", "eu"],
  "scope": {
    "systems": ["production", "staging"],
    "locations": ["headquarters", "remote_offices"]
  }
}
```

**Response**:
```json
{
  "id": "assessment_124",
  "name": "Q4 2024 Supply Chain Review",
  "domain": "supply_chain",
  "status": "draft",
  "assessment_url": "https://app.cybersoluce.com/assessment/assessment_124",
  "created_at": "2024-08-15T14:30:00Z"
}
```

### Submit Assessment Response

Submit answers for a specific assessment section.

```http
POST /assessments/{assessment_id}/responses
```

**Request Body**:
```json
{
  "section_id": "access_control",
  "responses": {
    "ac_001": {
      "answer": "implemented",
      "evidence": ["document_123", "screenshot_456"],
      "notes": "MFA implemented across all systems"
    },
    "ac_002": {
      "answer": "partial",
      "evidence": [],
      "notes": "PAM solution planned for Q4"
    }
  }
}
```

## Framework API

### List Supported Frameworks

Get all supported security frameworks and their details.

```http
GET /frameworks
```

**Response**:
```json
{
  "frameworks": [
    {
      "id": "nist-csf-2",
      "name": "NIST Cybersecurity Framework 2.0",
      "version": "2.0",
      "categories": 6,
      "controls": 108,
      "regions": ["global"],
      "last_updated": "2024-02-26"
    }
  ]
}
```

### Get Framework Details

Retrieve detailed information about a specific framework.

```http
GET /frameworks/{framework_id}
```

**Response**:
```json
{
  "id": "nist-csf-2",
  "name": "NIST Cybersecurity Framework 2.0",
  "description": "Comprehensive cybersecurity framework with new Govern function",
  "categories": [
    {
      "id": "govern",
      "name": "Govern (GV)",
      "description": "Develop and implement organizational cybersecurity strategy",
      "controls": [
        {
          "id": "gv-01",
          "title": "Organizational Context",
          "description": "The organization's mission, stakeholder expectations, and legal requirements",
          "guidance": "Document organizational context and requirements"
        }
      ]
    }
  ]
}
```

## Intelligence API

### Get Intelligence Insights

Retrieve AI-powered insights from the Intelligence Engine™.

```http
GET /intelligence/insights
```

**Query Parameters**:
- `type` (optional): Filter by insight type (`predictive`, `correlation`, `recommendation`)
- `source` (optional): Filter by data source
- `acknowledged` (optional): Filter by acknowledgment status
- `since` (optional): ISO 8601 timestamp for recent insights

**Response**:
```json
{
  "insights": [
    {
      "id": "insight_789",
      "type": "predictive",
      "title": "Elevated Ransomware Risk Detected",
      "description": "Analysis indicates 23% increase in ransomware targeting your industry",
      "confidence": 87,
      "impact": "high",
      "source": "threat_intel",
      "actionable": true,
      "recommendations": [
        "Review backup procedures",
        "Enhance email filtering",
        "Conduct tabletop exercise"
      ],
      "created_at": "2024-08-15T11:45:00Z"
    }
  ]
}
```

### Generate Cross-Product Analysis

Trigger comprehensive analysis across ERMITS ecosystem.

```http
POST /intelligence/analyze
```

**Request Body**:
```json
{
  "analysis_type": "comprehensive",
  "include_predictions": true,
  "timeframe": "90_days",
  "focus_areas": ["risk_correlation", "budget_optimization", "maturity_acceleration"]
}
```

## Governance API

### List Tasks

Retrieve governance tasks and assignments.

```http
GET /governance/tasks
```

**Query Parameters**:
- `status` (optional): Filter by task status
- `assigned_to` (optional): Filter by assignee
- `priority` (optional): Filter by priority level
- `framework` (optional): Filter by framework

**Response**:
```json
{
  "tasks": [
    {
      "id": "task_456",
      "title": "Implement MFA for Privileged Accounts",
      "description": "Deploy multi-factor authentication",
      "priority": "high",
      "status": "in_progress",
      "assigned_to": "user_789",
      "due_date": "2024-09-15T17:00:00Z",
      "framework": "nist-800-171",
      "control_id": "AC-3.13",
      "progress": 65
    }
  ]
}
```

### Create Bulk Tasks

Generate multiple tasks from assessment gaps.

```http
POST /governance/tasks/bulk
```

**Request Body**:
```json
{
  "source": "assessment",
  "assessment_id": "assessment_123",
  "task_template": {
    "framework": "nist-800-171",
    "default_priority": "medium",
    "due_date_offset_days": 30,
    "auto_assign": true
  },
  "gaps": [
    {
      "control_id": "AC-2.1",
      "gap_description": "Account management procedures not documented",
      "remediation_type": "documentation",
      "estimated_effort": "low"
    }
  ]
}
```

## Reporting API

### Generate Executive Report

Create comprehensive executive reports.

```http
POST /reports/executive
```

**Request Body**:
```json
{
  "template": "quarterly_board_report",
  "frameworks": ["nist-csf-2", "iso-27001"],
  "date_range": {
    "start": "2024-07-01",
    "end": "2024-09-30"
  },
  "sections": [
    "executive_summary",
    "risk_metrics",
    "compliance_status",
    "budget_utilization",
    "recommendations"
  ]
}
```

**Response**:
```json
{
  "report_id": "report_789",
  "status": "generating",
  "estimated_completion": "2024-08-15T15:30:00Z",
  "download_url": null
}
```

### Check Report Status

Monitor report generation progress.

```http
GET /reports/{report_id}/status
```

**Response**:
```json
{
  "report_id": "report_789",
  "status": "completed",
  "progress": 100,
  "download_url": "https://api.cybersoluce.com/v1/reports/report_789/download",
  "expires_at": "2024-08-22T15:30:00Z"
}
```

## Evidence API

### Upload Evidence

Submit compliance evidence for specific controls.

```http
POST /evidence
```

**Request Body** (multipart/form-data):
```
control_id: AC-3.13
framework: nist-800-171
evidence_type: screenshot
title: MFA Configuration Screenshots
description: Screenshots showing MFA implementation
file: [binary data]
```

**Response**:
```json
{
  "id": "evidence_123",
  "control_id": "AC-3.13",
  "framework": "nist-800-171",
  "title": "MFA Configuration Screenshots",
  "status": "pending_validation",
  "uploaded_at": "2024-08-15T12:00:00Z"
}
```

## Webhooks

### Configure Webhooks

Set up automatic notifications for events.

```http
POST /webhooks
```

**Request Body**:
```json
{
  "url": "https://your-app.com/webhook/cybersoluce",
  "events": [
    "assessment.completed",
    "task.overdue", 
    "insight.critical"
  ],
  "secret": "your_webhook_secret"
}
```

### Webhook Events

Supported event types:

- `assessment.started`: New assessment created
- `assessment.completed`: Assessment finished
- `task.assigned`: Task assigned to team member
- `task.overdue`: Task past due date
- `insight.critical`: Critical intelligence insight
- `compliance.gap`: New compliance gap identified

**Webhook Payload Example**:
```json
{
  "event": "assessment.completed",
  "timestamp": "2024-08-15T14:30:00Z",
  "data": {
    "assessment_id": "assessment_123",
    "domain": "ransomware",
    "score": 3.5,
    "compliance_rate": 78
  },
  "signature": "sha256=..."
}
```

## SDK and Libraries

### JavaScript/Node.js

```bash
npm install @cybersoluce/api-client
```

```javascript
const CyberSoluce = require('@cybersoluce/api-client');

const client = new CyberSoluce({
  apiToken: process.env.CYBERSOLUCE_API_TOKEN,
  baseURL: 'https://api.cybersoluce.com/v1'
});

// List assessments
const assessments = await client.assessments.list();

// Create new assessment
const assessment = await client.assessments.create({
  name: 'Q4 Security Review',
  domain: 'ransomware',
  frameworks: ['nist-csf-2']
});
```

### Python

```bash
pip install cybersoluce-client
```

```python
from cybersoluce import CyberSoluceClient

client = CyberSoluceClient(
    api_token=os.environ['CYBERSOLUCE_API_TOKEN'],
    base_url='https://api.cybersoluce.com/v1'
)

# Generate intelligence insights
insights = client.intelligence.get_insights(
    type='predictive',
    acknowledged=False
)

# Create bulk tasks
tasks = client.governance.create_bulk_tasks(
    assessment_id='assessment_123',
    auto_assign=True
)
```

## Error Handling

### Standard Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid parameters",
    "details": [
      {
        "field": "frameworks",
        "issue": "At least one framework must be selected"
      }
    ],
    "request_id": "req_123456",
    "timestamp": "2024-08-15T10:30:00Z"
  }
}
```

### Common Error Codes

- `400` - Bad Request: Invalid request parameters
- `401` - Unauthorized: Invalid or missing API token
- `403` - Forbidden: Insufficient permissions
- `404` - Not Found: Resource doesn't exist
- `422` - Validation Error: Request validation failed
- `429` - Rate Limit Exceeded: Too many requests
- `500` - Internal Error: Server error

## Rate Limiting

API requests are limited to ensure service availability:

- **Standard Plan**: 500 requests/hour
- **Professional Plan**: 1,000 requests/hour  
- **Enterprise Plan**: 5,000 requests/hour

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests per hour
- `X-RateLimit-Remaining`: Remaining requests
- `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Best Practices

### Optimization

1. **Batch Requests**: Use bulk endpoints when possible
2. **Caching**: Cache frequently accessed data
3. **Pagination**: Use pagination for large datasets
4. **Filtering**: Apply filters to reduce response size

### Security

1. **Token Security**: Store API tokens securely
2. **HTTPS Only**: Always use HTTPS for API calls
3. **Input Validation**: Validate all input data
4. **Error Handling**: Handle errors gracefully

### Integration Patterns

1. **Polling vs Webhooks**: Use webhooks for real-time updates
2. **Idempotency**: Handle duplicate requests safely
3. **Retry Logic**: Implement exponential backoff
4. **Monitoring**: Track API usage and performance

## Support

For API support and questions:

- **Documentation**: [docs.cybersoluce.com](https://docs.cybersoluce.com)
- **Developer Portal**: [developers.cybersoluce.com](https://developers.cybersoluce.com)
- **Support Email**: api-support@ermits.com
- **Status Page**: [status.cybersoluce.com](https://status.cybersoluce.com)

## Changelog

### v1.2.0 (Latest)
- Added Intelligence Engine™ APIs
- Enhanced bulk task creation
- Improved error responses
- Added webhook support

### v1.1.0
- Added evidence upload APIs
- Framework mapping endpoints
- Regional adaptation parameters
- Performance improvements

### v1.0.0
- Initial API release
- Core assessment functionality
- Basic reporting capabilities
- Authentication system