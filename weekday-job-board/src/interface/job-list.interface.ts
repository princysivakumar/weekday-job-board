export interface Job  {
    jdUid: string;
  jdLink: string;
  jobDetailsFromCompany: string;
  maxJdSalary: number;
  minJdSalary: number | null; // minJdSalary can be null
  salaryCurrencyCode: string;
  location: string;
  minExp: number;
  maxExp: number | null; // maxExp can be null
  jobRole: string;
  companyName: string;
  logoUrl: string;
  }
  
 export interface CardProps {
    job: Job;
  }


 export interface Filters {
    minExperience: string;
    companyName: string;
    location: string;
    employmentType: string; 
    techStack: string;
    role: string;
    minBasePay: string; 
  }
  
 
  
 export interface APIResponse {
    jdList: Job[]; 
    totalCount: number;
  }


