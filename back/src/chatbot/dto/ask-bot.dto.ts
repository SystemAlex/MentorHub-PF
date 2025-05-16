import { IsString } from 'class-validator';

export class AskBotDto {
  @IsString()
  message: string = '';
}
