import { User } from '../../server/db/schemas/User';
import { Bunny } from '../../server/db/schemas/Bunny';
import UserFixtures from './Users';
import BunnyFixtures from './Bunnies';

export async function initFixtures() {
  await User.remove({});
  await Bunny.remove({});

  await User.insertMany(UserFixtures);
  await Bunny.insertMany(BunnyFixtures);
}
