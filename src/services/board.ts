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

export interface UpdateBoardProps {
  index: number;
  newItem: Item;
  board: Board;
}

export const updateBoard = async (options: UpdateBoardProps) => {
  const { index, newItem, board } = options;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // add newItem to the selected index place of the board
  const newBoard = {
    ...board,
    items: [
      ...board.items.slice(0, index),
      newItem,
      ...board.items.slice(index + 1),
    ],
  };

  return newBoard;
};
