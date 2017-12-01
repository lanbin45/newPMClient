export interface CompareList {
    leftprotocol: object;
    rightprotocol: object;
    issameorgan: boolean;
    list: Array<object>;
    changelist: Array<object>;
    leftcompareflag: number;
    rightcompareflag: number;
    flag: boolean;
    errCode?: number | string;
}
