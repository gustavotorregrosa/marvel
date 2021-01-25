import { Controller, Get, Param, Query } from '@nestjs/common';
import { StoriesService } from './stories.service'
import { Story } from './interfaces/stories.interfaces'

@Controller('stories')
export class StoriesController {

    constructor(private readonly storiesService: StoriesService){}
    
    @Get()
    async findAll(@Query() page): Promise<Story[]> {
        return await this.storiesService.findAll(page)
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Story[] | {message: string}> {
        try{
            return await this.storiesService.findOne(id)
        }catch(e){

            return {
                message: e.message
            }
        }
        
    }


}
