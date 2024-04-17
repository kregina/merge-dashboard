import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface BoardSelectedItemProps {
  item: Item | null;
}
export const BoardSelectedItem: FC<BoardSelectedItemProps> = ({ item }) => {
  return (
    <div className="h-full w-full flex flex-col rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 0.6,
        }}
        className="absolute inset-0 h-full w-full opacity-60 z-10"
      />
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
        className="relative px-8 pb-4 z-[70]"
      >
        {item?.itemId}
      </motion.div>
    </div>
  );
};
