import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { ForbiddedError } from '../../shared/errors/index.js';
import { isLoggedIn } from '../../graphql/is-loggedin.js';
import { listClients } from './list-clients.js';
import { showClients } from './showClient.js';
import { addClient } from './add-client.js';
import { editClient } from './edit-client.js';
import { removeClient } from './remove-client.js';
import { loginClient } from './login-client.js';

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
  },
  Mutation: {
    createClient: async (_, args) => {
      const result = await addClient(args.input);

      pubsub.publish('CLIENT_CREATED', { clientCreated: result });

      return result;
    },

    updateClient: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "client" || contextValue.user.id !== +args.id) {
        throw new ForbiddedError("Faqat o'z profilingizni tahrirlay olasiz");
      };

      return editClient({ id: args.id, ...args.input });
    },

    removeClient: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "client" || contextValue.user.id !== +args.id) {
        throw new ForbiddedError("Birovni profilini o'chira olmaysiz");
      };

      return removeClient({ id: args.id });
    },

    loginClient: (_, args) => {
      return loginClient(args.input);
    },
  },
  Subscription: {
    clientCreated: {
      subscribe: () => pubsub.asyncIterator(['CLIENT_CREATED']),
    },
  },
};

export default { typeDefs, resolvers };