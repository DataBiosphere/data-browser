import Link from 'next/link'
import React from 'react'

export interface ProjectListContainerProps {
    items: {
        projectName: string
        projectUuid: string
    }[]
}

export const ProjectListContainer = ({items}: ProjectListContainerProps) => {
    return (
    <>
        <h1>Project List</h1>
        <div>
            <ul>
                {
                items.map(
                    item => (
                    <li key={item.projectUuid}>
                        <Link href={`/explore/projects/${item.projectUuid}`}>
                            <a>{item.projectName}</a>
                        </Link>
                    </li>
                    )
                )}
            </ul>
        </div>
    </>
    )
}