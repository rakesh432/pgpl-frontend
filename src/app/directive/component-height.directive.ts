import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appComponentHeight]',
})
export class ComponentHeightDirective {
  @Output() heightChange = new EventEmitter<number>();

  constructor(private elemRef: ElementRef<HTMLElement>) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.heightChange.emit(this.elemRef.nativeElement.clientHeight);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.heightChange.emit(this.elemRef.nativeElement.clientHeight);
    }, 500);
  }
}
