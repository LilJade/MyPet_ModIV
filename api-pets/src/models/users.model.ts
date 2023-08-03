import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  email?: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  Name: string;

  @property({
    type: 'string',
    required: true,
  })
  role: string;

  @property({
    type: 'date',
  })
  createdAt?: string;

  // ... otras propiedades ...

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

// Definir y exportar la interfaz UsersRelations
export interface UsersRelations {
  // ... relaciones o propiedades relacionadas ...
}

// Exportar el modelo Users
export type UsersWithRelations = Users & UsersRelations;
