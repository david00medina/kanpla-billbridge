import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class BillingElementDTO {
  @IsInt()
  id: number;
  @IsString()
  item: string;
  @IsString()
  customer: string;
  @IsString()
  @IsOptional()
  submittedId: string;
  @IsDate()
  @IsOptional()
  submittedAt: string;
}
