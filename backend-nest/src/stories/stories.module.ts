import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller'
import { StoriesService } from './stories.service';
import { MarvelService } from '../marvel/marvel.service' 
import {AuthService} from '../auth/auth.service'


@Module({
    imports: [], 
    controllers: [StoriesController],
    providers: [StoriesService, MarvelService, AuthService]
})
export class StoriesModule {}
