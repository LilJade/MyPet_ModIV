import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegistroUsuarioComponent } from './registroUsuario/registroUsuario.component';
import { UsuarioPerfilComponent } from './usuarioPerfil/usuarioPerfil.component';
import { MyPetComponent } from './myPet/myPet.component';
import { AddPetComponent } from './addPet/addPet.component';
import { EditUserComponent } from './editUser/editUser.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro_usuario', component: RegistroUsuarioComponent},
  {path: 'user_profile', component: UsuarioPerfilComponent},
  {path: 'my_pet', component: MyPetComponent},
  {path: 'add_pet', component: AddPetComponent},
  {path: 'edit_user', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
