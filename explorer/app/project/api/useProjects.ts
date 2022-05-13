import { useAsync } from "./../../hooks/useAsync";

interface ProjectResponse {
  hits: {
    projects: {
      projectId: string;
    }[];
  }[];
}

export const useProjects = () => {
  const { isLoading, data } = useAsync<ProjectResponse[]>();

  return { data, isLoading };
};
