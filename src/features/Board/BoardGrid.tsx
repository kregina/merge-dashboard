import { Card } from '@/components';
import { Board } from '@/services/board';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BoardItem } from './BoardItem/BoardItem';
import { useBoardGrid } from './useBoard';

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
  } = useBoardGrid(board);

  return (
    <div className="max-w-[1000px]">
      <Card>
        <div className="w-full h-full grid max-w-7xl mx-auto" style={gridStyle}>
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
              selected={boardState.selected}
              lastSelected={boardState.lastSelected}
            />
          ))}
        </div>
        <motion.div
          onClick={handleOutsideClick}
          className={overlayClasses}
          animate={{ opacity: boardState.selected ? 0.3 : 0 }}
        />
      </Card>
    </div>
  );
};
