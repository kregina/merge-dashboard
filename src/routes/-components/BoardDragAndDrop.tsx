import { Card, CardContent } from '@/components';
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
      <CardContent
        className="max-w-[40rem] grid border-4 border-[#c2a061] bg-[#e4dccc] rounded-xl p-1 gap-1 mt-20 md:mt-0"
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
              className={cn(
                'rounded transition-colors cursor-pointer duration-100 ease-in-out relative overflow-hidden h-full',
                `${items[dragTargetIndex] === items[index] && 'bg-emerald-500'}`,
                `${
                  items[index]?.chainId &&
                  items[dragSourceIndex]?.chainId === items[index]?.chainId &&
                  'bg-orange-500'
                }`,
              )}
              onDrop={handleOnDrop}
              onMouseOver={() => handleOnDragStart(index)}
              onMouseLeave={() => setDragSourceIndex(-1)}
              onDragStart={() => handleOnDragStart(index)}
              onDragOver={(e) => handleOnDragOver(e, index)}
            >
              {renderItems(item, index)}
            </motion.div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
