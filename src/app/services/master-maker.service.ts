//./services/master-maker.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MasterMakerService {
    constructor(private http: Http) {};

    getMasterListOriginalList(options?:any):Observable<any> {
        let masterListOriginalUrl = './index/getmasterlistoriginallist.action';
        let params = new URLSearchParams();
            params.set('scannerGroup',options.scannerGroup);
            params.set('protocolType',options.protocolType);
            params.set('masterList',options.masterList);
        return this.http.post(masterListOriginalUrl,params)
            .map(res => res.json())
            .catch(this.handleError)
    }

    private handleError(error: any) {
        console.error('An error occurred: '+error);
        return Promise.reject(error.message || error);
    }
}
