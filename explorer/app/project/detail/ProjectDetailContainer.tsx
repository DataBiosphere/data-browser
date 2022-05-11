import React from 'react'
import { PrettyJSON } from '../../components'

export interface ProjectDetailContainerProps {
    json: string
    projectName: string
}

export const ProjectDetailContainer = ({json, projectName}: ProjectDetailContainerProps) => {
    return (
        <>
            <h1>{projectName}</h1>
            <PrettyJSON value={json}/>
        </>
    )
}