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
import { Eye, EyeOff, Play, Save, Trash } from 'lucide-react';
import { FC, useMemo } from 'react';
import { BoardItemImage } from './BoardItemImage';
import { useBoardItemEdit } from './useBoardItemEdit';

interface BoardItemEditProps {
  item: Item;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const BoardItemEdit: FC<BoardItemEditProps> = ({
  item,
  setIsModalOpen,
}) => {
  const {
    currentItem,
    isPausedUntil,
    onToggleVisibility,
    onChangeLevel,
    onUnpause,
    onDelete,
    mutationUpdate,
  } = useBoardItemEdit({ item, setIsModalOpen });

  const fieldWrapperClasses = useMemo(
    () => 'flex items-center space-x-2 justify-between mb-4',
    [currentItem],
  );

  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg flex justify-between mb-4">
          {currentItem?.chainId}
          <div>
            {currentItem?.isInsideBubble && (
              <Badge className="mr-4 bg-teal-600 dark:bg-teal-300">
                Inside Bubble
              </Badge>
            )}

            <Button variant="destructive" className="border" onClick={onDelete}>
              <Trash className=" h-4 w-4" />
            </Button>
          </div>
        </h1>
        <Separator />
      </CardHeader>

      <CardContent className="flex flex-col justify-center">
        <div className="relative self-center">
          <BoardItemImage
            chainId={currentItem?.chainId}
            icon={currentItem.icon || ''}
            isInsideBubble={currentItem?.isInsideBubble}
          />
        </div>
        <div>
          <div className={fieldWrapperClasses}>
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

          <div className={fieldWrapperClasses}>
            <p>
              Item is
              <span className="text-orange-500">
                {' '}
                {currentItem?.visibility}
              </span>{' '}
              to the player.
            </p>

            <Button
              variant="ghost"
              className="border"
              onClick={onToggleVisibility}
            >
              {currentItem?.visibility === ItemVisibility.VISIBLE ? (
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

              <Button variant="ghost" className="border" onClick={onUnpause}>
                <Play className="mr-2 h-4 w-4" />
                Unpause
              </Button>
            </div>
          )}
        </div>
        <Separator />
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => currentItem && mutationUpdate.mutate(currentItem)}
        >
          <Save className="mr-4" />
          Update Item
        </Button>
      </CardFooter>
    </Card>
  );
};
