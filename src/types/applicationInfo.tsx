export interface JobApplication {
  company: string;
  position: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'Phone Screen' | 'Final Round';
  notes: string;
  url: string;
}

export enum JobStatus {
  Applied = "Applied",
  Interview = "Interview",
  Offer = "Offer",
  Rejected = "Rejected",
  PhoneScreen = "Phone Screen",
  FinalRound = "Final Round",
}