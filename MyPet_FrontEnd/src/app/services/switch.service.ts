import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor() { }

  $modalEliminarUser = new EventEmitter<any>();
  $modalEliminarPet = new EventEmitter<any>();
  $userLogin = new EventEmitter<any>();
  
}
