import {
  RequestListService
} from './../../../services/request-list.service';
import {
  TransmitDataService
} from './../../../services/transmit-data.service';
import {
  CompareList
} from './../../../models/compare-list';
import {
  RequestResult
} from './../../../models/request-result';
import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router,
  NavigationEnd, 
  ActivatedRoute 
} from '@angular/router';
import {
  TreeNode
} from 'primeng/primeng';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})

export class RequestListComponent implements OnInit {
  requestResult: Array<any>;
  // treeData:object = {};
  cols: any[];
  header: object;
  isTrue: boolean;
  hidden: boolean = false;

  first: number = 0;
  rowsPerPage: number = (window.innerHeight < 1000) ? 9 : 20;
  totalRecords: number = 0;

  scrollable: boolean = false;
  paginator: boolean = true;
  scrollheight: string = "";
  epnames: object;
  tablecellHeight: number = 10;
  isSelected: boolean = false;
  selectedProtocol: object; 
  blockDtState: boolean = false;
  hiddenthirdColumn: boolean = false;
  compareList: any;
  isTablet:boolean = false;
  blockState: boolean = false;

  constructor(private requestListService: RequestListService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transmitDataService: TransmitDataService
  ) {}

  ngOnInit() {
    if(window['deviceInfo']&&window['deviceInfo']==='isTablet'){
      this.isTablet = true;
    }    
    this.blockDtState = true;
    let time=new Date;
    this.requestListService.getRequestListData()
      .subscribe(requestList => {
        let time=new Date;
        if(requestList.result && requestList.result.length>0){
          this.requestResult = requestList.result;
          let dataLen = requestList.result.length;
          this.totalRecords = Math.ceil(dataLen / this.rowsPerPage) * this.rowsPerPage;
        }
        this.blockDtState = false;
      },
      error => console.log(error)
    );
    this.router.events.filter((event)=>event instanceof NavigationEnd).subscribe((event:NavigationEnd)=>{
      if(event.urlAfterRedirects=="/requestlist"){
        this.hidden = false;
      }else{
        this.hidden = true;
      }
    })
    this.header = {
      status: '',
      type: 'Protocol',
      patienttype: 'Patient Type',
      protocolname: 'Name',
      version: 'Version',
      lastupddt: 'Date',
      displaymachinename: 'Scanner',
      applicant: 'User'
    }
  }

  onRowSelect(event, dt) {
    this.scrollable = true;
    this.scrollheight = "30vh";
    this.isSelected = true;
    this.selectedProtocol = event.data;
    let currentTarget = event.originalEvent.currentTarget;
    this.blockState = true;
    this.requestListService.getCompareData({
        leftfilepath:  '',
				rightversion: event.data.version,
				rightfilepath: event.data.filepath,
				parameterlist: '',
				eventstatus: '',
				eventid: '',
				eventFlag: 'all'
    }).subscribe(compareList => {
      if(compareList){
        this.selectedProtocol['leftprotocol'] = compareList.leftprotocol;
        this.selectedProtocol['rightprotocol'] = compareList.rightprotocol;
        this.scrollToSelectionPrimeNgDataTable(currentTarget);
        this.compareList = compareList;
        this.blockState = false;                
      }
    });
  }

  onButtonClick() {
    this.isSelected = true;
    this.scrollable = false;
    this.scrollheight = "";
    this.hiddenthirdColumn = true;
  }

  public scrollToSelectionPrimeNgDataTable(target) {
    let list = document.querySelectorAll('tr');
    if (list !== null && target.sectionRowIndex < list.length) {
      let targetElement = list.item(target.sectionRowIndex);
      targetElement.scrollIntoView()
    }
  }
}
