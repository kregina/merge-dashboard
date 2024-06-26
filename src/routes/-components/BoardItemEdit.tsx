import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Input,
  Label,
  Separator,
} from '@/components';
import { Item, ItemVisibility } from '@/services';
import { format } from 'date-fns';
import { Eye, EyeOff, Play, Save, Trash } from 'lucide-react';
import { FC, useState } from 'react';
import { BoardItemImage } from './BoardItemImage';

interface BoardItemEditProps {
  item: Item;
  setOnSaveItem: (item: Item) => void;
  setDeleteItem: (item: Item) => void;
}

export const BoardItemEdit: FC<BoardItemEditProps> = (props) => {
  const { item, setOnSaveItem, setDeleteItem } = props;

  const [currentItem, setCurrentItem] = useState(item);

  const isPausedUntil = currentItem.pausedUntil
    ? format(new Date(currentItem.pausedUntil), 'MM/dd/yyyy hh:mm a')
    : null;

  const fieldWrapperClasses =
    'flex items-center space-x-2 justify-between mb-4';

  const handleUpdateItem = (updatedItemProps: Partial<Item>) => {
    setCurrentItem({ ...currentItem, ...updatedItemProps });
  };

  const handleOnSave = () => {
    setOnSaveItem(currentItem);
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg flex justify-between mb-4">
          {currentItem.chainId}
          <div>
            {currentItem.isInsideBubble && (
              <Badge className="mr-4 bg-teal-600 dark:bg-teal-300">
                Inside Bubble
              </Badge>
            )}

            <Button
              variant="destructive"
              className="border"
              onClick={() => setDeleteItem(item)}
            >
              <Trash className=" h-4 w-4" />
            </Button>
          </div>
        </h1>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col justify-center">
        <div className="relative self-center">
          <BoardItemImage item={currentItem} />
        </div>
        <div>
          <div className="flex items-center space-x-2 justify-between mb-4">
            <Label htmlFor="level">Level:</Label>
            <Input
              id="level"
              type="number"
              defaultValue={currentItem.itemLevel || 1}
              min={1}
              max={50}
              className="w-auto text-center"
              onChange={(e) => handleUpdateItem({ itemLevel: +e.target.value })}
            />
          </div>

          <div className={fieldWrapperClasses}>
            <p>
              Item is
              <span className="text-orange-500">
                {' '}
                {currentItem.visibility}
              </span>{' '}
              to the player.
            </p>

            <Button
              variant="ghost"
              className="border"
              onClick={() => {
                handleUpdateItem({
                  visibility:
                    currentItem.visibility === ItemVisibility.VISIBLE
                      ? ItemVisibility.HIDDEN
                      : ItemVisibility.VISIBLE,
                });
              }}
            >
              {currentItem.visibility === ItemVisibility.VISIBLE ? (
                <Eye className="mr-2 h-4 w-4" />
              ) : (
                <EyeOff className="mr-2 h-4 w-4" />
              )}
              Toggle Visibility
            </Button>
          </div>

          {isPausedUntil && (
            <div className={fieldWrapperClasses}>
              <p>
                Is paused until
                <span className="text-orange-500">
                  {` ${isPausedUntil?.toLocaleString()}`}
                </span>
              </p>

              <Button
                variant="ghost"
                className="border"
                onClick={() => handleUpdateItem({ pausedUntil: null })}
              >
                <Play className="mr-2 h-4 w-4" />
                Unpause
              </Button>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>

      <CardFooter className="justify-end">
        <Button onClick={handleOnSave}>
          <Save className="mr-3" />
          Update Item
        </Button>
      </CardFooter>
    </Card>
  );
};
