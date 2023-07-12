import { makeExecutableSchema } from '@graphql-tools/schema';
import usersModule from '../modules/users/_index.js';
import clientsModule from '../modules/clients/_index.js';
import itemsModule from '../modules/items/_index.js';
import itemSizesModule from '../modules/item-size/_index.js';
import ordersModule from '../modules/orders/_index.js';

const typdefsArr = [
  usersModule.typeDefs,
  clientsModule.typeDefs,
  itemsModule.typeDefs,
  itemSizesModule.typeDefs,
  ordersModule.typeDefs
];

const resolversArr = [
  usersModule.resolvers,
  clientsModule.resolvers,
  itemsModule.resolvers,
  itemSizesModule.resolvers,
  ordersModule.resolvers
];

export const schema = makeExecutableSchema({
  typeDefs: typdefsArr,
  resolvers: resolversArr,
});