import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {UsuarioVendedor, UsuarioVendedorRelations} from '../models';

export class UsuarioVendedorRepository extends DefaultCrudRepository<
  UsuarioVendedor,
  typeof UsuarioVendedor.prototype.id,
  UsuarioVendedorRelations
> {
  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource,
  ) {
    super(UsuarioVendedor, dataSource);
  }
}
