import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import { Board, Item } from '@/services/board';
import { useCallback, useMemo, useState } from 'react';
import { BoardContextProps } from './BoardContext';

export function useBoardGrid(board: Board) {
  const [boardState, setBoardState] = useState({
    board: board,
    boardItems: board.items,
    dragStartIndex: null as number | null,
    activeChainId: null as string | null,
    openedItem: null as Item | null,
    lastOpenedItem: null as Item | null,
  });

  const handleItemClick = useCallback(
    (card: Item) => {
      setBoardState((prev) => ({
        ...prev,
        lastOpenedItem: boardState.openedItem,
        openedItem: card,
      }));
    },
    [boardState.openedItem],
  );

  const handleOutsideClick = useCallback(() => {
    setBoardState((prev) => ({
      ...prev,
      lastOpenedItem: boardState.openedItem,
      openedItem: null,
    }));
  }, [boardState.openedItem]);

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
        setBoardState((prev) => ({ ...prev, boardItems: swappedArray }));
      }
      setBoardState((prev) => ({
        ...prev,
        dragStartIndex: null,
        activeChainId: null,
      }));
    },
    [boardState.boardItems, boardState.dragStartIndex],
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
      board,
      setBoardItems: (items: Array<Item | null>) =>
        setBoardState((prev) => ({ ...prev, boardItems: items })),
      closeItem: (openedItem: Item | null) =>
        setBoardState((prev) => ({ ...prev, openedItem })),
    }),
    [boardState.board],
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
