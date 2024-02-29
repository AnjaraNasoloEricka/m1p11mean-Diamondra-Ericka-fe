import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
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

// components for views and layouts

import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";

import { AuthInterceptor } from "./config/interceptor/auth/auth.interceptor";
import { ResponseInterceptor } from "./config/interceptor/response/response.interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ServiceComponent } from "./views/service/service.component";
import { ServiceModalComponent } from './components/modal/service.modal/service.modal.component';
import { PageloaderComponent } from './components/loader/pageloader/pageloader.component';

import { CommonModule } from '@angular/common';

// employee views
import { EmployeeComponent } from "./views/employee/employee.component";
import { EmployeeModalComponent } from './components/modal/employee.modal/employee.modal.component';
import { AdminSidebarComponent } from './components/sidebars/admin-sidebar/admin-sidebar.component';
import { CustomerSidebarComponent } from './components/sidebars/customer-sidebar/customer-sidebar.component';
import { EmployeeSidebarComponent } from './components/sidebars/employee-sidebar/employee-sidebar.component';
import { CustomerComponent } from './layouts/customer/customer.component';
import { EmployeeLayoutComponent } from './layouts/employee-layout/employee-layout.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { AppointmentModalComponent } from './components/modal/appointment.modal/appointment.modal.component';
import { ProfileEmployeeComponent } from "./views/employee/profile/profile.employee.component";
import { CardEmployeeComponent } from "./components/cards/card-employee/card-employee.component";
import { ScheduleModalComponent } from './components/modal/schedule.modal/schedule.modal/schedule.modal.component';
import { TaskComponent } from './views/employee/task/task.component';


import { CustomerhomeComponent } from './views/customer/home/customerhome/customerhome.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PaymentComponent } from './views/appointment/payment/payment.component';
import { PaymentModalComponent } from './components/modal/payment.modal/payment.modal.component';
import { AppointmentDetailComponent } from './views/appointment/appointment-detail/appointment-detail.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { URL } from "src/environments/environment";
import { NotificationalertComponent } from './components/alert/notificationalert/notificationalert.component';
import { DatePipe } from '@angular/common'
import { SpecialofferComponent } from './views/admin/specialoffer/specialoffer/specialoffer.component';
import { SpecialofferModalComponent } from './components/modal/specialoffer.modal/specialoffer.modal/specialoffer.modal.component';
import { DetailspecialofferModalComponent } from './components/modal/specialoffer.modal/specialoffer.modal/detail/detailspecialoffer.modal/detailspecialoffer.modal.component';
import { ExpenseComponent } from './views/expense/expense/expense.component';

// configuration for socket.io
const config: SocketIoConfig = { url: URL.baseUrl , options: {
  transports: ['websocket']
} };
// configuration for socket.io


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    RegisterMessageComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    ServiceComponent,
    ServiceModalComponent,
    PageloaderComponent,
    EmployeeComponent,
    EmployeeModalComponent,
    AdminSidebarComponent,
    CustomerSidebarComponent,
    EmployeeSidebarComponent,
    CustomerComponent,
    EmployeeLayoutComponent,
    AppointmentComponent,
    AppointmentModalComponent,
    ProfileEmployeeComponent,
    CardEmployeeComponent,
    ScheduleModalComponent,
    CustomerhomeComponent,
    TaskComponent,
    PaymentComponent,
    PaymentModalComponent,
    AppointmentDetailComponent,
    NotificationalertComponent,
    SpecialofferComponent,
    SpecialofferModalComponent,
    DetailspecialofferModalComponent,
    ExpenseComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    DragDropModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
