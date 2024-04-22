import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { Item, ItemVisibility } from '@/services';
import { format } from 'date-fns';
import { Eye, EyeOff, Timer } from 'lucide-react';
import { FC } from 'react';

interface BoardItemBadgeProps {
  item: Item;
}

export const BoardItemBadge: FC<BoardItemBadgeProps> = ({ item }) => {
  const isPausedUntil =
    item?.pausedUntil !== null ? new Date(item?.pausedUntil) : null;

  return (
    <div className="flex flex-col items-center absolute right-0">
      {item?.itemLevel && (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-teal-300 size-5 p-0 justify-center text-zinc-800">
              {item?.itemLevel}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Level {item?.itemLevel}</TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger>
          <Badge className="bg-orange-500 size-5 p-0 justify-center text-zinc-800">
            {item.visibility === ItemVisibility.HIDDEN ? <EyeOff /> : <Eye />}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>{item.visibility} to the player</TooltipContent>
      </Tooltip>
      {isPausedUntil && (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-emerald-500 size-5 p-0 justify-center text-zinc-800">
              <Timer />
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            Paused until {format(isPausedUntil, 'MM/dd/yyyy hh:mm a')}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
