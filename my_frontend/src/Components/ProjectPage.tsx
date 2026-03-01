import React, { useEffect, useState } from "react";
import { Project } from "../types";
import {getProject, createProject, updateProject, deleteProject} from "../api";
import ProjectList from "../Components/ProjectList";


const ProjectPage: React.FC = () => {
const [project, setProject] = useState<Project[]>([]);
  const [projectname, setProjectName] = useState<string>("");
  const [datecreated, setDateCreated] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  
//Project
  const fetchProject = async () => {
    try {
      const data= await getProject();
      setProject (data);
    } catch (error) {
      console.error("Error fetching employee", error);
      }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const handleCreate = async () => { 

    try {
      await createProject({ project_name: projectname, date_created: datecreated, description: description});
      setProjectName("");
      setDateCreated("");
      setDescription("");
      fetchProject();
    } catch (error) {
      console.error("Error creating employee", error);
    }
    };

    const ProjecthandleToggle = async (project: Project) => {
      try {
        await updateProject(project.id, {
          project_name: project.project_name,
          date_created: project.date_created,
          description: project.description,
          });
          fetchProject();
        } catch (error) {
          console.error("Error updating employee", error);
        }
      };

    const ProjecthandleDelete = async (id: number) => {
      try {
        await deleteProject(id);
         fetchProject();
      } catch (error) {
        console.error("Error deleting employee", error);
      }
    };

  return (
    <div className="p-10 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      
   <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Project CRUD </h2>

    <div className="mb-8 items-center flex flex-col gap-4">
      <input
      type="text"
      value={projectname}

      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setProjectName(e.target.value)
      }
      placeholder="Enter project name..."
      className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
      type="date"
      value={datecreated}

      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setDateCreated(e.target.value)
      }
      placeholder="Enter date..."
      className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
      type="text"
      value={description}

      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDescription(e.target.value)
      }
      placeholder="Enter description..."
      className="w-1/2 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button onClick={handleCreate} className="w-1/2 bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition">Add</button>
      </div>

<ProjectList
  project={project}
  onToggle={ProjecthandleToggle} 
  onDelete={ProjecthandleDelete}
  />
    
  </div>
  );
};


export default ProjectPage;