import {ApiProperty} from "@nestjs/swagger";

export class CreateBoardDto {
    @ApiProperty({ example: 'Board Name', description: 'Название' })
    readonly name: string;

    @ApiProperty({ example: 'ID of project', description: 'ID проекта' })
    readonly projectId: number;
}