import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  accessToken?: string;

  @IsNotEmpty()
  @IsInt()
  checkFrequency: number;
}
