// types.ts`
export interface FormData {
  personalInformation: {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    address: string;
  };
  fundingGoal: {
   fundraiserTitle: string
   fundraiserDescription:string
   goal:number
   category: 'Medical' | 'Education' | 'Business' | 'Others';
   deadline:Date
  };
  fundingMedia: {
   
  };
}