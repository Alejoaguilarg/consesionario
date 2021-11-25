import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Vendedor, VendedorRelations, UsuarioVendedor} from '../models';
import {UsuarioVendedorRepository} from './usuario-vendedor.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly tiene_un: HasOneRepositoryFactory<UsuarioVendedor, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('UsuarioVendedorRepository') protected usuarioVendedorRepositoryGetter: Getter<UsuarioVendedorRepository>,
  ) {
    super(Vendedor, dataSource);
    this.tiene_un = this.createHasOneRepositoryFactoryFor('tiene_un', usuarioVendedorRepositoryGetter);
    this.registerInclusionResolver('tiene_un', this.tiene_un.inclusionResolver);
  }
}
