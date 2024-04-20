import { Badge, Button, Input, Label, Separator } from '@/components';
import {
  Item,
  ItemVisibility,
  deleteItemFromBoard,
  updateItemToBoard,
} from '@/services/board';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Eye, EyeOff, Play, Save, Trash } from 'lucide-react';
import { FC, useContext, useState } from 'react';
import { BoardContext } from '../BoardContext';

interface BoardItemEditProps {
  item: Item | null;
}

export const BoardItemEdit: FC<BoardItemEditProps> = ({ item }) => {
  const [currentItem, setCurrentItem] = useState<Item | null>(item);

  const isPausedUntil = currentItem?.pausedUntil
    ? format(new Date(currentItem?.pausedUntil), 'MM/dd/yyyy hh:mm a')
    : null;

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('useBoardItem must be used within a BoardProvider');
  }

  const mutation = useMutation({
    mutationFn: (updatedItem: Item) =>
      updateItemToBoard({
        boardItems: boardContext.boardItems,
        updatedItem: updatedItem,
      }),

    onSuccess: (data) => {
      boardContext.setBoardItems(data);
      boardContext.closeItem(null);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (itemId: string) =>
      deleteItemFromBoard({
        boardItems: boardContext.boardItems,
        itemId: itemId,
        index: boardContext.boardItems.findIndex(
          (item) => item?.itemId === itemId,
        ),
      }),

    onSuccess: (data) => {
      boardContext.setBoardItems(data);
      boardContext.closeItem(null);
    },
  });

  const onToggleVisibility = () => {
    setCurrentItem((prev) => {
      return {
        ...prev!,
        visibility:
          prev?.visibility === ItemVisibility.VISIBLE
            ? ItemVisibility.HIDDEN
            : ItemVisibility.VISIBLE,
      };
    });
  };

  const onChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem((prev) => {
      return {
        ...prev!,
        itemLevel: parseInt(e.target.value),
      };
    });
  };

  const onUnpause = () => {
    setCurrentItem((prev) => {
      return {
        ...prev!,
        pausedUntil: null,
      };
    });
  };

  const onDelete = () => {
    if (currentItem) {
      mutationDelete.mutate(currentItem.itemId);
    }
  };

  return (
    <div className="flex gap-4 flex-col py-8">
      <h1 className="text-lg flex justify-between">
        {currentItem?.itemType}
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
        <Button onClick={() => currentItem && mutation.mutate(currentItem)}>
          <Save className="mr-4" />
          Update Item
        </Button>
      </div>
    </div>
  );
};
