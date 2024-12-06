export interface IDataBlock {
    id: number;
    name: string;
    objects: IDataObject[];
}

export interface IDataObject {
    date: number;
    description: string;
}