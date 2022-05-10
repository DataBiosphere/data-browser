import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { list as projectList, detail as projectDetail } from '../../../app/project/api/service'
import { ProjectDetailContainer, ProjectDetailContainerProps } from '../../../app/project/detail/ProjectDetailContainer'

interface PageUrl extends ParsedUrlQuery {
    uuid: string
}

const ProjectDetailPage: React.FC<ProjectDetailContainerProps> = (props: ProjectDetailContainerProps) => {
    return <ProjectDetailContainer {...props}/>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const projects = await projectList()
    const paths = projects.hits.map((hit) => ({
        params: {
            uuid: hit.projects[0].projectId
        }
    }))
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({params}: GetStaticPropsContext) => {
    const data = await projectDetail((params as PageUrl).uuid)
    return {
        props: {
            json: data,
            projectName: data.projects[0].projectShortname
        }
    }
}

export default ProjectDetailPage