export interface Job {
    id: number;
    title: string;
    description?: string;
    responsibilities?: string;
    additionalInformations?: string;
    createdDate: Date;
    updatedDate: Date;
}