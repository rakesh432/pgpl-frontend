import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  loaderWithName: any[] = [];
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.onLoadingChange.subscribe((value) => {
      this.isLoading = value;
    });

    this.loaderService.updateNamedLoader.subscribe(({ name, type }) => {
      if (type === 'add') {
        this.loaderWithName.push(name);
      }
      if (type === 'remove') {
        this.loaderWithName = this.loaderWithName.filter(
          (value) => value !== name
        );
      }
    });
  }
}
