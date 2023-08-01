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

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavBarComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    UsuarioPerfilComponent,
    MyPetComponent,
    AddPetComponent
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
