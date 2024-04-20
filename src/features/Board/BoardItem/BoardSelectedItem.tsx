import { Item } from '@/services';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BoardItemAdd } from './BoardItemAdd';
import { BoardItemEdit } from './BoardItemEdit';

interface BoardSelectedItemProps {
  item: Item | null;
  index: number;
}
export const BoardSelectedItem: FC<BoardSelectedItemProps> = ({
  item,
  index,
}) => {
  return (
    <div className="h-full w-[80%] flex flex-col relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        className="px-8 pb-4 z-[70] h-full"
      >
        {item?.itemType ? (
          <BoardItemEdit item={item} />
        ) : (
          <BoardItemAdd index={index} />
        )}
      </motion.div>
    </div>
  );
};
