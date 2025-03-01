export interface JobApplication {
  company: string;
  position: string;
  dateApplied: string;
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
}