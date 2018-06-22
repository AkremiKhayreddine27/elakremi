import { User } from './user';
export interface Document {
    id: number,
    title: string,
    description: string,
    type?: string,
    createdAt?: any,
    format?: string,
    owner?: any,
    icon?: string
}