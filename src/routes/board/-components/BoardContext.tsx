import { Item } from '@/services';
import { createContext } from 'react';

export interface BoardContextProps {
  boardItems: Item[];
  setBoardItems: (items: Item[]) => void;
}

export const BoardContext = createContext<BoardContextProps | null>(null);

export const BoardProvider = BoardContext.Provider;
