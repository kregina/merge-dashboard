import { v4 as uuidv4 } from 'uuid';

// Enums and Interfaces
export enum ItemVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export interface Item {
  itemId: string;
  itemType: string;
  chainId: string;
  pausedUntil: string | null;
  createdAt: string;
  visibility: ItemVisibility | string | null;
  itemLevel: number | null;
  isInsideBubble: boolean;
  icon: string;
}

export interface Board {
  width: number;
  height: number;
  boardId: string;
  items: Array<Item | null>;
}

// Helper function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch Board Data
export const fetchBoard = async (): Promise<Board> => {
  await delay(1000);
  const json = await import('./data/assigment.json');

  // some ids are duplicated, for animation purposes we need unique ids
  const board: Board = {
    ...json,
    items: json.items.map((item) => ({ ...item, itemId: uuidv4() }) as Item),
  };
  return board;
};

// Adding, Updating, and Deleting items

export interface AddItemToBoardProps {
  index: number;
  newItem: Item;
  boardItems: Array<Item | null>;
}

export const addItemToBoard = async (
  options: AddItemToBoardProps,
): Promise<Array<Item | null>> => {
  await delay(1000);
  const { index, newItem, boardItems } = options;

  return [
    ...boardItems.slice(0, index),
    newItem,
    ...boardItems.slice(index + 1),
  ];
};

interface UpdateItemOfBoardProps {
  updatedItem: Item;
  boardItems: Array<Item | null>;
}

export const updateItemToBoard = async (
  options: UpdateItemOfBoardProps,
): Promise<Array<Item | null>> => {
  await delay(1000);

  const { updatedItem, boardItems } = options;

  return boardItems.map((item) =>
    item?.itemId === updatedItem.itemId ? updatedItem : item,
  );
};

interface DeleteItemOfBoardProps {
  itemId: string;
  boardItems: Array<Item | null>;
  index: number;
}

export const deleteItemFromBoard = async (
  options: DeleteItemOfBoardProps,
): Promise<Array<Item | null>> => {
  const { itemId, boardItems, index } = options;
  await delay(1000);

  // Prepare an empty item with the same itemId for animation purposes
  const emptyItem = {
    itemId: itemId,
  } as Item;

  // Replace the item at the index with the "empty" item while retaining the itemId
  const newBoard = [
    ...boardItems.slice(0, index),
    emptyItem,
    ...boardItems.slice(index + 1),
  ];

  return newBoard;
};
