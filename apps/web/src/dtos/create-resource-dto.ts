export interface CreateResourceDto {
  name: string;
  description?: string;
  url: string;
  accessToken?: string;
  checkFrequency: number;
  notifyTo: string;
}
