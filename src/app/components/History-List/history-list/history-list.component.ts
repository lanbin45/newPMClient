import {
  Component,
  OnInit,
  AfterViewChecked
} from '@angular/core';
import {
  HistoryListService
} from './../../../services/history-list.service';
import {
  TransmitDataService
} from './../../../services/transmit-data.service'
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  MenuItem,
  LazyLoadEvent
} from 'primeng/primeng';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, AfterViewChecked {
  historyResult: any[];
  protocolHistory: any[];
  hidden: boolean = false;
  items: MenuItem[];
  frozenWidth: any;
  unfrozenWidth: any;
  totalRecords: number;
  list: any;
  frozenOtherCount: number = 2;
  blockDtState: boolean = false;

  constructor(private historyListService: HistoryListService,
    private transmitDataService: TransmitDataService,
    private router: Router) {}
  ngAfterViewChecked() {}
  ngOnInit() {
    var me = this;
    window.addEventListener('resize', function () {
      var rightWidth = ((window.innerWidth - 20) - (window.innerWidth - 20) * 0.7) > 191 * me.frozenOtherCount ? 191 * me.frozenOtherCount : ((window.innerWidth - 20) - (window.innerWidth - 20) * 0.7);
      me.frozenWidth = (window.innerWidth - 20) - rightWidth + 'px';
      me.unfrozenWidth = rightWidth + 'px';
    });
    var rightWidth = ((window.innerWidth - 20) - (window.innerWidth - 20) * 0.7) > 191 * this.frozenOtherCount ? 191 * this.frozenOtherCount : ((window.innerWidth - 20) - (window.innerWidth - 20) * 0.7);
    this.frozenWidth = (window.innerWidth - 20) - rightWidth + 'px';
    this.unfrozenWidth = rightWidth + 'px';
    this.blockDtState = true;
    this.historyListService.getHistoryListData()
      .subscribe(historyList => {
          if (historyList.result && historyList.result.length > 0) {
            var header = historyList.result.shift();
            this.historyResult = historyList.result;
            this.totalRecords = historyList.result.length;
            this.list = this.historyResult.slice(0, 10);
            this.blockDtState = false;
          }
        },
        error => {
          this.blockDtState = false;
          console.log(error);
        }
      );
    this.items = [];
    this.items.push({
      label: 'Home',
      url: './requestlist'
    });
    this.items.push({
      label: 'History List',
      url: './historylist'
    });
    this.router.events.filter((event) => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects == "/historylist") {
        this.hidden = false;
        this.items = this.items.slice(0, 2)
      } else if (event.urlAfterRedirects == "/historylist/protocolhistory") {
        this.hidden = true;
        this.items.push({
          label: 'Protocol History',
          url: './historylist/protocolhistory'
        });
        this.items = this.items.slice(0, 3)
      }
    })

  }

  loadCarsLazy(event: LazyLoadEvent) {
    setTimeout(() => {
      if (this.historyResult) {
        this.list = this.historyResult.slice(event.first, (event.first + event.rows));
      }
    }, 250);
  }

  onRowSelect(event, dt) {
    this.hidden = true;
    console.log(event);
    this.router.navigate(['./historylist/protocolhistory']);
    this.transmitDataService.setProtocol(event.data);
    this.items.push({
      label: 'Protocol History',
      url: './historylist/protocolhistory'
    });
  }
}

