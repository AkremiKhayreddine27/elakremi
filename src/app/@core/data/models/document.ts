//import { User } from './user';
import { File } from './file';
export interface Document {
    id: number,
    title: string,
    description?: string,
    type?: string,
    createdAt?: any,
    owner?: any,
    icon?: string,
    file?: File,
    link?: string 
}