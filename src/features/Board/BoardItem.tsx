import { Badge, Button } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
import { FC, useState } from 'react';

interface BoardItemProps {
  item: Item | null;
  index: number;
  activeChainId: string | null;
  setDragStartIndex: (index: number) => void;
  setActiveChainId: (chainId: string | null) => void;
  handleDrop: (dropIndex: number) => void;
}

export const BoardItem: FC<BoardItemProps> = (props) => {
  const {
    item,
    index,
    activeChainId,
    setActiveChainId,
    setDragStartIndex,
    handleDrop,
  } = props;

  const [hoveredId, setHoveredId] = useState<string | number | null>(null);

  const defaultClassName = `rounded-lg cursor-grab bg-background
  transition-colors duration-100 ease-in-out
  border
  `;

  const handleOnDragStart = (index: number, chainId: string | null) => {
    setDragStartIndex(index);
    setActiveChainId(chainId);
  };

  const onHandleOnDrop = (index: number) => {
    handleDrop(index);
    setHoveredId(null);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    chainId: string | null,
    index: number | null = null,
  ) => {
    e.preventDefault();
    setHoveredId(chainId || index);
  };

  if (!item?.itemType) {
    return (
      <motion.div
        layout
        onDragOver={(e) => handleOnDragOver(e, null, index)}
        onDrop={() => onHandleOnDrop(index)}
        className={cn(
          defaultClassName,
          'bg-slate-300 dark:bg-slate-950',
          `${hoveredId === index ? 'bg-orange-500 dark:bg-orange-700' : ''}`,
        )}
      >
        <Button variant="ghost">
          <PlusSquare size={24} />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      draggable
      layout
      onDragStart={() => handleOnDragStart(index, item.chainId)}
      onDragOver={(e) => handleOnDragOver(e, item.chainId)}
      onDragLeave={() => setHoveredId(null)}
      onDrop={() => onHandleOnDrop(index)}
      className={cn(
        defaultClassName,
        `${activeChainId === item.chainId ? 'bg-emerald-600 dark:bg-emerald-800' : ''}`,
        `${hoveredId === item.chainId ? 'bg-orange-500 dark:bg-orange-700' : ''}`,
      )}
      whileTap={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex flex-col p-2 relative">
        <Badge className="bg-teal-600 dark:bg-teal-300 absolute right-2">
          {item.itemLevel}
        </Badge>

        <img
          className="m-auto mt-2"
          width={36}
          src={`src/assets/images/board-icons/${item?.icon}`}
          alt={`${item?.chainId} Icon`}
        />
        <small className="inline-block truncate text-center">
          {item?.chainId}
        </small>
      </div>
    </motion.div>
  );
};
