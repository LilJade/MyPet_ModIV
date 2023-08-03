import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({settings: {strict: false}})
export class Pet extends Entity {
  @property({
    type: 'string', // Cambiar el tipo a 'string'
    id: true,
    generated: true,
  })
  id?: string; // Cambiar el tipo a 'string'

  @property({
    type: 'string', // Cambiar el tipo a 'string'
    required: true,
  })
  namePet: string;

  @property({
    type: 'string', // Cambiar el tipo a 'string'
    required: true,
  })
  raza: string;

  @property({
    type: 'string', // Cambiar el tipo a 'string'
    required: false,
  })
  state: string;

  @property({
    type: 'string', // Cambiar el tipo a 'string'
    required: false,
  })
  description: string;

  // Propiedad userId para la relación belongsTo hacia el modelo Users
  @property({
    type: 'string', // Cambiar el tipo a 'string'
    required: true,
  })
  userId: string; // Cambiar el tipo a 'string'

  // Relación belongsTo hacia el modelo Users
  @belongsTo(() => Users, {keyFrom: 'userId', keyTo: 'id'})
  user: Users;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // Propiedad para la relación belongsTo hacia Users
  user?: Users;
}

export type PetWithRelations = Pet & PetRelations;
