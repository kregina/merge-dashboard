import { Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { motion } from 'framer-motion';
import { FC } from 'react';

interface BoardItemImageProps {
  icon: string;
  isSelected: boolean;
  chainId: string | null;
  isInsideBubble: boolean | null;
}

export const BoardItemImage: FC<BoardItemImageProps> = ({
  icon,
  isSelected,
  chainId,
  isInsideBubble,
}) => (
  <Tooltip>
    <TooltipTrigger>
      <div className="w-full h-full flex">
        {isInsideBubble && (
          <motion.div
            className="absolute w-full h-full"
            animate={{ y: ['2px', '-2px'] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          >
            <img
              src="src/assets/images/bubbles.png"
              className="absolute opacity-70 -top-2 w-[110%]"
            />
          </motion.div>
        )}
        <img
          width={`${isSelected ? '64' : '80%'}`}
          className="m-auto"
          src={`src/assets/images/board-icons/${icon}`}
          alt={`${chainId} Icon`}
        />
      </div>
    </TooltipTrigger>
    <TooltipContent>{`${chainId} ${isInsideBubble ? 'is inside bubble' : ''}`}</TooltipContent>
  </Tooltip>
);
