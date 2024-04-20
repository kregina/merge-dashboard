import { v4 as uuidv4 } from 'uuid';

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

export const fetchBoard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const json = await import('./data/assigment.json');

  const data = {
    ...json,
    items: json.items.map((item: any) => ({ ...item, itemId: uuidv4() })),
  };
  return data;
};

export interface AddItemToBoardProps {
  index: number;
  newItem: Item;
  boardItems: Array<Item | null>;
}

export const addItemToBoard = async (options: AddItemToBoardProps) => {
  const { index, newItem, boardItems } = options;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // replace the item at the index with the new item
  const newBoard = [
    ...boardItems.slice(0, index),
    { ...newItem, itemId: boardItems[index]?.itemId },
    ...boardItems.slice(index + 1),
  ] as Array<Item | null>;

  return newBoard;
};

interface updateItemOfBoardProps {
  updatedItem: Item;
  boardItems: Array<Item | null>;
}

export const updateItemToBoard = async (options: updateItemOfBoardProps) => {
  const { updatedItem, boardItems } = options;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const newBoard = [
    ...boardItems.map((item) =>
      item?.itemId === updatedItem.itemId ? updatedItem : item,
    ),
  ];

  return newBoard;
};
