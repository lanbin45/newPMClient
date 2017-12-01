import { Component, OnInit, Input } from '@angular/core';

import {
    RequestListService
} from './../../../services/request-list.service';

@Component({
  selector: 'app-compare-panel-footer',
  templateUrl: './compare-panel-footer.component.html',
  styleUrls: ['./compare-panel-footer.component.css']
})
export class ComparePanelFooterComponent implements OnInit {

    @Input() isEP: boolean;
    @Input() isDelete: boolean;
    @Input() selectedProtocol: any;


    constructor(private requestListService: RequestListService) {
    }

    displayLabel: string;
    buttonClass: string;
    icon: string;
    confirmMsg: string;
    display: boolean = false;
    count: number;
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

    protocol_type =
        {
            ExamPlan: "ExamPlan",
            SureIQ: "<sup>SURE</sup>IQ",
            SureExposure: "<sup>SURE</sup>Exposure",
            ContrastPreset: "ContrastPreset",
            VoicePreset: "VoicePreset"
        };
    ProtocolAction = {
        approve: "APPROVE",
        keepLocally: "KEEP_LOCALLY",
        reject: "REJECT",
        deleteProtocl: "DELETE",
        keep: "KEEP",
        rejectApproval: "REJECT_APPROVAL",
        rejectDeletion: "REJECT_DELETION"
    };
    event: any;

    ngOnInit() {
        this.display = false;
    }

    ngOnChanges() {
        if (this.isDelete) {
            this.displayLabel = "Delete";
            this.buttonClass = "ui-button-danger ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left";
            this.icon = "fa fa-trash-o fa-lg";
        } else {
            if (this.isEP) {
                this.displayLabel = "Keep Locally";
                this.buttonClass = "ui-button-success ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left";
                this.icon = "fa fa-check fa-lg";
            } else {
                this.displayLabel = "Approve";
                this.buttonClass = "ui-button-primary ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-left";
                this.icon = "fa fa-check-circle fa-lg";
            }
        }
    }

    onReject() {
        if (this.isDelete) {
            this.event = this.ProtocolAction.rejectDeletion;
        } else {
            this.event = this.ProtocolAction.rejectApproval;
        }
        this.display = true;
        if (this.isDelete) {
            this.confirmMsg = this.comments.text.rejectDeletion;
        } else {
            this.confirmMsg = this.comments.text.rejectApproval;
        }
    }

    onApprove() {
        this.event = this.ProtocolAction.approve;
        this.display = true;
        this.confirmMsg = this.comments.text.approve;
    }

    onClick() {
        if (this.isDelete) {
            this.event = this.ProtocolAction.deleteProtocl;
            this.confirmMsg = this.comments.text.deleteProtocl;
        } else {
            if (this.isEP) {
                this.event = this.ProtocolAction.keep;
                this.confirmMsg = this.comments.text.keep;
            } else {
                this.event = this.ProtocolAction.approve;
                this.confirmMsg = this.comments.text.approve;
            }
        }
        this.display = true;

    }

