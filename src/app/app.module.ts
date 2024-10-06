import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Instagram, Slack, FileText, Home, FilePlus, LogOut, Shield, Layers } from 'angular-feather/icons'; // Import Shield and Layers
import { FeatherModule } from 'angular-feather';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminSideNavbarComponent } from './admin/admin-side-navbar/admin-side-navbar.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './auth.interceptor';

// Define the icons you need
const icons = {
  Instagram,
  Slack,
  FileText,
  Home,
  FilePlus,
  LogOut,
  Shield,
  Layers
};

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    FooterComponent,
    AdminSideNavbarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,

    MatButtonModule,
    MatIconModule,
    FeatherModule.pick(icons), // Import and configure FeatherModule here
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatMenuModule,
    MatDatepickerModule,
    MatDialogModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Allows multiple interceptors
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
