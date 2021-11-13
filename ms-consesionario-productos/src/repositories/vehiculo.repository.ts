import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {PostgresqlDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Marca, Categoria, CategoriaVehiculo} from '../models';
import {MarcaRepository} from './marca.repository';
import {CategoriaVehiculoRepository} from './categoria-vehiculo.repository';
import {CategoriaRepository} from './categoria.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.id,
  VehiculoRelations
> {

  public readonly tiene_marca: BelongsToAccessor<Marca, typeof Vehiculo.prototype.id>;

  public readonly categorias: HasManyThroughRepositoryFactory<Categoria, typeof Categoria.prototype.id,
          CategoriaVehiculo,
          typeof Vehiculo.prototype.id
        >;

  constructor(
    @inject('datasources.postgresql') dataSource: PostgresqlDataSource, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>, @repository.getter('CategoriaVehiculoRepository') protected categoriaVehiculoRepositoryGetter: Getter<CategoriaVehiculoRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.categorias = this.createHasManyThroughRepositoryFactoryFor('categorias', categoriaRepositoryGetter, categoriaVehiculoRepositoryGetter,);
    this.registerInclusionResolver('categorias', this.categorias.inclusionResolver);
    this.tiene_marca = this.createBelongsToAccessorFor('tiene_marca', marcaRepositoryGetter,);
    this.registerInclusionResolver('tiene_marca', this.tiene_marca.inclusionResolver);
  }
}