    onOK(result) {
        this.display = false;
        var params = {};

        if (this.event == this.ProtocolAction.approve) {
            var transferReasonValue = result.transferCommentText;
            var transferReason = '';

            var systemComments = this.comments.text.reason;
            var scanlist = [];
            for (var i = 0; i < result.scannerlist.length; i++) {
                scanlist.push(result.scannerlist[i].key);
            }
            scanlist.sort(function (a, b) {
                return a.localeCompare(b);
            });
            for (var i = 0, len = scanlist.length; i < len; i++) {
                systemComments = systemComments + scanlist[i];
                if (i < len - 1) {
                    systemComments = systemComments + ', '
                } else {
                    systemComments = systemComments + '.'
                }
            }
            transferReason = /*systemComments + '\n' +*/ transferReasonValue;

            var autoApproval = this.comments.text.autoApproval;
            autoApproval = autoApproval.replace('{1}', this.convertSupFont(this.selectedProtocol['type']));

            var autoReason = this.comments.text.autoApprovalReason;
            autoReason = autoReason.replace('{1}', this.convertSupFont(this.selectedProtocol['type']));
            params = {
                event: this.event,
                epNumber: this.selectedProtocol['epno'],
                protocolName: this.selectedProtocol['protocolname'],
                uid: this.selectedProtocol['uid'],
                version: this.selectedProtocol['version'],
                machineName: this.selectedProtocol['machinename'],
                protocolStatus: this.selectedProtocol['status'],
                pt: this.selectedProtocol['type'],
                organ: this.selectedProtocol['organ'],
                patienttype: this.selectedProtocol['patienttype'],
                reason: result.comments,
                settinggroup: JSON.stringify(scanlist),
                /*checkedRPIDsJsonStr: checkedRPIDsJsonStr,*/
                auto_approval_reason: autoApproval,
                auto_reason: autoReason,
                auto_transfer_reason: systemComments,
                transfer_reason: transferReason
            };
        } else if (this.event == this.ProtocolAction.keep) {
            var autoApproval = this.comments.text.autoApproval;
            autoApproval = autoApproval.replace('{1}', this.convertSupFont(this.selectedProtocol['type']));
            params = {
                event: this.event,
                epNumber: this.selectedProtocol['epno'],
                protocolName: this.selectedProtocol['protocolname'],
                uid: this.selectedProtocol['uid'],
                version: this.selectedProtocol['version'],
                machineName: this.selectedProtocol['machinename'],
                protocolStatus: this.selectedProtocol['status'],
                pt: this.selectedProtocol['type'],
                organ: this.selectedProtocol['organ'],
                patienttype: this.selectedProtocol['patienttype'],
                reason: result.comments,
                auto_approval_reason: autoApproval
            };
        } else if (this.event == this.ProtocolAction.rejectApproval || this.event == this.ProtocolAction.rejectDeletion) {
            var autoReject = this.comments.text.autoReject;
            autoReject = autoReject.replace('{1}', this.convertSupFont(this.selectedProtocol['type']));

            var autoReason = this.comments.text.autoRejectReason;
            autoReason = autoReason.replace('{1}', this.convertSupFont(this.selectedProtocol['type']));
            params = {
                event: this.event,
                epNumber: this.selectedProtocol['epno'],
                protocolName: this.selectedProtocol['protocolname'],
                uid: this.selectedProtocol['uid'],
                version: this.selectedProtocol['version'],
                machineName: this.selectedProtocol['machinename'],
                protocolStatus: this.selectedProtocol['status'],
                pt: this.selectedProtocol['type'],
                organ: this.selectedProtocol['organ'],
                patienttype: this.selectedProtocol['patienttype'],
                reason: result.comments,
                auto_reason: autoReason,
                auto_approval_reason: autoReject
            };
        } else if (this.event == this.ProtocolAction.deleteProtocl) {
            params = {
                event: this.event,
                epNumber: this.selectedProtocol['epno'],
                protocolName: this.selectedProtocol['protocolname'],
                uid: this.selectedProtocol['uid'],
                version: this.selectedProtocol['version'],
                machineName: this.selectedProtocol['machinename'],
                protocolStatus: this.selectedProtocol['status'],
                pt: this.selectedProtocol['type'],
                organ: this.selectedProtocol['organ'],
                patienttype: this.selectedProtocol['patienttype'],
                reason: result.comments
            };
        }
        console.log(params);
        this.requestListService.requestAction(
            params
        ).then(
            list => {
                console.log(list);
            }
        );

    }

    onCancel(event) {
        this.display = false;
    }

    convertSupFont(type) {
        if (type == "SureIQ") {
            return this.protocol_type.SureIQ;
        }
        else if (type == "SureExposure") {
            return this.protocol_type.SureExposure;
        }
        else if (type == "ExamPlan") {
            return this.protocol_type.ExamPlan;
        }
        else if (type == "ContrastPreset") {
            return this.protocol_type.ContrastPreset;
        }
        else if (type == "VoicePreset") {
            return this.protocol_type.VoicePreset;
        }
        else {
            return type;
        }
    };
}
