import { Overlay, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

const POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
];

@Directive({
  selector: '[appRichTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()',
    '(focus)': 'show()',
    '(blur)': 'hide()',
  },
})
export class RichTooltipDirective implements OnDestroy {
  private readonly overlay = inject(Overlay);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly appRichTooltip = input<TemplateRef<unknown> | null>(null);
  readonly appRichTooltipClass = input<string | readonly string[]>('');

  private overlayRef: OverlayRef | null = null;

  show(): void {
    const content = this.appRichTooltip();
    if (!content || this.overlayRef?.hasAttached()) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(false)
      .withPush(true)
      .withPositions(POSITIONS);

    const extraClasses = this.appRichTooltipClass();
    const panelClass = [
      'rich-tooltip-panel',
      ...(Array.isArray(extraClasses)
        ? extraClasses
        : (extraClasses as string).split(/\s+/).filter(Boolean)),
    ];

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      panelClass,
    });

    this.overlayRef.attach(new TemplatePortal(content, this.viewContainerRef));
  }

  hide(): void {
    this.overlayRef?.detach();
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
}
