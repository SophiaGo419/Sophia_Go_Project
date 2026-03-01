import React, { useState } from "react"; 
import {Project } from "../types";

interface ProjectProps {
    project: Project[];
    onToggle: (project: Project) => void;
    onDelete: (id: number) => void;
}

const ProjectList: React.FC<ProjectProps> = ({ project, onToggle, onDelete }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editProjectName, setEditProjectName] = useState<string>("");
    const [editDateCreated, setEditDateCreated] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setEditProjectName(project.project_name);
        setEditDateCreated(project.date_created);
        setEditDescription(project.description);
    };

    const handleSave = (project: Project) => {
        onToggle({ 
            ...project,
            project_name: editProjectName,
            date_created: editDateCreated,
            description: editDescription,
        });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditProjectName("");
        setEditDateCreated("");
        setEditDescription("");
    };

   return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Project Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date Created</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {project.map((proj) => (
            <tr key={proj.id} className="hover:bg-gray-50 align-top">
              {editingId === proj.id ? (
                <>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editProjectName}
                      onChange={(e) => setEditProjectName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editDateCreated}
                      onChange={(e) => setEditDateCreated(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(proj)}
                      className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-3">{proj.project_name}</td>
                  <td className="px-6 py-3">{proj.date_created}</td>
                  <td className="px-6 py-3 whitespace-pre-line">{proj.description}</td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(proj)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(proj.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
