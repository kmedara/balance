import { TestBed } from '@angular/core/testing';
import { ModalOutcome } from '@__types/events';
import {
  ApplicationRef,
  Component,
  EnvironmentInjector,
  createComponent,
  Type,
} from '@angular/core';
import { ModalService } from './modal.service';
import { ModalShell } from '@modals/modal-shell/modal-shell';
import { describe, it, expect, vi, beforeEach } from 'vitest';

/* ------------------ Test doubles ------------------ */
@Component({ standalone: true, template: '' })
class DummyContentComponent {}

@Component({ standalone: true, template: '' })
class FakeModalShell {}

function setup() {
  const attachViewCalls: unknown[] = [];

  const appRefStub: Partial<ApplicationRef> = {
    attachView(view: unknown) {
      attachViewCalls.push(view);
    },
  };

  TestBed.configureTestingModule({
    providers: [ModalService, { provide: ApplicationRef, useValue: appRefStub }],
  });

  return {
    service: TestBed.inject(ModalService),
    attachViewCalls,
  };
}

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should create modal, attach view, and emit event', async () => {
    const { service, attachViewCalls } = setup();
    crypto.randomUUID = () => '1-2-3-4-5-6-7-8';

    (service as any).loadShell = async () => ({ ModalShell: FakeModalShell });
    // stub createComponent
    const originalCreateComponent = createComponent;
    let createComponentCalled = false;
    (global as any).createComponent = (...args: any[]) => {
      createComponentCalled = true;
      return {
        hostView: {},
        location: {
          nativeElement: document.createElement('div'),
        },
      };
    };

    const id = await service.open(DummyContentComponent);
    expect(id).toBe('modal-id-123');
    expect(createComponentCalled).toBe(true);
    expect(attachViewCalls.length).toBe(1);
    expect(document.body.children.length).toBe(1);
  });
});
