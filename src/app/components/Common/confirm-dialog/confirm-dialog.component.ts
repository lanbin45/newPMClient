import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() display:boolean;
  // headerContents:string="TEST HEADER";
  @Input() confirmMsg:string;
  comments: string;


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes){
    if(this.display){
      console.log('---------test--------')
    }
  }

  onCancelButton() {
    this.display = false;
  }

  onOKButton() {
    this.display = false;
  }

}
