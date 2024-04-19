import { Card } from '@/components';
import { Board } from '@/services/board';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BoardProvider } from './BoardContext';
import { BoardItem } from './BoardItem/BoardItem';
import { useBoardGrid } from './useBoardGrid';

interface BoardGridProps {
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  const {
    boardState,
    setBoardState,
    handleItemClick,
    handleOutsideClick,
    handleDrop,
    gridStyle,
    overlayClasses,
    boardContextValues,
  } = useBoardGrid(board);

  return (
    <BoardProvider value={boardContextValues}>
      <div className="max-w-[1000px]">
        <Card>
          <div
            className="w-full h-full grid max-w-7xl mx-auto"
            style={gridStyle}
          >
            {boardState.boardItems.map((item, index) => (
              <BoardItem
                key={item?.itemId}
                item={item}
                index={index}
                activeChainId={boardState.activeChainId}
                setDragStartIndex={(index) =>
                  setBoardState((prev) => ({ ...prev, dragStartIndex: index }))
                }
                setActiveChainId={(chainId) =>
                  setBoardState((prev) => ({ ...prev, activeChainId: chainId }))
                }
                handleDrop={handleDrop}
                handleClick={handleItemClick}
                selected={boardState.openedItem}
                lastSelected={boardState.lastOpenedItem}
              />
            ))}
          </div>
          <motion.div
            onClick={handleOutsideClick}
            className={overlayClasses}
            animate={{ opacity: boardState.openedItem ? 0.3 : 0 }}
          />
        </Card>
      </div>
    </BoardProvider>
  );
};
