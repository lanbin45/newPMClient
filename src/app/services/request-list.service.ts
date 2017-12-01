import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RequestList } from './../models/request-list';
import { CompareList } from './../models/compare-list';

@Injectable()
export class RequestListService {
    constructor(private http: Http) {};

    getRequestListData(): Observable<RequestList> {
        let requestListDataUrl = './index/getRequestList.action';
        let params = new URLSearchParams();
        params.set('refresh_flg','refresh');
        return this.http.get(requestListDataUrl, {
                search: params
            }).map((res:Response) => <RequestList> res.json())
            .catch(this.handleError)
    }

    getCompareData(options?:any): Observable<CompareList> {
        var date = new Date();
        let compareDataUrl = './index/initcompare.action';
        let params = new URLSearchParams();
        params.set('leftfilepath',options.leftfilepath);
        params.set('rightversion',options.rightversion);
        params.set('rightfilepath',options.rightfilepath);
        params.set('parameterlist',options.parameterlist);
        params.set('eventstatus',options.eventstatus);
        params.set('eventid',options.eventid);
        params.set('eventFlag',options.eventFlag);
        params.set('page','1');
        params.set('start','0');
        params.set('limit','25');
        return this.http.post(compareDataUrl,params)
            .map((res:Response) =><CompareList> res.json().result)
            .catch(this.handleError)
    }

    getCompareListData() {
        return this.http.get('assets/camparelist.json')
                    .toPromise()
                    .then(res => res.json());
    }

    getScanMode(options?:any) {
        let getScanModeUrl = './index/getcompareparameter.action';
        let params = new URLSearchParams();
        params.set('leftfilepath',options.leftfilepath);
        params.set('rightfilepath',options.rightfilepath);
        return this.http.get(getScanModeUrl,{search: params})
                    .toPromise()
                    .then(res => res.json());
    }

    getOtherProtocols(options?:any){
        let getOtherProtocolsUrl = './index/getOtherProtocols.action';
        let params = new URLSearchParams();
        params.set('filepath',options.filepath);
        params.set('version',options.version);
        params.set('uid',options.uid);
        params.set('epno',options.epno);
        params.set('proname',options.proname);
        params.set('status',options.status);
        params.set('protype',options.protype);
        params.set('patienttype',options.patienttype);
        params.set('protocolorgan',options.protocolorgan);
        params.set('organtype',options.organtype);
        params.set('rightstatus',options.rightstatus);
        params.set('eventFlag',options.eventFlag);
        params.set('protocoleptype',options.protocoleptype);
        return this.http.get(getOtherProtocolsUrl,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getParameterList(options?:any){
        let getOtherProtocolsUrl = './index/getParameters.action';
        let params = new URLSearchParams();
        
        params.set('uid',options.uid);
        params.set('epno',options.epno);
        params.set('proname',options.proname);
        params.set('version',options.version);
        params.set('status',options.status);
        params.set('patienttype',options.patienttype);
        params.set('protocolorgan',options.protocolorgan);
        return this.http.get(getOtherProtocolsUrl,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getTransferList(options?:any){
        let getTransferListUrl = './index/getmodellist.action';
        let params = new URLSearchParams();
        /*params.set('filepath',options.filepath);
        params.set('version',options.version);
        params.set('uid',options.uid);
        params.set('epno',options.epno);
        params.set('proname',options.proname);
        params.set('status',options.status);
        params.set('protype',options.protype);
        params.set('patienttype',options.patienttype);
        params.set('protocolorgan',options.protocolorgan);
        params.set('organtype',options.organtype);
        params.set('rightstatus',options.rightstatus);
        params.set('eventFlag',options.eventFlag);
        params.set('protocoleptype',options.protocoleptype);*/
        return this.http.get(getTransferListUrl,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    transferProtocol(options?:any){
        let url = './index/transferprotocols.action';
        let params = new URLSearchParams();
        params.set('protocolList',options.protocolList);
        params.set('settingGroup',options.settingGroup);
        params.set('auto_transfer_reason',options.auto_transfer_reason);
        params.set('reason',options.reason);
        params.set('type',options.type);
        params.set('protocolName',options.protocolName);
        return this.http.get(url,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    requestAction(options?:any){
        let url = './index/requestevent.action';
        let params = new URLSearchParams();
        params.set('event',options.event);
        params.set('epNumber',options.epNumber);
        params.set('protocolName',options.protocolName);
        params.set('uid',options.uid);
        params.set('version',options.version);
        params.set('machineName',options.machineName);
        params.set('protocolStatus',options.protocolStatus);
        params.set('pt',options.pt);
        params.set('organ',options.organ);
        params.set('patienttype',options.patienttype);
        params.set('reason',options.reason);
        params.set('settinggroup',options.settinggroup);
        params.set('checkedRPIDsJsonStr',options.checkedRPIDsJsonStr);
        params.set('auto_approval_reason',options.auto_approval_reason);
        params.set('auto_reason',options.auto_reason);
        params.set('auto_transfer_reason',options.auto_transfer_reason);
        params.set('transfer_reason',options.transfer_reason);


        return this.http.get(url,{search: params}).toPromise()
            .then(res => res.json())
            .catch(this.handleError)

    }

    private handleError(error: any) {
        console.error('An error occurred: '+error);
        return Promise.reject(error.message || error);
    }
}