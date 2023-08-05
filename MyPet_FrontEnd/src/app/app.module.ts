import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registroUsuario/registroUsuario.component';
import { UsuarioPerfilComponent } from './usuarioPerfil/usuarioPerfil.component';
import { MyPetComponent } from './myPet/myPet.component';
import { AddPetComponent } from './addPet/addPet.component';
import { EditUserComponent } from './editUser/editUser.component';
import { AdminComponent } from './admin/admin.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { EliminarPetComponent } from './eliminar-pet/eliminar-pet.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavBarComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    UsuarioPerfilComponent,
    MyPetComponent,
    AddPetComponent,
    EditUserComponent,
    AdminComponent,
    EliminarUsuarioComponent,
    EliminarPetComponent,
    CreditsComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
