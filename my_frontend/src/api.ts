import axios from "axios";
import { Employee, Project, Department } from "./types"


const API = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
});


//Employee
export const getEmployee = async(): Promise<Employee[]> => {
    const response = await API.get<Employee[]>("employee/");
    return response.data;
};

export const createEmployee = async (data: {
     full_name: string;
     email: string;
     role: string;

}): Promise<Employee> => {
    const response = await API.post<Employee>("employee/", data); 
    return response.data;
};

export const updateEmployee = async (
    id: number,
    data: Partial<Employee>
): Promise<Employee> => {
    const response = await API.put<Employee>(`employee/${id}/`, data);
    return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
    await API.delete(`employee/${id}/`);
};

export default API;

//Project
export const getProject = async(): Promise<Project[]> => {
    const response = await API.get<Project[]>("project/");
    return response.data;
};

export const createProject = async (data: {
    project_name: string; 
     date_created: string;
     description: string;

}): Promise<Project> => {
    const response = await API.post<Project>("project/", data); 
    return response.data;
};

export const updateProject = async (
    id: number,
    data: Partial<Project>
): Promise<Project> => {
    const response = await API.put<Project>(`project/${id}/`, data);
    return response.data;
};

export const deleteProject = async (id: number): Promise<void> => {
    await API.delete(`project/${id}/`);
};

//Department
export const getDepartment = async(): Promise<Department[]> => {
    const response = await API.get<Department[]>("department/");
    return response.data;
};

export const createDepartment = async (data: {
     department_name: string;
     location: string;
  

}): Promise<Department> => {
    const response = await API.post<Department>("department/", data); 
    return response.data;
};

export const updateDepartment = async (
    id: number,
    data: Partial<Department>
): Promise<Department> => {
    const response = await API.put<Department>(`department/${id}/`, data);
    return response.data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
    await API.delete(`department/${id}/`);
};

