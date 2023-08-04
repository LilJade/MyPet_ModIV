import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'Conection',
  connector: 'mongodb',
  url: 'mongodb://127.0.0.1:27017/27017?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0',
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
