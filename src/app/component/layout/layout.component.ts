import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  headerOffset = '68px';
  onHeaderHeightChange(height: number) {
    this.headerOffset = `${height}px`;
  }
}
