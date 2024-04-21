import { Card } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { motion } from 'framer-motion';
import { FC, ReactNode, useMemo, useState } from 'react';

interface BoardGridProps {
  width: number;
  height: number;
  items: Item[];
  renderItems: (item: Item, index: number) => ReactNode;
  handleSwappedItems: (sourceIndex: number, targetIndex: number) => void;
}

export const BoardDragAndDrop: FC<BoardGridProps> = ({
  items,
  height,
  width,
  renderItems,
  handleSwappedItems,
}) => {
  const [dragSourceIndex, setDragSourceIndex] = useState(-1);
  const [dragTargetIndex, setDragTargetIndex] = useState(-1);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${height}, minmax(0, 1fr))`,
    }),
    [width, height],
  );

  // const isHovered = hoveredId === item?.chainId;

  const itemClasses = useMemo(
    () =>
      cn(
        'rounded cursor-grab transition-colors duration-100 ease-in-out relative overflow-hidden h-full',
        // isActive && 'bg-emerald-600 dark:bg-emerald-800',
        // isHovered && 'bg-orange-500 dark:bg-orange-700',
      ),
    [],
  );

  const handleOnDragStart = (index: number) => {
    setDragSourceIndex(index);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setDragTargetIndex(index);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    handleSwappedItems(dragSourceIndex, dragTargetIndex);

    setDragSourceIndex(-1);
    setDragTargetIndex(-1);
  };

  return (
    <Card>
      <div
        className="w-full h-full grid border-4 border-[#c2a061] bg-[#e4dccc] rounded-xl p-1 gap-1"
        style={gridStyle}
      >
        {items.map((item, index) => (
          <div
            key={item.itemId}
            className="p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded lg:w-[90px] h-full"
          >
            <motion.div
              draggable={!!item?.itemType}
              layout
              className={cn(itemClasses)}
              onDrop={handleOnDrop}
              onDragStart={() => handleOnDragStart(index)}
              onDragOver={(e) => handleOnDragOver(e, index)}
            >
              {renderItems(item, index)}
            </motion.div>
          </div>
        ))}
      </div>
    </Card>
  );
};
