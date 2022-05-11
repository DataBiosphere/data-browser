import { ProjectResponse, ProjectViewModel } from '../models'
import {detailToView} from './project'

interface TransformerConfig {
    project: {
        detail: (value: ProjectResponse) => ProjectViewModel
    }
}

export const TRANSFORMERS: TransformerConfig = {
    project: {
        detail: detailToView
    }
}