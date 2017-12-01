import { RequestResult } from './request-result'

export interface RequestList {
    archivetime: string;
    fromtime: string;
    resttime: string;
    settingtime: string;
    total: string;
    totime: string;
    transferlistdistributetime: string;
    transferlisttime: string;
    result ?: Array<RequestResult>;
}
