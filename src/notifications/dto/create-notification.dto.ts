

export class CreateNotificationDto {
  title: string;
  description: string;
  type: string;
  userSenderId: number;
  userReceiverId: number;
}