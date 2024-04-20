import { Item } from '@/services';
import { createContext } from 'react';

export interface BoardContextProps {
  boardItems: Array<Item | null>;
  setBoardItems: (items: Array<Item | null>) => void;
  closeItem: (openedItem: null) => void;
}

export const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider = BoardContext.Provider;
