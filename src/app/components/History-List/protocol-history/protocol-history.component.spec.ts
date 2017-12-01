import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolHistoryComponent } from './protocol-history.component';

describe('ProtocolHistoryComponent', () => {
  let component: ProtocolHistoryComponent;
  let fixture: ComponentFixture<ProtocolHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
