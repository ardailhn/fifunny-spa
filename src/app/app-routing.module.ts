import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AboutSettingComponent } from './admin-panel/about-setting/about-setting.component';
import { AdminLoginComponent } from './admin-panel/admin-login/admin-login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ContactComponent } from './contact/contact.component';
import { LoginDefaultUserComponent } from './loginDefaultUser/loginDefaultUser.component';
import { LoginUserComponent } from './loginUser/loginUser.component';
import { PlaceAddComponent } from './place/place-add/place-add.component';
import { PlaceCustomComponent } from './place/place-custom/place-custom.component';
import { PlaceDetailComponent } from './place/place-detail/place-detail.component';
import { PlaceFilterComponent } from './place/place-filter/place-filter.component';
import { PlaceSettingComponent } from './place/place-setting/place-setting.component';
import { PlaceComponent } from './place/place.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDefaultUserComponent } from './profileDefaultUser/profileDefaultUser.component';
import { RegisterDefaultUserComponent } from './registerDefaultUser/registerDefaultUser.component';
import { RegisterUserComponent } from './registerUser/registerUser.component';
import { AdminAuthGuardService as AdminGuard } from './services/admin-auth-guard.service';
import { AuthGuardService as AuthGuard  } from './services/auth-guard.service';
import { DefaultUserAuthGuardService as DefaultGuard } from './services/default-user-auth-guard.service';
import { PlaceRoleService as RoleGuard } from './services/place-role.service';
import { PlaceCategoryComponent } from './place/place-category/place-category.component';
import { AdminCommentComponent } from './admin-panel/admin-comment/admin-comment.component';


const routes: Routes = [
  {path:"place", component:PlaceComponent},
  {path:"place-category/:id", component:PlaceCategoryComponent},
  {path:"placeDetail/:id", component:PlaceDetailComponent},
  {path:"placeSetting/:id", component:PlaceSettingComponent,canActivate: [RoleGuard]},
  {path:"placeSettingAdmin/:id", component:PlaceSettingComponent,canActivate: [AdminGuard]},
  {path:"addPlace", component:PlaceAddComponent,canActivate: [AuthGuard]},
  {path:"addPlaceAdmin", component:PlaceAddComponent,canActivate: [AdminGuard]},
  {path:"place-custom/:id", component:PlaceCustomComponent,canActivate: [RoleGuard]},
  {path:"place-filter/:id", component:PlaceFilterComponent,canActivate: [RoleGuard]},
  {path:"place-filter-admin/:id", component:PlaceFilterComponent,canActivate: [AdminGuard]},
  {path:"loginUser", component:LoginUserComponent},
  {path:"registerUser", component:RegisterUserComponent},
  {path:"about", component:AboutComponent},
  {path:"contact", component:ContactComponent},
  {path:"admin-panel", component:AdminPanelComponent,canActivate: [AdminGuard]},
  {path:"about-setting", component:AboutSettingComponent,canActivate: [AdminGuard]},
  {path:"comments-setting", component:AdminCommentComponent,canActivate: [AdminGuard]},
  {path:"admin-login", component:AdminLoginComponent},
  {path:"profile", component:ProfileComponent,canActivate: [AuthGuard]},
  {path:"profileUser",component:ProfileDefaultUserComponent,canActivate: [DefaultGuard]},
  {path:"register", component:RegisterDefaultUserComponent},
  {path:"login",component:LoginDefaultUserComponent},
  {path:"**", redirectTo:"place", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
