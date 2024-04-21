import { Board, Item } from '@/services';
import { createContext, useContext } from 'react';

export interface BoardContextProps {
  board: Board;
  itemsHistory: Item[];
  selectedIndex: number;
}

export const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider = BoardContext.Provider;

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
