import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeModule } from './youtube/youtube.module';
import { ChannelsModule } from './channels/channels.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que ConfigService esté disponible globalmente sin volver a importar ConfigModule
    }),
    PrismaModule,
    YoutubeModule,
    ChannelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
