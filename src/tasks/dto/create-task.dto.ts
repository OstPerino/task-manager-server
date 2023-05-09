export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly status: string;
  readonly boardId: number;
  readonly creatorId: number;
  readonly workerId: number;
}