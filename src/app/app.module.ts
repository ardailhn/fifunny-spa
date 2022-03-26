import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PlaceComponent } from './place/place.component';
import { HttpClientModule } from '@angular/common/http';
import { PlaceDetailComponent } from './place/place-detail/place-detail.component';
import { FooterComponent } from './footer/footer.component';
import { PlaceAddComponent } from './place/place-add/place-add.component';
import { AlertifyService } from './services/alertify.service';
import { LoginUserComponent } from './loginUser/loginUser.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { PlaceCustomComponent } from './place/place-custom/place-custom.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginDefaultUserComponent } from './loginDefaultUser/loginDefaultUser.component';
import { RegisterDefaultUserComponent } from './registerDefaultUser/registerDefaultUser.component';
import { ProfileDefaultUserComponent } from './profileDefaultUser/profileDefaultUser.component';
import { PlaceSearchPipe } from './place/placeSearch.pipe';
import { PlaceFilterPipe } from './place/placeFilter.pipe';
import { PlaceSettingComponent } from './place/place-setting/place-setting.component';
import { AboutSettingComponent } from './admin-panel/about-setting/about-setting.component';
import { PlaceFilterComponent } from './place/place-filter/place-filter.component';
import { PlaceCategoryComponent } from './place/place-category/place-category.component';
import { MenuComponent } from './place/place-category/menu/menu.component';
import { AdminCommentComponent } from './admin-panel/admin-comment/admin-comment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PlaceComponent,
    PlaceAddComponent,
    PlaceDetailComponent,
    FooterComponent,
    LoginUserComponent,
    RegisterUserComponent,
    ProfileComponent,
    AboutComponent,
    ContactComponent,
    AdminPanelComponent,
    AdminLoginComponent,
    PlaceCustomComponent,
    LoginDefaultUserComponent,
    RegisterDefaultUserComponent,
    ProfileDefaultUserComponent,
    PlaceSearchPipe,
    PlaceFilterPipe,
    PlaceSettingComponent,
    AboutSettingComponent,
    PlaceFilterComponent,
    PlaceCategoryComponent,
    MenuComponent,
    AdminCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGalleryModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxEditorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MomentDateModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
      }
    }),
    NgbModule
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem('id_token');
}