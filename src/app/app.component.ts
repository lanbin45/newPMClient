import {
  Component
} from '@angular/core';
import {
  Router
} from '@angular/router';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items: any;
  constructor(private router:Router,public translateService: TranslateService){}
  ngOnInit() {
    this.getDevicesInfo();
  // --- set i18n begin ---
    this.translateService.addLangs(["zh", "en"]);
    this.translateService.setDefaultLang("en");
    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use('zh');

    // --- set i18n end ---
    this.router.navigate(['./requestlist']);
    this.items = [{
        label: 'File',
        items: [{
            label: 'New',
            icon: 'fa-plus'
          },
          {
            label: 'Open',
            icon: 'fa-download'
          }
        ]
      },
      {
        label: 'Edit',
        items: [{
            label: 'Undo',
            icon: 'fa-refresh'
          },
          {
            label: 'Redo',
            icon: 'fa-repeat'
          }
        ]
      }
    ];
  }

  handleChange(e){
    let index=e.index;
    switch(index){
      case 0:
        this.router.navigate(['/requestlist']);
        break;
      case 1:
        this.router.navigate(['/historylist']);
        break;
      case 2:
        this.router.navigate(['/masterlist']);
        break;
    }
  }

  getDevicesInfo(){
    window['deviceInfo']='';
    let ua=navigator.userAgent;
    let isWindowsPhone = /(?:Windows Phone)/.test(ua);
    let isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
    let isAndroid = /(?:Android)/.test(ua);
    let isFireFox = /(?:Firefox)/.test(ua);
    let isChrome = /(?:Chrome|CriOS)/.test(ua);
    let isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
    let isPhone = /(?:iPhone)/.test(ua) && !isTablet;
    let isPc = !isPhone && !isAndroid && !isSymbian && !isTablet;
    if(isPc){
      window['deviceInfo']='isPc';
    }else if(isTablet){
      window['deviceInfo']='isTablet';
    }else{
      window['deviceInfo']='isPhone';
    }
  }
}

