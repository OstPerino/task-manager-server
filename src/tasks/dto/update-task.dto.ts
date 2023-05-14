import { IsOptional } from "class-validator";

export class UpdateTaskDto {
  @IsOptional()
  readonly title: string;
  @IsOptional()
  readonly description: string;
  @IsOptional()
  readonly status: string;
}