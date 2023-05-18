export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  accessToken: string;
  checkFrequency: number;
  status: string;
  lastCheck: Date;
  notifyTo: string;
  createdAt: Date;
  updatedAt: Date;
}
