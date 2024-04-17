import { Badge, Button, Input, Label, Separator } from '@/components';
import { Item, ItemVisibility } from '@/services/board';
import { format } from 'date-fns';
import { Eye, EyeOff, Play } from 'lucide-react';
import { FC } from 'react';

interface BoardItemEditProps {
  item: Item | null;
}

export const BoardItemEdit: FC<BoardItemEditProps> = ({ item }) => {
  const isPausedUntil = item?.pausedUntil
    ? format(new Date(item?.pausedUntil), 'MM/dd/yyyy hh:mm a')
    : null;

  return (
    <div className="flex gap-4 flex-col py-8">
      <h1 className="text-lg flex justify-between">
        {item?.itemType}
        {item?.isInsideBubble && (
          <Badge className="ml-4 bg-teal-600 dark:bg-teal-300">
            Inside Bubble
          </Badge>
        )}
      </h1>

      <Separator />

      <div className="flex items-center space-x-2 ">
        <Label htmlFor="level">Level:</Label>
        <Input
          id="level"
          type="number"
          defaultValue={item?.itemLevel || 1}
          min={1}
          max={50}
          className="w-auto text-center"
        />
      </div>

      <div className="flex items-center space-x-2 justify-between">
        <p>
          Item is
          <span className="text-orange-500"> {item?.visibility}</span> to the
          player.
        </p>

        <Button variant="ghost" className="border">
          {item?.visibility === ItemVisibility.VISIBLE ? (
            <Eye className="mr-2 h-4 w-4" />
          ) : (
            <EyeOff className="mr-2 h-4 w-4" />
          )}
          Toggle Visibility
        </Button>
      </div>

      {isPausedUntil && (
        <div className="flex items-center space-x-2 justify-between">
          <p>
            Is paused until
            <span className="text-orange-500">
              {` ${isPausedUntil?.toLocaleString()}`}
            </span>
          </p>

          <Button variant="ghost" className="border">
            <Play className="mr-2 h-4 w-4" />
            Unpause
          </Button>
        </div>
      )}
    </div>
  );
};
