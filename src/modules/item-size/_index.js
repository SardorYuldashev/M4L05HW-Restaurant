import { readFileSync } from 'fs';
import { join } from 'path';
import { pubsub } from '../../graphql/pubsub.js';
import { isLoggedIn } from './../../graphql/is-loggedin.js';
import { ForbiddedError } from '../../shared/errors/index.js';
import { listItemSizes } from './list-item-size.js';
import { showItemSize } from './show-item-size.js';
import { addItemSize } from './add-item-size.js';
import { showItem } from './../items/show-item.js';
import { editItemSize } from './edit-item-size.js';
import { removeItemSize } from './remove-item-size.js';

const typeDefs = readFileSync(
  join(process.cwd(), 'src', 'modules', 'item-size', '_schema.gql'),
  'utf8'
);

const resolvers = {
  Query: {
    item_sizes: () => {
      return listItemSizes();
    },

    item_size: (_, args) => {
      return showItemSize({ id: args.id });
    }
  },
  Mutation: {
    createItemSize: async (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      const result = await addItemSize(args.input);

      pubsub.publish('ITEM_SIZE_CREATED', { itemSizeCreated: result });

      return result;
    },

    updateItemSize: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      return editItemSize({ id: args.id, ...args.input });
    },

    removeItemSize: (_, args, contextValue) => {
      isLoggedIn(contextValue);

      if (contextValue.user.role !== "user") {
        throw new ForbiddedError("Sizda bu yo'lga kirishga ruxsat yo'q");
      };

      return removeItemSize({ id: args.id });
    },
  },
  Subscription: {
    itemSizeCreated: {
      subscribe: () => pubsub.asyncIterator(['ITEM_SIZE_CREATED']),
    },
  },
  ItemSize: {
    item: (parent) => {
      return showItem({ id: parent.item_id });
    }
  }
};

export default { typeDefs, resolvers };