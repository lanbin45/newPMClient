import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  RequestListService
} from './../../../services/request-list.service';

@Component({
  selector: 'app-comparedetailpanel',
  templateUrl: './comparedetailpanel.component.html',
  styleUrls: ['./comparedetailpanel.component.css']
})
export class ComparedetailpanelComponent implements OnInit {
  @Input() selectedProtocol: any;
  @Input() otherProtocols: any;
  @Input() states: boolean;
  
  //image names
  organImages: string[] = [
    "body_all_on.png",
    "body_part_on.png",
    "body_part01_on.png",
    "body_part02_on.png",
    "body_part03_on.png",
    "body_part04_on.png",
    "body_part05_on.png",
    "body_part06_on.png",
    "body_part07_on.png"
  ];

  organArray: string[] = [
    "All",
    "Chest To Pelvi",
    "Head",
    "Neck",
    "Chest",
    "Abdomen",
    "Pelvis",
    "Leg",
    "Other"
  ];

  //--adult organ locations
  AdultOrganLocations: string[] = [
    '36,13,77,91',
    '33,100,81,185',
    '134,10,204,52',
    '134,57,204,76',
    '134,81,204,120',
    '134,123,204,162',
    '134,165,204,204',
    '134,207,204,350',
    '206,74,247,249'
  ];

  //--child organ locations
  ChildOrganLocations: string[] = [
    '30,28,63,91',
    '29,106,67,173',
    '138,70,211,125',
    '138,126,211,140',
    '138,142,211,175',
    '138,176,211,207',
    '138,208,211,233',
    '138,234,211,311',
    '212,141,252,225'
  ];

  organimagpath: string;
  patientType: string = "adult";
  imgName: string = "";
  organName: string = "";
  header: object;
  parameterList: any;
  scanModeList: any;
  parameterDisplayFlag: boolean = false;
  displayLabel: string = "Detail";
  blockParameterState: boolean =false;

  constructor(private requestListService: RequestListService) {}

  ngOnInit() {
    this.imgName = this.organImages[0];
    this.organName = this.organArray[0];
    this.organimagpath = "assets/resources/images/organImgs/" + this.patientType + "/" + this.imgName;
    this.header = {
      patienttype: 'Patient Type',
      protocolname: 'Name',
      version: 'Version',
      lastupddt: 'Date',
    }
  }
  ngOnChanges(){
    if(this.states){
      this.organName = this.selectedProtocol.organ;
      this.patientType = this.selectedProtocol.patienttype.toLowerCase();
      this.imgName = this.organImages[this.organArray.indexOf(this.organName)];
      this.organimagpath = "assets/resources/images/organImgs/" + this.patientType + "/" + this.imgName;
      this.getParameterList();
    }
  }
  ngOnDestroy(){
    this.otherProtocols = null;
  }
  onImgClick(event) {
    let positions = (this.patientType === "child") ? this.ChildOrganLocations : this.AdultOrganLocations;
    positions.every((position: string, index: number, _array) => {
      let picPosition = position.split(',');
      if (event.offsetX >= picPosition[0] && event.offsetY >= picPosition[1] && event.offsetX <= picPosition[2] && event.offsetY <= picPosition[3]) {
        this.imgName = this.organImages[index];
        this.organName = this.organArray[index];
        this.organimagpath = "assets/resources/images/organImgs/" + this.patientType + "/" + this.imgName;
        return false;
      } else {
        return true;
      }
    });
    this.getParameterList();
  }

  private getParameterList(){
    this.blockParameterState = true;
    this.requestListService.getOtherProtocols({
        filepath:this.selectedProtocol['filepath'],
        uid:this.selectedProtocol['uid'],
        epno:this.selectedProtocol['epno'],
        proname:this.selectedProtocol['protocolname'],
        version:this.selectedProtocol['version'],
        status:this.selectedProtocol['status'],
        protype:this.selectedProtocol['type'],
        patienttype:this.selectedProtocol['patienttype'],
        protocolorgan:this.selectedProtocol['organ'],
        organtype:this.organName,
        rightstatus:this.selectedProtocol['rightprotocol']['status'],
        // eventFlag:'left',
        protocoleptype:this.selectedProtocol['protocoleptype']
      }).then(otherProtocols => {
        this.blockParameterState = false;
        if(this.selectedProtocol['organ'] == this.organName){
          this.otherProtocols = otherProtocols;
          this.requestListService.getParameterList({
            uid:this.selectedProtocol['uid'],
            epno:this.selectedProtocol['epno'],
            proname:this.selectedProtocol['protocolname'],
            version:this.selectedProtocol['version'],
            status:this.selectedProtocol['status'],
            // protype:this.selectedProtocol['type'],
            patienttype:this.selectedProtocol['patienttype'],
            protocolorgan:this.selectedProtocol['organ']
          }).then(parameterList => {
            console.log(parameterList);
            if(!parameterList.result.errorcode){
              this.parameterList = this.processData2Tree(parameterList.result.result);
            }            
          })
        } else {
          this.parameterList = null;
        }        
      })
  }

  handleChange(event) {
    this.parameterDisplayFlag = event.checked;
    this.displayLabel = event.checked ? 'Select Compared Scan Mode' : 'Detail';
    if (event.checked) {
      this.requestListService.getScanMode({
        leftfilepath:this.selectedProtocol['filepath'],
        rightfilepath:this.selectedProtocol['filepath']
      }).then(scanModeList => {
        this.scanModeList = scanModeList;
      });
    }
  }

