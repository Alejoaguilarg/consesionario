import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Ventas} from '../models';
import {VentasRepository} from './ventas.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly pertence_a: BelongsToAccessor<Ventas, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Factura, dataSource);
    this.pertence_a = this.createBelongsToAccessorFor('pertence_a', ventasRepositoryGetter,);
    this.registerInclusionResolver('pertence_a', this.pertence_a.inclusionResolver);
  }
}
