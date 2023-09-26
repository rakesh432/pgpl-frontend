import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  faBars,
  faBell,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() showMenu!: boolean;
  @Output() headerHeightChange = new EventEmitter<number>();

  logoutIcon = faRightFromBracket;
  notificationIcon = faBell;
  icons = {
    user: faUser,
    bar: faBars,
  };
}
