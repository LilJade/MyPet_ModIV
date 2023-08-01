import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registroUsuario/registroUsuario.component';
import { UsuarioPerfilComponent } from './usuarioPerfil/usuarioPerfil.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro_usuario', component: RegistroUsuarioComponent},
  {path: 'user_profile', component: UsuarioPerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
