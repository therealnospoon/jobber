export interface JobApplication {
  _id?: string | undefined;
  createdOn?: string | undefined;
  company: string;
  jobLocation: string;
  companySize: string;
  position: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Phone Screen' | 'Final Round';
  response: boolean;
  responseType?: 'Accepted' | 'Rejected' | 'No Response' | 'Ghosted' | 'Feedback Given' | 'No Feedback';
  responseDate?: string | undefined;
  rejected?: boolean;
  rejectedReason?: 'Lack of Experience' | 'Lack of Skills' | 'Generic Rejection' | 'No Response' | 'Other' | 'N/A';
  notes: string;
  url: string;
}
export interface JobApplicationUpdate {
  _id: string;
  company: string;
  jobLocation: string;
  companySize: string;
  position: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Phone Screen' | 'Final Round';
  response: boolean;
  responseType?: 'Accepted' | 'Rejected' | 'No Response' | 'Ghosted' | 'Feedback Given' | 'No Feedback';
  responseDate?: string | undefined;
  rejected?: boolean;
  rejectedReason?: 'Lack of Experience' | 'Lack of Skills' | 'Generic Rejection' | 'No Response' | 'Other' | 'N/A';
  notes: string;
  url: string;
}

// export enum JobStatus {
//   Applied = "Applied",
//   Interview = "Interview",
//   Offer = "Offer",
//   Rejected = "Rejected",
//   PhoneScreen = "Phone Screen",
//   FinalRound = "Final Round",
// }