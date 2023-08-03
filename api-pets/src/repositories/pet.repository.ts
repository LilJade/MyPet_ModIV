import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConectionDataSource} from '../datasources';
import {Pet, PetRelations} from '../models';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {
  constructor(
    @inject('datasources.Conection') dataSource: ConectionDataSource,
  ) {
    super(Pet, dataSource);
  }
}
