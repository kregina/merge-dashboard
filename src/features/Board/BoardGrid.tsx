import { Card } from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { Board } from '@/services/board';
import { FC, useState } from 'react';
import { BoardItem } from './BoardItem';

interface BoardGridProps {
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  const [boardItems, setBoardItems] = useState(board.items);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [activeChainId, setActiveChainId] = useState<string | null>(null);

  const handleDrop = (dropIndex: number) => {
    if (dragStartIndex === null || dragStartIndex === dropIndex) return;

    const swappedArray = swapArrayItems(boardItems, dragStartIndex, dropIndex);

    setBoardItems(swappedArray);
    setDragStartIndex(null);
    setActiveChainId(null);
  };

  return (
    <div className="max-w-[1000px]">
      <Card>
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
          }}
        >
          {boardItems.map((item, index) => (
            <BoardItem
              key={item?.itemId}
              item={item}
              index={index}
              activeChainId={activeChainId}
              setDragStartIndex={setDragStartIndex}
              setActiveChainId={setActiveChainId}
              handleDrop={handleDrop}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
