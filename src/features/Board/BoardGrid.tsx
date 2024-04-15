import { Card } from '@/components';
import { cn } from '@/lib/utils';
import { Board } from '@/services/board';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';

interface BoardGridProps {
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  const [boardItems, setBoardItems] = useState(board.items);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [activeChainId, setActiveChainId] = useState<string | null>(null);

  const handleDragStart = (index: number) => {
    setDragStartIndex(index);
  };

  const handleDrop = (dropIndex: number) => {
    if (dragStartIndex === null || dragStartIndex === dropIndex) return;

    const itemsCopy = [...boardItems];

    const temp = itemsCopy[dragStartIndex];
    itemsCopy[dragStartIndex] = itemsCopy[dropIndex];
    itemsCopy[dropIndex] = temp;

    setBoardItems(itemsCopy);
    setDragStartIndex(null);
    setActiveChainId(null);
  };

  return (
    <div className="max-w-[1000px]">
      <Card>
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
          }}
        >
          {boardItems.map((item, index) => {
            return (
              <motion.div
                key={item?.itemId}
                draggable={!!item?.itemType}
                layout={!!item?.itemType}
                onDragStart={() => {
                  console.log('drag start', item?.chainId);
                  setActiveChainId(item?.chainId || null);
                  handleDragStart(index);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setActiveChainId(item?.chainId || null);
                }}
                onDrop={() => handleDrop(index)}
                className={cn(
                  'p-4 rounded cursor-grab',
                  'bg-orange-300 dark:bg-orange-900',
                  `${activeChainId === item?.chainId ? 'bg-emerald-600 dark:bg-emerald-800' : ''}`,
                )}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
                }}
                whileTap={{
                  scale: 1.12,
                  boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
                }}
              >
                <p className="truncate">{item?.itemType}</p>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
