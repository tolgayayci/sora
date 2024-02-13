import { useEffect, useState } from "react";

export default function useProjects(projectPath = null) {
  const [projects, setProjects] = useState(projectPath ? null : []);

  async function fetchProjects() {
    try {
      let result;
      if (projectPath) {
        result = await window.sorobanApi.manageProjects("get", {
          path: projectPath,
        });
        if (result) {
          setProjects(
            [result].map((project) => ({
              name: project.name,
              path: project.path,
              active: project.active,
            }))
          );
        } else {
          setProjects([]);
        }
      } else {
        result = await window.sorobanApi.manageProjects("get");
        const projectsData = result.map((project) => ({
          name: project.name,
          path: project.path,
          active: project.active,
        }));
        setProjects(projectsData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [projectPath]);

  return projects;
}
