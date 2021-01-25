import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service'
import fetch from 'node-fetch'
import * as env from '../.env'

@Injectable()
export class MarvelService {

    constructor(private readonly authService: AuthService){}

    public getItems = async <T>({url, id, complement, page}: {url: string, id?: number, complement?: string, page?: string}): Promise<T[]> => {
        let response = await fetch(this._generateUrl({url, id, complement, page}))
        response = await response.json()
        try{
            response = response.data.results as T[]
        }catch(e){
            throw e
        }
       
        return response
    }

    private _generateUrl = ({url, id, complement, page}: {url: string, id?: number, complement?: string, page?: string}): string => {
        let partialUrl = url
        if(id){
            partialUrl += "/" + id
        }
        if(id && complement){
            partialUrl += "/" + complement
        }
        let pageNum: number = 1 
        if(page){
            pageNum = (page as undefined) as number
        }
        
        let limit: number = env.pageSize as number
        let offset: number = (pageNum -1) * limit

        const completeUrl = env.urlBase + partialUrl + '?offset=' + offset + '&limit='+ limit + '&' + this.authService.getToken()

        return completeUrl
    }

    

}
