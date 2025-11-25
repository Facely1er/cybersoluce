import React, { useState, useEffect } from "react";
import { useGovernanceStore } from "../../stores/governanceStore";
import { useAuth } from "../../context/AuthContext";
import { FileText } from "lucide-react";
import { saveEvidenceToSupabase, loadEvidenceFromSupabase, deleteEvidenceFromSupabase } from "../../services/evidenceService";
import { ENV } from "../../config/env";
import { logError } from "../../lib/logger";

interface ControlEvidencePanelProps {
  controlId: string;
  frameworkId: string;
}

const ControlEvidencePanel: React.FC<ControlEvidencePanelProps> = ({
  controlId,
  frameworkId,
}) => {
  const { evidence, addEvidence, removeEvidence } = useGovernanceStore();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"policy" | "procedure" | "log" | "screenshot" | "ticket" | "other">("other");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const controlEvidence = evidence.filter(
    (e) => e.controlId === controlId && e.frameworkId === frameworkId
  );

  // Load evidence from Supabase on mount
  useEffect(() => {
    if (ENV.backendMode === "supabase" && controlId && frameworkId) {
      setIsLoading(true);
      loadEvidenceFromSupabase(controlId, frameworkId)
        .then((loadedEvidence) => {
          // Only add evidence that doesn't already exist in store
          loadedEvidence.forEach((e) => {
            const exists = evidence.some((existing) => existing.id === e.id);
            if (!exists) {
              addEvidence(e);
            }
          });
        })
        .catch((error) => {
          logError("Failed to load evidence from Supabase in ControlEvidencePanel", { error, controlId, frameworkId });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlId, frameworkId]);

  const handleAdd = async () => {
    if (!title.trim()) return;
    
    const evidenceData = {
      controlId,
      frameworkId,
      title: title.trim(),
      location: location.trim() || undefined,
      type,
      description: description.trim() || undefined,
      addedBy: user?.id || user?.email || "anonymous",
      tags: [],
    };
    
    // Add to local store immediately for responsive UI
    addEvidence(evidenceData);
    
    // If using Supabase backend, also save to database
    if (ENV.backendMode === "supabase") {
      try {
        await saveEvidenceToSupabase(evidenceData);
      } catch (error) {
        logError("Failed to sync evidence to Supabase in ControlEvidencePanel", { error, controlId, frameworkId });
        // Don't fail the UI - local state is already updated
      }
    }
    
    setTitle("");
    setLocation("");
    setDescription("");
    setType("other");
    setShowAddForm(false);
  };

  const handleRemove = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this evidence?")) {
      // Remove from local store immediately
      removeEvidence(id);
      
      // If using Supabase backend, also delete from database
      if (ENV.backendMode === "supabase") {
        try {
          await deleteEvidenceFromSupabase(id);
        } catch (error) {
          logError("Failed to delete evidence from Supabase in ControlEvidencePanel", { error, evidenceId: id });
          // Don't fail the UI - local state is already updated
        }
      }
    }
  };

  const getTypeIcon = (evidenceType: string) => {
    switch (evidenceType) {
      case "policy":
      case "procedure":
        return <FileText className="h-4 w-4" />;
      case "log":
        return <FileText className="h-4 w-4" />;
      case "screenshot":
        return <FileText className="h-4 w-4" />;
      case "ticket":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (evidenceType: string) => {
    switch (evidenceType) {
      case "policy":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "procedure":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "log":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "screenshot":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "ticket":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          Evidence ({controlEvidence.length})
          {isLoading && <span className="ml-2 text-xs text-gray-500">(Loading...)</span>}
        </h4>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-2 py-1 text-xs rounded bg-command-blue-600 text-white hover:bg-command-blue-700 transition-colors"
          >
            Add Evidence
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-sm font-medium text-gray-900 dark:text-white">Add New Evidence</h5>
            <button
              onClick={() => {
                setShowAddForm(false);
                setTitle("");
                setLocation("");
                setDescription("");
              }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close form"
              title="Close form"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-2">
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Evidence title (e.g., Access Control Policy v3)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Location / URL / reference"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <textarea
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
            <select
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              aria-label="Evidence type"
            >
              <option value="policy">Policy</option>
              <option value="procedure">Procedure</option>
              <option value="log">Log</option>
              <option value="screenshot">Screenshot</option>
              <option value="ticket">Ticket</option>
              <option value="other">Other</option>
            </select>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleAdd}
                disabled={!title.trim()}
                className="flex-1 px-3 py-1.5 text-sm rounded bg-command-blue-600 text-white hover:bg-command-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Evidence
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setTitle("");
                  setLocation("");
                  setDescription("");
                }}
                className="px-3 py-1.5 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {controlEvidence.map((e) => (
          <div
            key={e.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs flex justify-between items-start bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(e.type)}`}>
                  {getTypeIcon(e.type)}
                  <span className="ml-1 capitalize">{e.type}</span>
                </span>
              </div>
              <div className="font-semibold text-gray-900 dark:text-white mb-1">{e.title}</div>
              {e.description && (
                <div className="text-gray-600 dark:text-gray-400 mb-1">{e.description}</div>
              )}
              {e.location && (
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span className="truncate">{e.location}</span>
                </div>
              )}
              <div className="text-gray-400 dark:text-gray-500 mt-1">
                Added {new Date(e.addedAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => handleRemove(e.id)}
              className="ml-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Remove evidence"
              aria-label="Remove evidence"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        {controlEvidence.length === 0 && !showAddForm && (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
            No evidence attached yet. Click "Add Evidence" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlEvidencePanel;

