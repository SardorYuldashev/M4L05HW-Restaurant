import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { isLoggedIn } from './../../graphql/is-loggedin.js';
import { ForbiddedError } from '../../shared/errors/index.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'orders', '_schema.gql'),
  'utf8'
);

const resolvers = {

};

export default { typeDefs, resolvers };