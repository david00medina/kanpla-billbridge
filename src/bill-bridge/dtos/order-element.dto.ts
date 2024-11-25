import { IsInt, IsOptional, IsString } from 'class-validator';

export class OrderElementDTO {
  @IsInt()
  id: number;
  @IsString()
  item: string;
  @IsString()
  customer: string;
  @IsString()
  @IsOptional()
  billingFrequency: string;
}
