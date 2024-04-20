import { Badge, Tooltip, TooltipContent, TooltipTrigger } from '@/components';
import { format } from 'date-fns';
import { Timer } from 'lucide-react';
import { FC } from 'react';

interface BoardItemBadgeProps {
  pausedUntil: string | null;
  itemLevel?: number | null;
}

export const BoardItemBadge: FC<BoardItemBadgeProps> = ({
  pausedUntil,
  itemLevel,
}) => {
  const isPausedUntil = pausedUntil !== null ? new Date(pausedUntil) : null;

  return (
    <div className="flex flex-col absolute right-0 z-10">
      {itemLevel && (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-teal-300 size-5 p-0 justify-center text-zinc-800">
              {itemLevel}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>Level {itemLevel}</TooltipContent>
        </Tooltip>
      )}
      {isPausedUntil && (
        <Tooltip>
          <TooltipTrigger>
            <Badge className="bg-orange-400 size-5 p-0 justify-center text-zinc-800">
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
