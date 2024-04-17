import { Card } from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import { Board, Item } from '@/services/board';
import { motion } from 'framer-motion';
import { FC, memo, useCallback, useMemo, useState } from 'react';
import { BoardItem } from './BoardItem/BoardItem';

interface BoardGridProps {
  board: Board;
}

const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  const [state, setState] = useState({
    boardItems: board.items,
    dragStartIndex: null as number | null,
    activeChainId: null as string | null,
    selected: null as Item | null,
    lastSelected: null as Item | null,
  });

  const handleItemClick = useCallback(
    (card: Item) => {
      setState((prev) => ({
        ...prev,
        lastSelected: state.selected,
        selected: card,
      }));
    },
    [state.selected],
  );

  const handleOutsideClick = useCallback(() => {
    setState((prev) => ({
      ...prev,
      lastSelected: state.selected,
      selected: null,
    }));
  }, [state.selected]);

  const handleDrop = useCallback(
    (dropIndex: number) => {
      if (state.dragStartIndex !== null && state.dragStartIndex !== dropIndex) {
        const swappedArray = swapArrayItems(
          state.boardItems,
          state.dragStartIndex,
          dropIndex,
        );
        setState((prev) => ({ ...prev, boardItems: swappedArray }));
      }
      setState((prev) => ({
        ...prev,
        dragStartIndex: null,
        activeChainId: null,
      }));
    },
    [state.boardItems, state.dragStartIndex],
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
        state.selected ? 'pointer-events-auto' : 'pointer-events-none',
      ),
    [state.selected],
  );

  return (
    <div className="max-w-[1000px]">
      <Card>
        <div className="w-full h-full grid max-w-7xl mx-auto" style={gridStyle}>
          {state.boardItems.map((item, index) => (
            <BoardItem
              key={item?.itemId}
              item={item}
              index={index}
              activeChainId={state.activeChainId}
              setDragStartIndex={(index) =>
                setState((prev) => ({ ...prev, dragStartIndex: index }))
              }
              setActiveChainId={(chainId) =>
                setState((prev) => ({ ...prev, activeChainId: chainId }))
              }
              handleDrop={handleDrop}
              handleClick={handleItemClick}
              selected={state.selected}
              lastSelected={state.lastSelected}
            />
          ))}
        </div>
        <motion.div
          onClick={handleOutsideClick}
          className={overlayClasses}
          animate={{ opacity: state.selected ? 0.3 : 0 }}
        />
      </Card>
    </div>
  );
};

export default memo(BoardGrid);
