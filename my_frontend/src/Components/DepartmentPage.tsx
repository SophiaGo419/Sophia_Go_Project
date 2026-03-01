import React, { useEffect, useState } from "react";
import { Department } from "../types";
import {getDepartment, createDepartment, updateDepartment, deleteDepartment} from "../api";
import DepartmentList from "../Components/DepartmentList";

const DepartmentPage: React.FC = () => {
const [department, setDepartment] = useState<Department[]>([]);
  const [departmentname, setDepartmentName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

const fetchDepartment = async () => {
    try {
      const data= await getDepartment();
      setDepartment (data);
    } catch (error) {
      console.error("Error fetching employee", error);
      }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const handleCreate = async () => { 

    try {
      await createDepartment({ department_name: departmentname, location: location});
      setDepartmentName("");
      setLocation("");
      fetchDepartment();
    } catch (error) {
      console.error("Error creating employee", error);
    }
    };

    const DepartmenthandleToggle = async (department: Department) => {
      try {
        await updateDepartment(department.id, {
          department_name: department.department_name,
          location: department.location,
          });
          fetchDepartment();
        } catch (error) {
          console.error("Error updating employee", error);
        }
      };

    const DepartmenthandleDelete = async (id: number) => {
      try {
        await deleteDepartment(id);
         fetchDepartment();
      } catch (error) {
        console.error("Error deleting employee", error);
      }
    };

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      
   <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Department CRUD </h2>

    <div className="mb-8 items-center flex flex-col gap-4">
      <input
      type="text"
      value={departmentname}

      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDepartmentName(e.target.value)
      }
      placeholder="Enter department name..."
      className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
      type="text"
      value={location}

      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setLocation(e.target.value)
      }
      placeholder="Enter description..."
      className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button onClick={handleCreate} className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">Add</button>
      </div>

<DepartmentList
  department={department}
  onToggle={DepartmenthandleToggle} 
  onDelete={DepartmenthandleDelete}
  />
    
  </div>
  );
};


export default DepartmentPage;