
export interface EmailProps {
  accountnumber: string;
  bank: string;
}

export type donateForm = {
  fullname: string;
  amount: number;
  email: string;
  tip?: number | null; 
  anonymity: string;
  fundraiserId?: string;
};

export type Donor = {
  amount: number;
  anonymity: string;
  currency: string;
  donorEmail: string;
  donorName: string;
  fundraiserId: string;
  paymentIntentId: string;
};

export type DetailsProps = {
  _id: string;
  amountRaised: number;
  goal: number;
  fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
  firstname: string;
  lastname: string;
  fundraiserDescription: string;
};

export type Fundraiser = {
  _id: string;
  amountRaised: number;
  goal: number;
  fundingMedia: { pathToFile: string }[];
  fundraiserTitle: string;
  donations: number;
};
