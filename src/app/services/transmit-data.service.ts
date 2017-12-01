import { Injectable } from '@angular/core';

@Injectable()
export class TransmitDataService {
    selectProtocol: any;
    constructor(){ };
    setProtocol(data: any): any{
        this.selectProtocol = data;
    }
    getProtocol():any{
        return this.selectProtocol;
    }
}