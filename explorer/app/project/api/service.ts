import { convertUrlParams } from './../../utils';
import { URL } from "../../shared"
import { ListParams, ProjectListResponse, ProjectResponse, VersionParam } from '../../models';

const DEFAULT_VERSION: VersionParam = {
    catalog: 'dcp2'
}

const DEFAULT_LIST_PARAMS: ListParams = {
    ...DEFAULT_VERSION,
    size: '25'
}

export const list = async (listParams?: ListParams): Promise<ProjectListResponse> => {
    const params = {...DEFAULT_LIST_PARAMS, ...listParams}
    const res = await fetch(`${URL}index/projects?${convertUrlParams(params)}`)
    return await res.json()
}

export const detail = async (id: string, param: VersionParam = DEFAULT_VERSION): Promise<ProjectResponse> => {
    const res = await fetch(`${URL}index/projects/${id}?${convertUrlParams({...param})}`)
    return await res.json()
}