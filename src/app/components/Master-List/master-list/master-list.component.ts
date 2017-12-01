import { Component, OnInit } from '@angular/core';
import { MasterMakerService } from '../../../services/master-maker.service';
import { MenuItem } from 'primeng/primeng';
import { Router } from '@angular/router';

const WizardStrings = ['Start to create Protocol Master List',
  'Master List for Exam Plan',
  'Master List for <sup>SURE</sup>Exposure',
  'Master List for <sup>SURE</sup>IQ',
  'Master List for Contrast Preset',
  'Position Setting for Exam Plan',
  'Master List for Other Settings',
  'Please click <strong>[Approve]</strong> to start approving.'
]

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {
  originalList: any[];
  masterList: any[];
  scannername: string;
  draggedItemLeft: Array<any>;
  draggedItemRight: Array<any>;
  loadingLeft: boolean = false;
  loadingRight: boolean = false;
  highlightLeft: boolean = false;
  highlightRight: boolean = false;
  items: MenuItem[];
  activeIndex: number = 0;
  masterListCreationIndex: number = 0;
  displaySpan: string;
  blocked: boolean;
  selectedMasterList: any[];

  constructor(private masterListService: MasterMakerService,
    private router: Router) { }

  ngOnInit() {
    this.items = [{
      label: 'Start',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    }, {
      label: 'Master List Creation',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    }, {
      label: 'Position Setting',
      command: (event: any) => {
        this.activeIndex = 2;
      }
    }, {
      label: 'Selet Other Settings',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    }, {
      label: 'Approving',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    }, {
      label: 'finish',
      command: (event: any) => {
        this.activeIndex = 5;
      }
    }];
    this.displaySpan = 'Start to create Protocol Master List';
    this.draggedItemLeft = [];
    this.draggedItemRight = [];
    this.loadingLeft = true;
    this.masterListService.getMasterListOriginalList({ scannerGroup: 'CTRoom', protocolType: 'ExamPlan', masterList: '' })
      .subscribe((response) => {
        this.originalList = response.originallist.slice(0, 20);
        this.masterList = [];
        this.scannername = response.scannerlist[0];
        this.loadingLeft = false;
      })
  }

  dragStart(event, oriList, isLeft: boolean) {
    if (isLeft) {
      this.highlightLeft = true;
      if (this.draggedItemRight.length === 0) {
        this.draggedItemRight.push(oriList);
      }
    } else {
      this.highlightRight = true;
      if (this.draggedItemLeft.length === 0) {
        this.draggedItemLeft.push(oriList);
      }
    }
  }

  drop(event, isLeft: boolean) {
    if (this.draggedItemLeft || this.draggedItemRight) {
      this.highlightLeft = null;
      this.highlightRight = null;
      let draggedCarIndex = -1;
      if (isLeft) {
        this.loadingRight = true;
        this.masterList.push(...this.draggedItemLeft);
        // console.log(this.masterList)
        this.draggedItemLeft.every((value, index) => {
          draggedCarIndex = this.findIndex(value, this.originalList);
          this.originalList = this.originalList.filter((val, i) => i !== draggedCarIndex);
          return true;
        });
        this.loadingRight = false;
        this.draggedItemLeft = [];
      } else {
        this.loadingLeft = true;
        this.originalList.push(...this.draggedItemRight);
        this.draggedItemRight.map((value, index) => {
          draggedCarIndex = this.findIndex(value, this.masterList);
          this.masterList = this.masterList.filter((val, i) => i !== draggedCarIndex)
        });
        this.loadingLeft = false;
        this.draggedItemRight = [];
      }
    }
    this.highlightLeft = null;
    this.highlightRight = null;
  }

  dragEnd(event, isLeft: boolean) {
    if (isLeft) {
      this.draggedItemLeft = [];
    } else {
      this.draggedItemRight = [];
    }
    this.highlightLeft = null;
    this.highlightRight = null;
  }

  dragLeave($event) {
    this.highlightLeft = null;
    this.highlightRight = null;
  }

  dragEnter($event, isLeft) {
    if (isLeft) {
      this.highlightLeft = true;
    } else {
      this.highlightRight = true;
    }
  }

  onchangeLeft($event, row) {
    if ($event) {
      this.draggedItemLeft.push(row);
    } else {
      let selectIndex = this.findIndex(row, this.draggedItemLeft);
      this.draggedItemLeft = this.draggedItemLeft.filter((val, i) => i !== selectIndex);
    }
  }

  onchangeRight($event, row) {
    if ($event) {
      this.draggedItemRight.push(row);
    } else {
      let selectIndex = this.findIndex(row, this.draggedItemRight);
      this.draggedItemRight = this.draggedItemRight.filter((val, i) => i !== selectIndex);
    }
  }

  findIndex(item, targetList: Array<any>) {
    let index = -1;
    for (let i = 0; i < targetList.length; i++) {
      if (item.detail[0].key === targetList[i].detail[0].key) {
        index = i;
        break;
      }
    }
    return index;
  }

  onNextClick() {
    this.blocked = true;
    if (this.activeIndex !== 1 || (this.activeIndex === 1 && this.masterListCreationIndex === 3)) {
      this.activeIndex = this.activeIndex + 1;
      this.displaySpan = WizardStrings[this.activeIndex + this.activeIndex]
    } else {
      this.masterListCreationIndex = this.masterListCreationIndex + 1;
    }
    this.applyWizardString();
    this.blocked = false;
  }

  onPreClick() {
    this.blocked = true;
    if (this.activeIndex !== 1 || (this.activeIndex === 1 && this.masterListCreationIndex === 0)) {
      this.activeIndex = this.activeIndex - 1;
    } else {
      this.masterListCreationIndex =  this.masterListCreationIndex - 1
    }
    this.applyWizardString();
    this.blocked = false;
  }

  onReject() {
    this.router.navigate(['./requestlist']);
  }

  applyWizardString() {
    if (this.activeIndex > 1) {
      this.displaySpan = WizardStrings[this.activeIndex + 3];
    } else {
      this.displaySpan = WizardStrings[this.activeIndex + this.masterListCreationIndex];
    }
  }
}
