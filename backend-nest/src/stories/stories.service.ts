import { Injectable } from '@nestjs/common';
import { MarvelService } from '../marvel/marvel.service'
import { Story } from './interfaces/stories.interfaces'

@Injectable()
export class StoriesService {

    constructor(private readonly marvelServices: MarvelService){}

    async findAll(page): Promise<Story[]> {
        return await this.marvelServices.getItems<Story>({url: 'stories', page})
    }

    async findOne(id: number): Promise<Story[]> {
        try{
            return await this.marvelServices.getItems<Story>({url: 'stories', id})
        }catch(e){
            throw e
        }
       
    }



}
