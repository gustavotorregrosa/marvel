import { Injectable } from '@nestjs/common';
import * as env from '../.env'
import * as crypto from 'crypto-js'

@Injectable()
export class AuthService {

    public getToken = (): string => {
        const timestamp = Date.now()
        let hash: string = timestamp + env.privateKey + env.publicKey
        hash = crypto.MD5(hash).toString() as string

        let tokenData: string[] = []
        tokenData.push('ts=' + timestamp)
        tokenData.push('apikey=' + env.publicKey)
        tokenData.push('hash=' + hash)

        let token: string = tokenData.join('&')

        return token
    }



}
