import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd
} from '@angular/router';
import {
  HistoryListService
} from '../../../services/history-list.service';
import {
  RequestListService
} from '../../../services/request-list.service';
import {
  TransmitDataService
} from './../../../services/transmit-data.service'
@Component({
  selector: 'app-protocol-history',
  templateUrl: './protocol-history.component.html',
  styleUrls: ['./protocol-history.component.css']
})
export class ProtocolHistoryComponent implements OnInit {
  protocolHistory: any;
  selectedData: any;
  compareList: any;
  hiddenthirdColumn: boolean = false;
  isSelected: boolean = false;
  hidden: boolean = false;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private historyListService: HistoryListService,
    private requestListService: RequestListService,
    private transmitDataService: TransmitDataService,
  ) {}

  ngOnInit() {
    this.historyListService.getProtocolHistoryData()
      .subscribe(protocolHistory => {
        let protocolResult = [...protocolHistory.result];
        this.protocolHistory = this.persistData(protocolResult);
      })
    this.selectedData = this.transmitDataService.getProtocol();
    this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      console.log(event);
      if (event.urlAfterRedirects == "/historylist/protocolhistory") {
        this.hidden = false;
      } else {
        this.hidden = true;
      }
    })
  }

  persistData(protocolHistory: Array < any > ) {
    var formattedData = [];
    var requestData = {};
    var responseData = {};
    protocolHistory.every((item, index, _array) => {
      requestData = {
        status: item.action_response + ' request',
        event: item.action_request + '(Request)',
        user: item.updatedUserName_request,
        date: item.updatedDateTime_request,
        comment: item.remark_request
      }
      formattedData.push(requestData);
      let system_remark = item.system_remark ? item.system_remark : '';
      responseData = {
        status: item.action_response,
        event: item.action_response,
        user: item.updatedUserName_response,
        date: item.updatedDateTime_response,
        comment: system_remark + item.remark_response
      }
      formattedData.push(responseData);
      return true;
    })
    return formattedData;
  }

  onRowSelect($event, dt) {
    this.isSelected = true;
    this.requestListService.getCompareData({
      leftfilepath: '',
      rightversion: '',
      rightfilepath: this.selectedData.filepath,
      parameterlist: '',
      eventstatus: this.selectedData.status,
      eventid: '1',
      eventFlag: 'all'
    }).subscribe(compareList => {
      if (compareList) {
        this.selectedData['leftprotocol'] = compareList.leftprotocol;
        this.selectedData['rightprotocol'] = compareList.rightprotocol;
        this.compareList = compareList;
      }
    });
  }
}

