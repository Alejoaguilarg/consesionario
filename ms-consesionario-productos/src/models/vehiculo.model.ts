import {
  Entity,
  model,
  property,
  belongsTo,
  hasMany,
} from '@loopback/repository';
import {Marca} from './marca.model';
import {Categoria} from './categoria.model';
import {CategoriaVehiculo} from './categoria-vehiculo.model';
import {Proveedor} from './proveedor.model';
import {Foto} from './foto.model';

@model({
  settings: {
    foreignKeys: {
      fk_vehiculo_id_proveedor: {
        name: 'fk_vehiculo_id_proveedor',
        entity: 'Proveedor',
        entityKey: 'id',
        foreignKey: 'id_proveedor',
      },
      fk_cat_veh_id_marca: {
        name: 'fk_marca_id_marca',
        entity: 'Marca',
        entityKey: 'id',
        foreignKey: 'id_marca',
      },
    },
  },
})
export class Vehiculo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  color: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  serieChasis: string;

  @property({
    type: 'string',
    required: true,
  })
  serieMotor: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  descuento: number;

  @property({
    type: 'boolean',
    required: true,
  })
  exitencia: boolean;

  @belongsTo(() => Marca, {name: 'tiene_marca'})
  id_marca: number;

  @belongsTo(() => Proveedor, {name: 'proveedor'})
  id_proveedor: number;

  @hasMany(() => Foto, {keyTo: 'id_vehiculo'})
  fotos: Foto[];

  @hasMany(() => Categoria, {
    through: {
      model: () => CategoriaVehiculo,
      keyFrom: 'id_vehiculo',
      keyTo: 'id_categoria',
    },
  })
  categorias: Categoria[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
