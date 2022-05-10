import { useEffect } from 'react';
import { useAsync } from './../../hooks/useAsync';
import * as service from './service'

interface ProjectResponse {
    hits: {
        projects: {
            projectId: string
        }[]
    }[]
}

export const useProjects = () => {
    const {isLoading, run, data} = useAsync<ProjectResponse[]>()

    return {data, isLoading}
}