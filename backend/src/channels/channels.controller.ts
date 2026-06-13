import { Controller, Get, Param } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Get()
  async getAllChannels() {
    return this.channelsService.getAllChannels();
  }

  @Get(':id')
  async getChannelDashboard(@Param('id') id: string) {
    return this.channelsService.getChannelDashboard(id);
  }
}
