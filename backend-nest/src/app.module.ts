import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoriesModule } from './stories/stories.module';
import { MarvelService } from './marvel/marvel.service';
import { AuthService } from './auth/auth.service';



@Module({
  imports: [StoriesModule],
  controllers: [AppController],
  providers: [AppService, MarvelService, AuthService],
})
export class AppModule {}
