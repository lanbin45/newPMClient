import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedDivComponent } from './blocked-div.component';

describe('BlockedDivComponent', () => {
  let component: BlockedDivComponent;
  let fixture: ComponentFixture<BlockedDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
