export interface Job {
    id: number;
    company:string;
    email: string;
    title: string;
    location: string;
    status: 'Applied' | 'Interviewed' | 'Approved' | 'Rejected';


}