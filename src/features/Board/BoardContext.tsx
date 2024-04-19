import { Board, Item } from '@/services/board';
import { createContext } from 'react';

export interface BoardContextProps {
  board: Board;
  setBoardItems: (items: Array<Item | null>) => void;
  closeItem: (openedItem: null) => void;
}

export const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider = BoardContext.Provider;
