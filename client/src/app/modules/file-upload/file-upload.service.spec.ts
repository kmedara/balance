import { TestBed } from '@angular/core/testing';

import { FileUploadService } from './file-upload.service';
import { describe, beforeEach, it, expect } from 'vitest';

describe('FileUploadService', () => {
  let service: FileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
