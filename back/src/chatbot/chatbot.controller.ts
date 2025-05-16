import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { AskBotDto } from '../chatbot/dto/ask-bot.dto';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask')
  askBot(@Body() askBotDto: AskBotDto) {
    const response = this.chatbotService.getBotResponse(askBotDto.message);
    return { response };
  }
}
