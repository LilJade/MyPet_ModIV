import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Conection',
  connector: 'mongodb',
  url: 'mongodb+srv://nilson65alfaro:1234@cluster0.72lqw18.mongodb.net/',
  database: 'pets',
  useNewUrlParser: true
};

@lifeCycleObserver('datasource')
export class ConectionDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'Conection';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.Conection', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
