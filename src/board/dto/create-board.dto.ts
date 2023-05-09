import {ApiProperty} from "@nestjs/swagger";

export class CreateBoardDto {

    // @ApiProperty({ example: 'Board Name', description: 'Название' })
    readonly projectId: number;
    readonly name: string;
    readonly description: string;
    // @ApiProperty({ example: 'ID of project', description: 'ID проекта' })
    // readonly projectId: number;
}