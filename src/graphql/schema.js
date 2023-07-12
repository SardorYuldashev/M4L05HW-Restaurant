import { makeExecutableSchema } from '@graphql-tools/schema';
import usersModule from '../modules/users/_index.js';
import clientsModule from '../modules/clients/_index.js';

const typdefsArr = [usersModule.typeDefs, clientsModule.typeDefs];
const resolversArr = [usersModule.resolvers, clientsModule.resolvers];

export const schema = makeExecutableSchema({
  typeDefs: typdefsArr,
  resolvers: resolversArr,
});
