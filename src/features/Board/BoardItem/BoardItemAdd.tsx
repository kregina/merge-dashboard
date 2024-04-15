import { Button } from '@/components';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
import { FC } from 'react';

interface BoardItemAddProps {
  index: number;
  hoveredId: string | number | null;
  handleOnDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    chainId: string | null,
    index: number | null,
  ) => void;
  handleOnDragLeave: () => void;
  onHandleOnDrop: (index: number) => void;
  defaultClassName: string;
}

export const BoardItemAdd: FC<BoardItemAddProps> = (props) => {
  const {
    index,
    hoveredId,
    handleOnDragOver,
    handleOnDragLeave,
    onHandleOnDrop,
    defaultClassName,
  } = props;

  return (
    <motion.div
      layout
      onDragOver={(e) => handleOnDragOver(e, null, index)}
      onDrop={() => onHandleOnDrop(index)}
      onDragLeave={handleOnDragLeave}
      className={cn(
        defaultClassName,
        'bg-slate-300 dark:bg-slate-950',
        `${hoveredId === index ? 'bg-orange-500 dark:bg-orange-700' : ''}`,
      )}
    >
      <Button variant="ghost" className="w-full h-full">
        <PlusSquare size={24} />
      </Button>
    </motion.div>
  );
};
