export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  accessToken: string;
  checkFrequency: number;
  status: string;
  lastCheck: Date;
  createdAt: Date;
  updatedAt: Date;
}
