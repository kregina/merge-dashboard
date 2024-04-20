import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import { Board, Item } from '@/services';
import { useCallback, useMemo, useState } from 'react';
import { BoardContextProps } from './BoardContext';

type BoardStateUpdate = Partial<{
  board: Board;
  boardItems: Array<Item | null>;
  dragStartIndex: number | null;
  activeChainId: string | null;
  openedItem: Item | null;
  lastOpenedItem: Item | null;
}>;

export function useBoardGrid(board: Board) {
  const [boardState, setBoardState] = useState({
    board: board,
    boardItems: board.items,
    dragStartIndex: null as number | null,
    activeChainId: null as string | null,
    openedItem: null as Item | null,
    lastOpenedItem: null as Item | null,
  });

  const updateBoardState = useCallback((newState: BoardStateUpdate) => {
    setBoardState((prev) => ({ ...prev, ...newState }));
  }, []);

  const handleItemClick = useCallback(
    (item: Item) => {
      updateBoardState({
        lastOpenedItem: boardState.openedItem,
        openedItem: item,
      });
    },
    [boardState.openedItem, updateBoardState],
  );

  const handleOutsideClick = useCallback(() => {
    updateBoardState({
      lastOpenedItem: boardState.openedItem,
      openedItem: null,
    });
  }, [boardState.openedItem, updateBoardState]);

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

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
    }),
    [board.width, board.height],
  );

  const overlayClasses = useMemo(
    () =>
      cn(
        'absolute h-full w-full left-0 top-0 bg-foreground opacity-0 z-10',
        boardState.openedItem ? 'pointer-events-auto' : 'pointer-events-none',
      ),
    [boardState.openedItem],
  );

  const boardContextValues: BoardContextProps = useMemo(
    () => ({
      boardItems: boardState.boardItems,
      setBoardItems: (items: Array<Item | null>) =>
        updateBoardState({ boardItems: items }),
      closeItem: (openedItem: Item | null) => updateBoardState({ openedItem }),
    }),
    [boardState.boardItems, updateBoardState],
  );

  return {
    boardState,
    setBoardState,
    handleItemClick,
    handleOutsideClick,
    handleDrop,
    gridStyle,
    overlayClasses,
    boardContextValues,
  };
}
