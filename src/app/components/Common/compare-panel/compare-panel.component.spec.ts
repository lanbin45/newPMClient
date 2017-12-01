import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparePanelComponent } from './compare-panel.component';

describe('ComparePanelComponent', () => {
  let component: ComparePanelComponent;
  let fixture: ComponentFixture<ComparePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
