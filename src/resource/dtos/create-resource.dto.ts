import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  description?: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  accessToken?: string;

  @IsNotEmpty()
  @IsInt()
  checkFrequency: number;
}
