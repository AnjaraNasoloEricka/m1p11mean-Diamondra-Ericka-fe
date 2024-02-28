import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { EmployeeLayoutComponent } from "./layouts/employee-layout/employee-layout.component";
import { CustomerComponent } from "./layouts/customer/customer.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { RegisterMessageComponent } from "./views/auth/register-message/register-message.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from "./config/guard/auth.guard";

import { ServiceComponent } from "./views/service/service.component";
import { EmployeeComponent } from "./views/employee/employee.component";
import { AppointmentComponent } from "./views/appointment/appointment.component";
import { ProfileEmployeeComponent } from "./views/employee/profile/profile.employee.component";
import { TaskComponent } from './views/employee/task/task.component';
import { AppointmentDetailComponent } from './views/appointment/appointment-detail/appointment-detail.component';

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "services", component : ServiceComponent},
      { path: "employees", component : EmployeeComponent},
      { path: "profile", component : ProfileEmployeeComponent},
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate : [AuthGuard]
  },

// employee views
  {
    path: "employee",
    component: EmployeeLayoutComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "appointments", component : AppointmentComponent},
      { path: "profile", component : ProfileEmployeeComponent},
      { path: "tasks", component: TaskComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate : [AuthGuard]
  },

// customer views
  {
    path: "customer",
    component: CustomerComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "tables", component: TablesComponent },
      { path: "services", component : ServiceComponent},
      { path: "employees", component : EmployeeComponent},
      { path: "appointments", component : AppointmentComponent},
      { path: "appointments/:id", component : AppointmentDetailComponent},
      { path: "settings", component: SettingsComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
    canActivate : [AuthGuard]
  },


  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "register-success", component: RegisterMessageComponent },
      { path: "register-verify/:token", component: RegisterMessageComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
