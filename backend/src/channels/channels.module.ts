import { Module } from '@nestjs/common';
import { YoutubeModule } from '../youtube/youtube.module';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';

@Module({
  imports: [YoutubeModule],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
