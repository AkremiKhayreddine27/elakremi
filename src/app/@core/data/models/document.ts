import { File } from './file';
export interface Document {
    kind?: string;
    id: string;
    title: string;
    description?: string;
    type?: string;
    createdAt?: any;
    owner?: any;
    icon?: string;
    file?: File;
    link?: string;
    nomenclature: any;
    nomenclatureType: any;
    nomenclatureLink: any;
    propertyId: number;
} 

