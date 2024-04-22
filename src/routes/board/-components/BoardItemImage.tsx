import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { Item } from '@/services';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface BoardItemImageProps {
  item: Item;
}

export const BoardItemImage: FC<BoardItemImageProps> = ({ item }) => {
  const renderImage = (iconUrl: string | null, classes?: string) => (
    <img className={classes} src={`${iconUrl}`} alt={`${item.chainId} Icon`} />
  );
  return (
    <Tooltip>
      <TooltipTrigger>
        {item.isInsideBubble ? (
          <motion.div
            className="relative w-[85%] h-full lg:h-[67px] top-2"
            animate={{ y: ['2px', '-2px'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img
              src="src/assets/images/bubbles.png"
              className="absolute opacity-60 -top-2 lg:w-[90%] z-[4]"
              alt="Bubble"
            />
            {renderImage(
              `src/assets/images/board-icons/${item.icon}`,
              'mx-auto lg:w-[50%] relative top-4 z-[3]',
            )}
          </motion.div>
        ) : (
          renderImage(
            `src/assets/images/board-icons/${item.icon}`,
            'm-auto lg:w-[75%]',
          )
        )}
      </TooltipTrigger>
      <TooltipContent>{`${item.chainId} ${item.isInsideBubble ? 'is inside bubble' : ''}`}</TooltipContent>
    </Tooltip>
  );
};
