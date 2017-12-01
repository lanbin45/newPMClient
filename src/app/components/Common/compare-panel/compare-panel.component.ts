import {
  Component,
  OnInit,
  Input
} from '@angular/core';
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
  Router,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-compare-panel',
  templateUrl: './compare-panel.component.html',
  styleUrls: ['./compare-panel.component.css']
})
export class ComparePanelComponent implements OnInit {
  @Input() compareList: any;
  @Input() selectedProtocol: any;
  @Input() hiddenthirdColumn: boolean;
  isEP: boolean = false;
  isDeleted: boolean = false;
  compareData: Array < CompareList > ;
  showAllFlg: boolean = true;
  hidden: boolean = true;
  treeData: any = {};
  epnames: any;
  @Input() blockState: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private transmitDataService: TransmitDataService
  ) {}

  ngOnInit() {
    // console.log(this.hiddenthirdColumn && !this.isEP);
    // this.blockState = true;
  }

  ngOnChanges(change) {
    if (this.compareList) {
      this.epnames = this.compareList.rightprotocol
      this.treeData['allData'] = this.processData2Tree(this.compareList.list);
      this.compareData = this.treeData['allData'];
      let diffData = this.filterChange(this.compareList.changelist);
      this.treeData['diffData'] = this.processData2Tree(diffData);
    }
    if (this.selectedProtocol) {
      this.isEP = this.selectedProtocol.type == "ExamPlan" ? true : false;
      this.isDeleted = this.selectedProtocol.status == "DELETION_REQUESTED" ? true : false;
    }
  }

  onCollapseAllClick(event, treetable) {
    if (treetable.value) {
      let isExpanded = treetable.value[0].expanded;
      this.compareData.forEach(node => this.expandRecursive(node, !isExpanded))
    }
  }

  onShowDiffClick(event) {
    this.compareData = event.checked ? this.treeData["diffData"] : this.treeData["allData"];
  }

  onHeaderClick(event, treetable) {
    if (!this.hiddenthirdColumn) {
      this.hiddenthirdColumn = true;
    } else {
      this.hidden = true;
      this.transmitDataService.setProtocol(this.selectedProtocol);
      this.router.navigate(["./comparedetail"], {
        relativeTo: this.activatedRoute
      });
      // this.router.navigate(['./comparedetail']);
    }
  }

  private expandRecursive(node, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  private processData2Tree(dataArray: any) {
    let tree = [];
    var parseTreeJson = function (treeNodes) {
      if (!treeNodes || !treeNodes.length) return;

      for (var i = 0, len = treeNodes.length; i < len; i++) {
        treeNodes[i].expanded = true;
        treeNodes[i].data = {
          name: treeNodes[i].name,
          mastervalue: treeNodes[i].mastervalue,
          targetvalue: treeNodes[i].targetvalue
        }
        delete treeNodes[i].name;
        delete treeNodes[i].mastervalue;
        delete treeNodes[i].targetvalue;

        treeNodes[i].children = treeNodes[i].childlist;
        if (treeNodes[i].children && treeNodes[i].children.length > 0) {
          delete treeNodes[i].childlist;
          parseTreeJson(treeNodes[i].children);
        }
      }
    };
    parseTreeJson(dataArray);
    return dataArray;
  }

  private filterChange(initData: Array < object > ): Array < object > {
    // let formatData = [];
    if (initData == null) {
      return [];
    }
    for (var i = initData.length - 1; i >= 0; i--) {
      if (initData[i]["haschild"] == "true") {
        initData[i]["childlist"] = this.filterChildList(initData[i]["childlist"]);
        if (initData[i]["childlist"].length == 0 && initData[i]["targetvalue"] == initData[i]["mastervalue"]) {
          initData.splice(i, 1);
        }
      } else if (initData[i]["haschild"] == "false" && initData[i]["targetvalue"] == initData[i]["mastervalue"]) {
        initData.splice(i, 1);
      }
    }
    return initData;
  }

  private filterChildList(chilidlist: Array < object > ): Array < object > {
    if (chilidlist == null) {
      return [];
    }
    for (var i = chilidlist.length - 1; i >= 0; i--) {
      if (chilidlist[i]["haschild"] == "true") {
        chilidlist[i]["childlist"] = this.filterChildList(chilidlist[i]["childlist"]);
        if ((chilidlist[i]["childlist"] == null || chilidlist[i]["childlist"].length == 0) && chilidlist[i]["targetvalue"] == chilidlist[i]["mastervalue"]) {
          chilidlist.splice(i, 1);
        }
      } else if (chilidlist[i]["haschild"] == "false") {
        if (chilidlist[i]["targetvalue"] == chilidlist[i]["mastervalue"]) {
          chilidlist.splice(i, 1);
        }
      }
    }
    return chilidlist;
  }

}

