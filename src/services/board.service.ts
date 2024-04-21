import { v4 as uuidv4 } from 'uuid';

// Enums and Interfaces
export enum ItemVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export interface Item {
  itemId: string;
  itemType: string | null;
  chainId: string | null;
  pausedUntil: string | null;
  createdAt: string | null;
  visibility: ItemVisibility | string | null;
  itemLevel: number | null;
  isInsideBubble: boolean | null;
  icon: string | null;
}

export interface Board {
  width: number;
  height: number;
  boardId: string;
  items: Item[];
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
