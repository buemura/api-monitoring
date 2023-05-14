import { IsOptional, IsString } from 'class-validator';

export class GetFilteredResources {
  @IsString()
  @IsOptional()
  name?: string;
}
