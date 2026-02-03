import { Actor, Ability } from '../core/types';
import { CustomWorld } from '../../support/world';

export function actorFromWorld(world: CustomWorld, name = 'Tester'): Actor {
  const page = world.page!;
  const ability: Ability = { page };
  return new Actor(name, ability);
}
