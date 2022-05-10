import React from 'react'

export interface ProjectDetailContainerProps {
    json: string
    projectName: string
}

export const ProjectDetailContainer = ({json, projectName}: ProjectDetailContainerProps) => {
    return (
    <>
        <h1>{projectName}</h1>
        <div>
            {json}
        </div>
    </>
    )
}