  private processData2Tree(dataArray: any){
    let treeNode = [];
    dataArray.forEach((data,index) => {
      let formatData = {};
      switch(data.paramtype){
        case 'ScanList':
          formatData = this.parseScanList(data);
          break;
        case 'SureIQList':
          formatData = this.parseSureList(data, true);
          break;
        case 'SureExposureList':
          formatData = this.parseSureList(data, false);
          break;
        case 'ContrastPresetList':
          formatData = this.parseContrastPresetList(data);
          break;
        case 'VoicePresetList':
          formatData = this.parseVoicePresetList(data);
          break;
        default:
          formatData = this.parseDefaultList(data);
          break;
      }
      treeNode.push(formatData);      
    })
    return treeNode;
  }

  private parseScanList(data){
    let formatData = {
      expanded: true,
      data: {
        display: data.displaytype,
        value: ''
      },
      children: []
    };
    if(data.paramlist){
    data.paramlist.forEach((param, index) => {
        formatData.children[index] = {
          expanded: true,
          data: {
            display: param.name,
            value: ''
          },
          children:[{
            expanded: true,
            data: {
              display: param.scanParameter.display,
              value: ''
            },
          }]
        };
        if(param.scanParameter.scanParameterList){
          param.scanParameter.scanParameterList.forEach((scanParam,i) => {
            formatData.children[index].children[i] = {
              expanded: true,
              data:{
                display: scanParam.display,
                value: scanParam.value
              }
            }
          })
        }
      })
    }
    return formatData;
  }

  private parseSureList(data, isSureIQ){
    let formatData = {
      expanded: true,
      data: {
        display: data.displaytype,
        value: ''
      },
      children: []
    };
    if(data.paramlist){
      let organArray = [];
      let indexOfOrgan = 0;
      data.paramlist.forEach((param, index) => {
        if(organArray.indexOf(param.organ) < 0){ 
          organArray.push(param.organ);
          indexOfOrgan = organArray.length-1;
          
          let displayName =isSureIQ ? param.organ : param.patientType+'_'+param.organ;
          
          formatData.children[organArray.length-1] = {
            expanded: true,
            data: {
              display: displayName,
              value: ''
            },
            children: [{
              expanded : true,
              data: {
                display: param.name,
                value: ''
              },
              children:[]
            }]
          }
        } else {
          indexOfOrgan = organArray.indexOf(param.organ);
          formatData.children[indexOfOrgan].children.push({
            expanded : true,
            data: {
              display: param.name,
              value: ''
            },
            children:[]
          })
        }
        if(param.parameterList){
          param.parameterList.forEach((p,i) => {
            formatData.children[indexOfOrgan].children[formatData.children[indexOfOrgan].children.length-1].children.push({
              expanded : true,
              data: {
                display: p.display,
                value: p.value
              }
            })
          })
        }           
      })    
    }
    return formatData;
  }

  private parseContrastPresetList(data){
    let formatData = {
      expanded: true,
      data: {
        display: data.displaytype,
        value: ''
      },
      children: []
    };
    if(data.paramlist){
    data.paramlist.forEach((param, index) => {
        formatData.children[index] = {
          expanded: true,
          data: {
            display: param.patientType + '_' + param.name,
            value: ''
          },
          children:[]
        };
        if(param.parameters){
          param.parameters.forEach((scanParam,i) => {
            formatData.children[index].children[i] = {
              expanded: true,
              data:{
                display: scanParam.groupDisplay,
                value: scanParam.groupValue
              },
              children:[]
            };
            if(scanParam.parameters){
              scanParam.parameters.forEach((p,k) => {
                formatData.children[index].children[i].children[k] = {
                  expanded: true,
                  data:{
                    display: p.display,
                    value: p.value
                  }
                }
              })
            }
          })
        }
      })
    }
    return formatData;
  }
  private parseVoicePresetList(data){
    let formatData = {
      expanded: true,
      data: {
        display: data.displaytype,
        value: ''
      },
      children: []
    };
    if(data.paramlist){
      let lanArray = [];
      let indexOfOrgan = 0;
      data.paramlist.forEach((param, index) => {
        if(lanArray.indexOf(param.language) < 0){ 
          lanArray.push(param.language);
          indexOfOrgan = lanArray.length-1;

          formatData.children[lanArray.length-1] = {
            expanded: true,
            data: {
              display: param.language,
              value: ''
            },
            children: [{
              expanded : true,
              data: {
                display: param.name,
                value: ''
              },
              children:[]
            }]
          }
        } else {
          indexOfOrgan = lanArray.indexOf(param.language);
          formatData.children[indexOfOrgan].children.push({
            expanded : true,
            data: {
              display: param.name,
              value: ''
            },
            children:[]
          })
        }
        if(param.parameterList){
          param.parameterList.forEach((p,i) => {
            formatData.children[indexOfOrgan].children[formatData.children[indexOfOrgan].children.length-1].children.push({
              expanded : true,
              data: {
                display: p.display,
                value: p.value
              }
            })
          })
        }           
      })
    }
    return formatData;
  }

  private parseDefaultList(data){
    let formatData = {
      expanded: true,
      data: {
        display: data.displaytype,
        value: ''
      },
      children: []
    };
    if(data.paramlist){
      data.paramlist.forEach((param,index) => {
        if(param.parameters){
          // formatData.children[index] = {children:[]};
          param.parameters.forEach((p,i) => {
            formatData.children[i]=({
              expanded: true,
              data: {
                display: p.display,
                value: p.value
              }
            })
          })
        }        
      })
    }
    return formatData;
  }
}

