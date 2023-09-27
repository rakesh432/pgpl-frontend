import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  onLoadingChange = new EventEmitter<boolean>();
  updateNamedLoader = new EventEmitter<{
    name: number | string;
    type: 'add' | 'remove';
  }>();
}
