import { swapArrayItems } from '@/lib/swapArrayItems';
import { Board, Item } from '@/services';
import { useCallback, useMemo, useState } from 'react';
import { BoardContextProps } from './BoardContext';

interface UseBoardGridSate {
  boardItems: Item[];
  dragStartIndex: number | null;
  activeChainId: string | null;
}

export function useBoardGrid(board: Board) {
  const [boardState, setBoardState] = useState<UseBoardGridSate>({
    boardItems: board.items,
    dragStartIndex: 0,
    activeChainId: null,
  });

  const updateBoardState = useCallback(
    (newState: Partial<UseBoardGridSate>) => {
      setBoardState((prev) => ({ ...prev, ...newState }));
    },
    [],
  );

  const handleDrop = useCallback(
    (dropIndex: number) => {
      if (
        boardState.dragStartIndex !== null &&
        boardState.dragStartIndex !== dropIndex
      ) {
        const swappedArray = swapArrayItems(
          boardState.boardItems,
          boardState.dragStartIndex,
          dropIndex,
        );
        updateBoardState({ boardItems: swappedArray });
      }
      updateBoardState({
        dragStartIndex: null,
        activeChainId: null,
      });
    },
    [boardState.dragStartIndex, boardState.boardItems, updateBoardState],
  );

  const boardContextValues: BoardContextProps = useMemo(
    () => ({
      boardItems: boardState.boardItems,
      setBoardItems: (items: Item[]) => updateBoardState({ boardItems: items }),
    }),
    [boardState.boardItems, updateBoardState],
  );

  return {
    boardState,
    setBoardState,
    handleDrop,
    boardContextValues,
  };
}
