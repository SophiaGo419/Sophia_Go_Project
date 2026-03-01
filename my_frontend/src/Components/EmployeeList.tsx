import React, { useState } from "react"; 
import { Employee, Project, Department } from "../types";


interface EmployeeProps {
    employee: Employee[];
    onToggle: (employee: Employee) => void;
    onDelete: (id: number) => void;

}


//Employee
const EmployeeList: React.FC<EmployeeProps> = ({ employee, onToggle, onDelete }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFullName, setEditFullName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editRole, setEditRole] = useState<string>("");

  const handleEdit = (emp: Employee) => {
    setEditingId(emp.id);
    setEditFullName(emp.full_name);
    setEditEmail(emp.email);
    setEditRole(emp.role);
  };

  const handleSave = (emp: Employee) => {
    onToggle({
      ...emp,
      full_name: editFullName,
      email: editEmail,
      role: editRole,
    });
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFullName("");
    setEditEmail("");
    setEditRole("");
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Full Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employee.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50">
              {editingId === emp.id ? (
                <>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3">
                    <input
                      type="text"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleSave(emp)}
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
                  <td className="px-6 py-3">{emp.full_name}</td>
                  <td className="px-6 py-3">{emp.email}</td>
                  <td className="px-6 py-3">{emp.role}</td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(emp.id)}
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

export default EmployeeList;

