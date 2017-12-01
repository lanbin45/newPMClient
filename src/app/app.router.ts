import {
  Router,
  RouterModule
} from '@angular/router';

import {
  AppComponent
} from './app.component';
import {
  RequestListComponent
} from './components/Request-List/request-list/request-list.component';
import {
  ComparedetailpanelComponent
} from './components/Request-List/compare-detail/compare-detail-panel.component';
import {
  HistoryListComponent
} from './components/History-List/history-list/history-list.component';
import {
  MasterListComponent
} from './components/Master-List/master-list/master-list.component';
import {
  ProtocolHistoryComponent
} from './components/History-List/protocol-history/protocol-history.component';
import {
  ComparePanelComponent
} from './components/Common/compare-panel/compare-panel.component';

export const appRoutes = [{
  path: 'requestlist',
  component: RequestListComponent,
  children: [
    {
      path:'comparedetail',
      component: ComparedetailpanelComponent}
  ]  
},{
  path: 'historylist',
  component: HistoryListComponent,
  children: [
    {
      path:'protocolhistory',
      component: ProtocolHistoryComponent,
      children:[
        {
          path:'comparedetail',
          component: ComparedetailpanelComponent
        }
      ]
    }
  ]
},{
  path: 'masterlist',
  component: MasterListComponent
},{ 
  path: '',
  component: AppComponent,  
  pathMatch: 'full' 
}, {
  path: '**',
  component: AppComponent
}];
