import { Component } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Entity } from 'src/app/interface/company';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private userService: UserService) {}
  warehouses: Entity[] = [];
  user = this.userService.getUser();

  tempSelectedWarehouses: { id: number; name: string }[] = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 2,
    allowSearchFilter: true,
  };

  onSearch(data: {
    searchStr?: string;
    filter?: any;
    isLoader?: boolean;
    action?: 'download' | 'email';
    page?: number;
  }) {
    // if (
    //   !this.user?.permissions.includes('ISSUE_GATEPASS') &&
    //   !this.user?.permissions.includes('APPROVE_GATEPASS')
    // ) {
    //   this.filter.pass_type = this.filter.pass_type?.filter(
    //     (pt) => pt !== 'VISITOR'
    //   );
    // }
  }
}
