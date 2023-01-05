import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Project Name', description: 'Название' })
  readonly name: string;

  @ApiProperty({ example: 'Project Description', description: 'Описание' })
  readonly description: string;
}
