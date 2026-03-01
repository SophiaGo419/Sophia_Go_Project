import React, { useEffect, useState } from "react";
import { Employee} from "./types";
import { getEmployee, createEmployee, updateEmployee, deleteEmployee} from "./api";
import EmployeeList from "./Components/EmployeeList";
import ProjectList from "./Components/ProjectList";
import ProjectPage from "./Components/ProjectPage";
import DepartmentPage from "./Components/DepartmentPage";


const App: React.FC = () => {
  const [employee, setEmployee] = useState<Employee[]>([]);
  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");

 const [activeSection, setActiveSection] = useState<"employee" | "project" | "department">("employee");
  

//Employee
  const fetchEmployee = async () => {
    try {
      const data = await getEmployee();
      setEmployee(data);
    } catch (error) {
      console.error("Error fetching employee", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  // Create employee
  const EmployeehandleCreate = async () => {
    try {
      await createEmployee({ full_name: fullname, email, role });
      setFullName("");
      setEmail("");
      setRole("");
      fetchEmployee();
    } catch (error) {
      console.error("Error creating employee", error);
    }
  };

  // Update employee
  const EmployeehandleToggle = async (emp: Employee) => {
    try {
      await updateEmployee(emp.id, {
        full_name: emp.full_name,
        email: emp.email,
        role: emp.role,
      });
      fetchEmployee();
    } catch (error) {
      console.error("Error updating employee", error);
    }
  };

  // Delete employee
  const EmployeehandleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      fetchEmployee();
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      {/* ---------- Section Toggle Buttons ---------- */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          onClick={() => setActiveSection("employee")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeSection === "employee"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Employee Section
        </button>

        <button
          onClick={() => setActiveSection("project")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeSection === "project"
              ? "bg-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Project Section
        </button>

         <button
          onClick={() => setActiveSection("department")}
          className={`px-6 py-3 rounded-lg font-semibold transition ${
            activeSection === "department"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Department Section
        </button>
      </div>
      

      {/* ---------- Conditional Rendering ---------- */}
      {activeSection === "employee" && (
        <div className="p-10 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Employee CRUD 
          </h2>

          {/* Employee Form */}
          <div className="mb-8 items-center flex flex-col gap-4">
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full name"
              className="w-1/2  p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
              className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={EmployeehandleCreate}
              className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
            >
              Add Employee
            </button>
          </div>

          {/* Employee List Table */}
          <EmployeeList
            employee={employee}
            onToggle={EmployeehandleToggle}
            onDelete={EmployeehandleDelete}
          />
        </div>
      )}

      {activeSection === "project" && <ProjectPage />}
      {activeSection === "department" && <DepartmentPage />}
    </div>
  );
};

export default App;