import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { ForbiddedError } from '../../shared/errors/index.js';
import { isLoggedIn } from '../../graphql/is-loggedin.js';
import { listClients } from './list-clients.js';
import { showClients } from './showClient.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'clients', '_schema.gql'),
  'utf8'
);

const resolvers = {
  Query: {
    clients: (_, __, contextValue) => {
      isLoggedIn(contextValue);

      return listClients();
    },

    client: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      return showClients({ id: args.id });
    }
  }
};

export default { typeDefs, resolvers };