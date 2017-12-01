import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {
    RequestListService
} from './../../services/request-list.service';

@Component({
    selector: 'request-confirm-dialog',
    templateUrl: './request-confirm-dialog.component.html',
    styleUrls: ['./request-confirm-dialog.component.css']
})
export class RequestConfirmDialogComponent implements OnInit {
    comments = {
        title_confirm: "Confirm",
        text: {
            approve: "This protocol will be approved for distribution to all scanners. ",
            deleteProtocl: "This protocol will be deleted and removed from all scanners.",
            rejectApproval: "This protocol will be rejected and the changes will be removed from the source scanner.",
            rejectDeletion: "This protocol deletion request will be rejected and restored to the source scanner.",
            keep: "This protocol will be approved for local use on the source scanner. ",
            asker: "Do you want to continue?",
            transfer: "This protocol will be transferred to other groups.",
            systemComment: "[System Generated Comment]",
            reason: "Transfer request for protocol has been sent to ",
            autoApproval: "Auto-Approval due to the approval of {1}.",
            autoReject: "Auto-Reject due to the reject of {1}.",
            autoApprovalReason: "Auto-Approval together with {1} with same Organ.",
            autoRejectReason: "Auto-Reject together with {1} with same Organ."
        },
        label: {
            comments: "Comments",
            reminder: "Please input comments.",
            transferlable: "Transfer Destinations",
            approveTransferlable: "This protocol will be transferred to other groups.<br>Please select the groups you wish to transfer this protocol to:",
            models: "Models",
            radlex: "Radlex RPID",
            group: 'Group',
            model: 'Model',
            softwarVersion: 'Software Version'
        },
        button: {
            ok: "OK",
            cancel: "Cancel",
            transferOption: "Transfer protocol to other groups (Option)"
        }
    };
    @Input() display: boolean;
    // headerContents:string="TEST HEADER";
    @Input() confirmMsg: string;
    @Input() hasTransfer: boolean;

    commentText: string;
    transferCommentText: string;
    @Output() onOK: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<any> = new EventEmitter<any>();
    value:any;
    positionTop:100;
    isCollapse = true;
    constructor(private requestListService: RequestListService) {
    }

    ngOnInit() {
        this.requestListService.getTransferList().then(list => {
            this.value = list.result;
            for(var i=0;i<this.value.length;i++){
                this.value[i].isChecked = false;
            }
        });

    }

    ngOnChanges(changes) {
        if(!this.display) {
            this.commentText = '';
            this.isCollapse = true;
            this.requestListService.getTransferList().then(list => {
                this.value = list.result;
                for (var i = 0; i < this.value.length; i++) {
                    this.value[i].isChecked = false;
                }
            });
        }
    }

    onCancelButton() {
        /*console.log(this.hasTransfer);
        console.log(this.value);
        console.log(this.commentText);*/
        if(this.onCancel.observers.length > 0){
            var result = {
                display: false
            }
            this.onCancel.emit(result);
        }
        this.display = false;
    }

    onOKButton() {
        console.log(this.value);
        /*var params = {
            'protocolList': '',
            'settingGroup': '',
            'auto_transfer_reason': '',
            'reason': '',
            'type': '',
            'protocolName': ''
        };
        for (var i = 0; i < this.value.length; i++) {

        }
        this.requestListService.transferProtocol(params).then(

        );*/
        var scannerlist = [];
        for (var i = 0; i < this.value.length; i++) {
            console.log(this.value[i].isChecked);
            if(this.value[i].isChecked){
                scannerlist.push(this.value[i])
            }
        }
        if (this.onOK.observers.length > 0) {
            var result = {
                comments: this.commentText,
                display: this.display,
                scannerlist:scannerlist,
                transferCommentText:this.transferCommentText
            }
            this.onOK.emit(result);
        }
        this.display = false;
    }

    onTransferClick(dialog) {
        if (this.isCollapse) {
            this.positionTop = dialog.el.nativeElement.offsetTop;
            var top = (window.innerHeight - 765) / 2;
            dialog.el.nativeElement.firstElementChild.style.top = top + 'px';
        } else {
            dialog.el.nativeElement.firstElementChild.style.top = (this.positionTop / 2) + 'px';
        }

        this.isCollapse = !this.isCollapse;
    }
    onChecked(it){
        it.isChecked = !it.isChecked;
    }

}
