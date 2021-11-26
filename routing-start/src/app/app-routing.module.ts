import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { RouterModule, Routes } from '@angular/router';

const appRoute:Routes=[
    {path:'',component:HomeComponent},
    {path:'users',component:UsersComponent},
    {path:'servers',component:ServersComponent,children:[
     {path:':id',component:ServerComponent},
     {path:':id/edit',component:EditServerComponent},
    ]},
    {path:'users/:id/:name',component:UserComponent},
 ]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoute)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}