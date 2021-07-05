import { ISerializer } from './interface/ISerializer';
import { ISingleSerializer } from './interface/ISingleSerializer';

/**
 * Base Serializer
 */
export interface IBaseSerializer extends ISerializer, ISingleSerializer {}
