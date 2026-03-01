import React, { useState } from "react"; 
import {Department} from "../types";

interface DepartmentProps {
    department: Department[];
    onToggle: (department: Department) => void;
    onDelete: (id: number) => void;
}

const DepartmentList: React.FC<DepartmentProps> = ({ department, onToggle, onDelete }) => {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editDepartmentName, setEditDepartmentName] = useState<string>("");
    const [editLocation, setEditLocation] = useState<string>("");

    const handleEdit = (department: Department) => {
        setEditingId(department.id);
        setEditDepartmentName(department.department_name);
        setEditLocation(department.location);
    };

    const handleSave = (department: Department) => {
        onToggle({ 
            ...department,
            department_name: editDepartmentName,
            location: editLocation,
        });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditDepartmentName("");
        setEditLocation("");
    };

    return ( 
        <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {department.map((dep) => (
            <tr key={dep.id} className="hover:bg-gray-50 align-top">
              {editingId === dep.id ? (
                <>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editDepartmentName}
                      onChange={(e) => setEditDepartmentName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(dep)}
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
                  <td className="px-6 py-3">{dep.department_name}</td>
                  <td className="px-6 py-3">{dep.location}</td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(dep)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(dep.id)}
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

export default DepartmentList;
