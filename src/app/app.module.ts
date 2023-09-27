import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { HeaderComponent } from './component/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { ComponentHeightDirective } from './directive/component-height.directive';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    ComponentHeightDirective,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, UserService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
