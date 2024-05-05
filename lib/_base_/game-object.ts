import { randomUUID } from 'crypto';

/**
 * A game object is an entity in the game world. It is a container for data and functions.
 * Game objects usually derive from a blueprint, which defines the schema of the game object.
 */
export class GameObject {
  /**
   * The name of the game object's blueprint. This name is a unique key that identifies
   * the blueprint in the game database.
   */
  name: string;
  /**
   * The unique identifier of the game object.
   */
  id: string;

  constructor(init: { name: string; id?: string }) {
    this.name = init.name;
    this.id = init.id ?? randomUUID();
  }
}

/**
 * Extracts the names of all non-function properties of a type.
 */
type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

/**
 * A blueprint is the template for a game object. It defines its schema,
 * but does not contain any instance-specific data or functions.
 */
export type Blueprint<TGameObject extends GameObject> = Omit<
  Pick<TGameObject, NonFunctionPropertyNames<TGameObject>>,
  'id'
>;
