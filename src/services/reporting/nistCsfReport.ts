import { useGovernanceStore } from "../../stores/governanceStore";

/**
 * Generate a board-ready HTML report for NIST CSF framework
 * @param options - Report generation options
 * @returns HTML string that can be downloaded or printed
 */
export function generateNistCsfBoardReport(options?: {
  includeEvidence?: boolean;
  includeMappings?: boolean;
}): string {
  const state = useGovernanceStore.getState();
  const framework = state.frameworks.find((f) => f.id === "nist-csf-2");
  
  if (!framework) {
    throw new Error("NIST CSF v2 framework not loaded");
  }

  const categories = state.categories.filter(
    (c) => c.frameworkId === "nist-csf-2"
  );
  const controls = state.controls.filter(
    (ctrl) => ctrl.frameworkId === "nist-csf-2"
  );
  const evidence = options?.includeEvidence 
    ? state.evidence.filter((e) => e.frameworkId === "nist-csf-2")
    : [];
  const mappings = options?.includeMappings 
    ? state.controlMappings.filter((m) => 
        m.sourceFrameworkId === "nist-csf-2" || m.targetFrameworkId === "nist-csf-2"
      )
    : [];

  // Calculate maturity statistics
  const maturityStats = {
    total: controls.length,
    implemented: controls.filter((c) => c.status === "implemented" || c.status === "verified").length,
    inProgress: controls.filter((c) => c.status === "in-progress").length,
    notStarted: controls.filter((c) => c.status === "not-started").length,
    avgMaturity: controls.length > 0
      ? Math.round(controls.reduce((sum, c) => sum + c.maturityLevel, 0) / controls.length * 10) / 10
      : 0,
  };

  // Evidence statistics by category
  const evidenceByCategory: Record<string, number> = {};
  categories.forEach((cat) => {
    const categoryControls = controls.filter((c) => c.categoryId === cat.id);
    const categoryEvidence = evidence.filter((e) =>
      categoryControls.some((c) => c.id === e.controlId)
    );
    evidenceByCategory[cat.name] = categoryEvidence.length;
  });

  // Mapping statistics
  const mappingStats = {
    total: mappings.length,
    strong: mappings.filter((m) => m.strength === "strong").length,
    partial: mappings.filter((m) => m.strength === "partial").length,
    related: mappings.filter((m) => m.strength === "related").length,
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CyberSoluce – NIST CSF Board Report</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 12px;
          line-height: 1.6;
          color: #111827;
          background: #ffffff;
          padding: 40px 20px;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          border-bottom: 3px solid #005B96;
          padding-bottom: 12px;
        }
        h2 {
          font-size: 20px;
          font-weight: 600;
          color: #1F2937;
          margin-top: 32px;
          margin-bottom: 16px;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 8px;
        }
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        p {
          margin-bottom: 12px;
          color: #4B5563;
        }
        .meta {
          color: #6B7280;
          font-size: 11px;
          margin-bottom: 24px;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 24px;
          font-size: 11px;
        }
        th, td {
          border: 1px solid #E5E7EB;
          padding: 8px 12px;
          text-align: left;
        }
        th {
          background: #F3F4F6;
          font-weight: 600;
          color: #111827;
        }
        tr:nth-child(even) {
          background: #F9FAFB;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }
        .stat-card {
          background: #F9FAFB;
          border: 1px solid #E5E7EB;
          border-radius: 6px;
          padding: 16px;
        }
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #005B96;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 11px;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          margin-right: 6px;
        }
        .badge-success {
          background: #D1FAE5;
          color: #065F46;
        }
        .badge-warning {
          background: #FEF3C7;
          color: #92400E;
        }
        .badge-danger {
          background: #FEE2E2;
          color: #991B1B;
        }
        .badge-info {
          background: #DBEAFE;
          color: #1E40AF;
        }
        .footer {
          margin-top: 48px;
          padding-top: 24px;
          border-top: 2px solid #E5E7EB;
          text-align: center;
          color: #6B7280;
          font-size: 10px;
        }
        @media print {
          body {
            padding: 20px;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>CyberSoluce – NIST CSF 2.0 Board Report</h1>
        <div class="meta">
          Generated on ${new Date().toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>

        <h2>Executive Summary</h2>
        <p>
          This report provides a comprehensive overview of your organization's cybersecurity posture 
          aligned with the NIST Cybersecurity Framework (CSF) v2.0. The framework consists of 
          ${categories.length} categories and ${controls.length} controls across the core functions 
          of Identify, Protect, Detect, Respond, and Recover.
        </p>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${maturityStats.total}</div>
            <div class="stat-label">Total Controls</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${maturityStats.implemented}</div>
            <div class="stat-label">Implemented</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${maturityStats.inProgress}</div>
            <div class="stat-label">In Progress</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${maturityStats.notStarted}</div>
            <div class="stat-label">Not Started</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${maturityStats.avgMaturity}/5</div>
            <div class="stat-label">Avg Maturity Level</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${Math.round((maturityStats.implemented / maturityStats.total) * 100)}%</div>
            <div class="stat-label">Implementation Rate</div>
          </div>
        </div>

        <h2>Framework Overview</h2>
        <p><strong>Framework:</strong> ${framework.name}</p>
        <p><strong>Version:</strong> ${framework.version}</p>
        <p><strong>Description:</strong> ${framework.description || "NIST Cybersecurity Framework v2.0"}</p>
        <p><strong>Status:</strong> <span class="badge badge-success">${framework.status}</span></p>

        <h2>Category Breakdown</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Controls</th>
              <th>Implemented</th>
              <th>In Progress</th>
              <th>Not Started</th>
              <th>Avg Maturity</th>
            </tr>
          </thead>
          <tbody>
            ${categories.map((cat) => {
              const categoryControls = controls.filter((c) => c.categoryId === cat.id);
              const implemented = categoryControls.filter((c) => c.status === "implemented" || c.status === "verified").length;
              const inProgress = categoryControls.filter((c) => c.status === "in-progress").length;
              const notStarted = categoryControls.filter((c) => c.status === "not-started").length;
              const avgMaturity = categoryControls.length > 0
                ? (categoryControls.reduce((sum, c) => sum + c.maturityLevel, 0) / categoryControls.length).toFixed(1)
                : "0.0";
              
              return `
                <tr>
                  <td><strong>${cat.name}</strong></td>
                  <td>${categoryControls.length}</td>
                  <td>${implemented}</td>
                  <td>${inProgress}</td>
                  <td>${notStarted}</td>
                  <td>${avgMaturity}/5</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>

        ${options?.includeEvidence ? `
          <h2>Evidence Summary</h2>
          <p>Total Evidence Items: <strong>${evidence.length}</strong></p>
          
          ${Object.keys(evidenceByCategory).length > 0 ? `
            <h3>Evidence by Category</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Evidence Items</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(evidenceByCategory).map(([cat, count]) => `
                  <tr>
                    <td>${cat}</td>
                    <td>${count}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          ` : ""}

          <h3>Evidence Types</h3>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              ${["policy", "procedure", "log", "screenshot", "ticket", "other"].map((type) => {
                const count = evidence.filter((e) => e.type === type).length;
                return count > 0 ? `
                  <tr>
                    <td>${type.charAt(0).toUpperCase() + type.slice(1)}</td>
                    <td>${count}</td>
                  </tr>
                ` : "";
              }).join("")}
            </tbody>
          </table>
        ` : ""}

        ${options?.includeMappings ? `
          <h2>Cross-Framework Mappings</h2>
          <p>Total Mappings: <strong>${mappingStats.total}</strong></p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">${mappingStats.strong}</div>
              <div class="stat-label">Strong Mappings</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${mappingStats.partial}</div>
              <div class="stat-label">Partial Mappings</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">${mappingStats.related}</div>
              <div class="stat-label">Related Mappings</div>
            </div>
          </div>

          ${mappings.length > 0 ? `
            <h3>Sample Mappings</h3>
            <table>
              <thead>
                <tr>
                  <th>Source Control</th>
                  <th>Target Control</th>
                  <th>Target Framework</th>
                  <th>Strength</th>
                </tr>
              </thead>
              <tbody>
                ${mappings.slice(0, 10).map((m) => `
                  <tr>
                    <td>${m.sourceControlId}</td>
                    <td>${m.targetControlId}</td>
                    <td>${m.targetFrameworkId}</td>
                    <td>
                      <span class="badge ${
                        m.strength === "strong" ? "badge-success" :
                        m.strength === "partial" ? "badge-warning" :
                        "badge-info"
                      }">${m.strength}</span>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
            ${mappings.length > 10 ? `<p><em>Showing 10 of ${mappings.length} mappings</em></p>` : ""}
          ` : ""}
        ` : ""}

        <h2>Recommendations</h2>
        <ul style="margin-left: 20px; margin-bottom: 24px;">
          ${maturityStats.notStarted > 0 ? `
            <li style="margin-bottom: 8px;">
              <strong>Priority:</strong> Address ${maturityStats.notStarted} controls that have not been started.
            </li>
          ` : ""}
          ${maturityStats.inProgress > 0 ? `
            <li style="margin-bottom: 8px;">
              <strong>Focus:</strong> Complete ${maturityStats.inProgress} controls currently in progress.
            </li>
          ` : ""}
          ${maturityStats.avgMaturity < 3 ? `
            <li style="margin-bottom: 8px;">
              <strong>Maturity:</strong> Improve overall maturity level (currently ${maturityStats.avgMaturity}/5).
            </li>
          ` : ""}
          ${options?.includeEvidence && evidence.length === 0 ? `
            <li style="margin-bottom: 8px;">
              <strong>Evidence:</strong> Begin collecting evidence for implemented controls to support audit readiness.
            </li>
          ` : ""}
          ${options?.includeMappings && mappingStats.total === 0 ? `
            <li style="margin-bottom: 8px;">
              <strong>Mappings:</strong> Establish cross-framework mappings to demonstrate compliance across multiple standards.
            </li>
          ` : ""}
        </ul>

        <div class="footer">
          <p>This report was generated by CyberSoluce Governance Platform</p>
          <p>For questions or support, please contact your cybersecurity governance team.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

