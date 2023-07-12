import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { isLoggedIn } from './../../graphql/is-loggedin.js';
import { ForbiddedError } from '../../shared/errors/index.js';
import { listItems } from './list-items.js';
import { showItem } from './show-item.js';
import { addItem } from './add-item.js';
import { editItem } from './edit-item.js';
import { removeItem } from './remove-item.js';
import { listItemSizes } from './../item-size/list-item-size.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'items', '_schema.gql'),
  'utf8'
);

const resolvers = {
  Query: {
    items: () => {
      return listItems();
    },

    item: (_, args) => {

      return showItem({ id: args.id });
    }
  },
  Mutation: {
    createItem: async (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      const result = await addItem(args.input);

      pubsub.publish('ITEM_CREATED', { itemCreated: result });

      return result;
    },

    updateItem: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      return editItem({ id: args.id, ...args.input });
    },

    removeItem: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      return removeItem({ id: args.id });
    },
  },
  Subscription: {
    itemCreated: {
      subscribe: () => pubsub.asyncIterator(['ITEM_CREATED']),
    },
  },
  Item: {
    sizes: (parent) => {
      return listItemSizes({ item_id: parent.id });
    }
  }
};

export default { typeDefs, resolvers };