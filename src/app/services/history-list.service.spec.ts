import { TestBed, inject } from '@angular/core/testing';

import { HistoryListService } from './history-list.service';

describe('HistoryListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryListService]
    });
  });

  it('should be created', inject([HistoryListService], (service: HistoryListService) => {
    expect(service).toBeTruthy();
  }));
});
