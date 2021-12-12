import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly creador_por: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Cliente, dataSource);
    this.creador_por = this.createBelongsToAccessorFor('creador_por', vendedorRepositoryGetter,);
    this.registerInclusionResolver('creador_por', this.creador_por.inclusionResolver);
  }
}
