import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import { list as projectList, detail as ProjectList } from '../../../app/project/api/service'
import { ProjectListContainer, ProjectListContainerProps } from '../../../app/project/list'

interface PageUrl extends ParsedUrlQuery {
    uuid: string
}

const ProjectListPage: React.FC<ProjectListContainerProps> = (props: ProjectListContainerProps) => {
    return <ProjectListContainer {...props}/>
}

export const getStaticProps: GetStaticProps = async () => {
    const projects = await projectList()
    return {
        props: {
            items: projects.hits.map(hit => ({
                projectName: hit.projects[0].projectShortname,
                projectUuid: hit.projects[0].projectId
            }))
        }
    }
}

export default ProjectListPage