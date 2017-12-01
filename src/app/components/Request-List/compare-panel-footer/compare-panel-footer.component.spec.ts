import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePanelFooterComponent } from './compare-panel-footer.component';

describe('ComparePanelFooterComponent', () => {
  let component: ComparePanelFooterComponent;
  let fixture: ComponentFixture<ComparePanelFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparePanelFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparePanelFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
