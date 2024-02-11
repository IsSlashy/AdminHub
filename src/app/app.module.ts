import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApolloModule } from 'apollo-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { AdminModule } from './admin/admin.module';
import { ApprovalComponent } from './admin/approval/approval.component';
import { SearchSkipperComponent } from './admin/search-skipper/search-skipper.component';
import { SearchMissionComponent } from './admin/search-mission/search-mission.component';
import { KPIComponent } from './admin/kpi/kpi.component';
import { AdminPlusComponent } from './admin/admin-plus/admin-plus.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ApprovalComponent,
    SearchSkipperComponent,
    SearchMissionComponent,
    KPIComponent,
    AdminPlusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    ApolloModule,
    BrowserAnimationsModule,
    AdminModule,
    FormsModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
