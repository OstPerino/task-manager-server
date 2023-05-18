import {ApiProperty} from "@nestjs/swagger";

export class CreateBoardDto {
    readonly projectId: number;
    readonly name: string;
    readonly description: string;
}