import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConectionDataSource} from '../datasources';
import {Users, UsersRelations} from '../models';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {
  constructor(
    @inject('datasources.Conection') dataSource: ConectionDataSource,
  ) {
    super(Users, dataSource);
  }
}
