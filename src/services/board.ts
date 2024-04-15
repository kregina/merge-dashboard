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
  draggable?: boolean | undefined;
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

  return json as Board;
};
