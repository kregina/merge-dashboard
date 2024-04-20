import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface BoardItemImageProps {
  icon: string;
  chainId: string | null;
  isInsideBubble: boolean | null;
}

export const BoardItemImage: FC<BoardItemImageProps> = ({
  icon,
  chainId,
  isInsideBubble,
}) => (
  <Tooltip>
    <TooltipTrigger>
      {isInsideBubble ? (
        <motion.div
          className="relative w-full h-full lg:h-[67px]"
          animate={{ y: ['2px', '-2px'] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <img
            src="src/assets/images/bubbles.png"
            className="absolute opacity-60 -top-2 lg:w-[100%] z-[4]"
            alt="Bubble"
          />
          <img
            className="mx-auto lg:w-[50%] relative top-4 z-[3]"
            src={`src/assets/images/board-icons/${icon}`}
            alt={`${chainId} Icon`}
          />
        </motion.div>
      ) : (
        <img
          className="m-auto lg:w-[75%]"
          src={`src/assets/images/board-icons/${icon}`}
          alt={`${chainId} Icon`}
        />
      )}
    </TooltipTrigger>
    <TooltipContent>{`${chainId} ${isInsideBubble ? 'is inside bubble' : ''}`}</TooltipContent>
  </Tooltip>
);
