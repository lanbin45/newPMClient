/**Angular core modules*/
import { 
  CommonModule 
} from '@angular/common';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  HttpModule
} from '@angular/http';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'
import {
  RouterModule
} from '@angular/router';
import { HttpClientModule,HttpClient } from '@angular/common/http';

/**PrimeNG modules*/
import {
  TabViewModule,
  ButtonModule,
  DataTableModule,
  SharedModule,
  DropdownModule,
  TooltipModule,
  TreeTableModule,
  TieredMenuModule,
  SplitButtonModule,
  MenuModule,
  PanelModule,
  ToggleButtonModule,
  CheckboxModule,
  BlockUIModule,
  DialogModule,
  InputTextareaModule,
  ToolbarModule,
  BreadcrumbModule,
  MenuItem,
  DragDropModule,
  StepsModule
} from 'primeng/primeng';

/**router,Services*/
import {
  appRoutes
} from './app.router';
import {
  RequestListService
} from './services/request-list.service';
import {
  GetInitSettingService
} from './services/get-init-setting.service';
import {
  TransmitDataService
} from './services/transmit-data.service';
import {
  HistoryListService
} from './services/history-list.service';
import {
  MasterMakerService
} from './services/master-maker.service';
/**components*/
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
  CompareTreeTableModule
} from './components/Common/treetable/comparetreetable.module';
import {
  ScanModeSelectComponent
} from './components/Request-List/scan-mode-select/scan-mode-select.component';
import {
  SingleScanModeCmpComponent
} from './components/Request-List/single-scan-mode-cmp/single-scan-mode-cmp.component';
import { 
  BlockedDivComponent 
} from './components/Common/blocked-div/blocked-div.component';
import { 
  ConfirmDialogComponent 
} from './components/Common/confirm-dialog/confirm-dialog.component';
import { 
  ComparePanelFooterComponent 
} from './components/request-list/compare-panel-footer/compare-panel-footer.component';
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
import { RequestConfirmDialogComponent } from './components/Dialog/request-confirm-dialog.component';
import { DataTableListModule } from './components/Common/datatable/datatablelist.module';
import { TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeepHtmlPipe } from './pipes/keep-html.pipe';

export function createTranslateHttpLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
    ComparedetailpanelComponent,
    ScanModeSelectComponent,
    SingleScanModeCmpComponent,
    BlockedDivComponent,
    ConfirmDialogComponent,
    ComparePanelFooterComponent,
    HistoryListComponent,
    MasterListComponent,
    ProtocolHistoryComponent,
    ComparePanelComponent,
    RequestConfirmDialogComponent,
    KeepHtmlPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    HttpModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    DropdownModule,
    BrowserAnimationsModule,
    TooltipModule,
    TieredMenuModule,
    TreeTableModule,
    CompareTreeTableModule,
    MenuModule,
    PanelModule,
    ToggleButtonModule,
    CheckboxModule,
    BlockUIModule,
    DialogModule,
    InputTextareaModule,
    ToolbarModule,
    BreadcrumbModule,
    DataTableListModule,
    DragDropModule,
    StepsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: (createTranslateHttpLoader),
              deps: [HttpClient]
          }
      })
  ],
  providers: [RequestListService, GetInitSettingService, TransmitDataService, HistoryListService, MasterMakerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
