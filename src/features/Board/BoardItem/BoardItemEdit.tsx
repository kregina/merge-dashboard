import { Badge, Button, Input, Label, Separator } from '@/components';
import { Item, ItemVisibility } from '@/services';
import { Eye, EyeOff, Play, Save, Trash } from 'lucide-react';
import { FC } from 'react';
import { useBoardItemEdit } from './useBoardItemEdit';

interface BoardItemEditProps {
  item: Item;
}

export const BoardItemEdit: FC<BoardItemEditProps> = ({ item }) => {
  const {
    currentItem,
    isPausedUntil,
    onToggleVisibility,
    onChangeLevel,
    onUnpause,
    onDelete,
    mutationUpdate,
  } = useBoardItemEdit({ item });

  return (
    <div className="flex gap-4 flex-col py-8">
      <h1 className="text-lg flex justify-between">
        {currentItem?.chainId}
        {currentItem?.isInsideBubble && (
          <Badge className="ml-4 bg-teal-600 dark:bg-teal-300">
            Inside Bubble
          </Badge>
        )}

        <Button variant="ghost" className="border" onClick={onDelete}>
          <Trash className=" h-4 w-4" />
        </Button>
      </h1>

      <Separator />

      <div className="flex items-center space-x-2 justify-between">
        <Label htmlFor="level">Level:</Label>
        <Input
          id="level"
          type="number"
          defaultValue={currentItem?.itemLevel || 1}
          min={1}
          max={50}
          className="w-auto text-center"
          onChange={onChangeLevel}
        />
      </div>

      <div className="flex items-center space-x-2 justify-between">
        <p>
          Item is
          <span className="text-orange-500"> {currentItem?.visibility}</span> to
          the player.
        </p>

        <Button variant="ghost" className="border" onClick={onToggleVisibility}>
          {currentItem?.visibility === ItemVisibility.VISIBLE ? (
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

          <Button variant="ghost" className="border" onClick={onUnpause}>
            <Play className="mr-2 h-4 w-4" />
            Unpause
          </Button>
        </div>
      )}

      <Separator />

      <div className="flex justify-end">
        <Button
          onClick={() => currentItem && mutationUpdate.mutate(currentItem)}
        >
          <Save className="mr-4" />
          Update Item
        </Button>
      </div>
    </div>
  );
};
