import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams,QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HistoryListService {

  constructor(private http: Http) {}

  getHistoryListData():Observable<any> {
      /*return this.http.get('assets/mock-datas/history-list.json')
                  .map((res:Response) => res.json())
                  .catch(this.handleError)*/
      let url = './index/getConstitutionList.action';

      let params = new URLSearchParams();
      params.set('refresh_flg','refresh');
      return this.http.get(url, {
          search: params
      }).map((res:Response) => res.json())
          .catch(this.handleError)
                  
  }

  getProtocolHistoryData():Observable<any> {
      return this.http.get('assets/mock-datas/protocol-history.json')
                  .map((res:Response) => res.json())
                  .catch(this.handleError)
                  
  }


    getConstitutionHistoryList(options?:any){
        let url = './index/getConstitutionHistoryList.action';

        let params = new URLSearchParams('',new MyQueryEncoder());
        params.set('filepath',options.filepath);
        return this.http.get(url,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError);

       /* let url = './index/getConstitutionHistoryList.action';
        let params = new URLSearchParams();
        params.set('filepath',options.filepath);
        console.log(params)
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'text/plain');

        let opt = new RequestOptions({ headers: myHeaders, params: params });
        return this.http.get(url,opt).toPromise()
            .then(res => res.json())
            .catch(this.handleError);*/
    }
  
   private handleError(error: any) {
        console.error('An error occurred: '+error);
        return Promise.reject(error.message || error);
    }

}

 class MyQueryEncoder extends QueryEncoder {
       encodeKey(k: string): string {
         return encodeURIComponent(k);
       }

       encodeValue(v: string): string {
         return encodeURIComponent(v);
       }
 }
