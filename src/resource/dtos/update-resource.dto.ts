import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsInt()
  checkFrequency: number;
}
