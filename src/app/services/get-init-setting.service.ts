//./services/get-init-setting.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs';

@Injectable()
export class GetInitSettingService {
    constructor(private http: Http) {};

    getInitSetting() {
        let initUrl = './index/getInitSetting.action';
        let params = new URLSearchParams();
        return this.http.get(initUrl,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    private handleError(error: any) {
        console.error('An error occurred: '+error);
        return Promise.reject(error.message || error);
    }
}
