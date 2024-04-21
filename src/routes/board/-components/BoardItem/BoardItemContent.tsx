import { Button, Card, CardFooter, Spinner } from '@/components';
import { Item } from '@/services';
import { Save } from 'lucide-react';
import { FC, useState } from 'react';
import { BoardItemAdd } from './BoardItemAdd';
import { BoardItemEdit } from './BoardItemEdit';
import { useBoardItemAdd } from './useBoardItemAdd';
import { useBoardItemEdit } from './useBoardItemEdit';

interface BoardItemContentProps {
  item: Item;
  index: number;
  onAfterSave: () => void;
}

export const BoardItemContent: FC<BoardItemContentProps> = (props) => {
  const { item, index } = props;

  const onAfterSave = () => {
    props.onAfterSave();
    setIsDisabled(false);
  };

  const onBeforeSave = () => setIsDisabled(true);

  const { onAddItem, setSelectedItemId } = useBoardItemAdd({
    index,
    onAfterSave,
    onBeforeSave,
  });

  const {
    currentItem,
    isPausedUntil,
    onToggleVisibility,
    onChangeLevel,
    onUnpause,
    onDelete,
    onUpdate,
  } = useBoardItemEdit({ item, onAfterSave, onBeforeSave });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  return (
    <Card>
      <fieldset disabled={isDisabled} className="group">
        {item.itemType ? (
          <BoardItemEdit
            item={currentItem}
            onChangeLevel={onChangeLevel}
            onDelete={onDelete}
            isPausedUntil={isPausedUntil}
            onToggleVisibility={onToggleVisibility}
            onUnpause={onUnpause}
          />
        ) : (
          <BoardItemAdd index={index} setSelectedItemId={setSelectedItemId} />
        )}

        <CardFooter className="justify-center">
          <Spinner className="w-5 h-5 absolute group-enabled:opacity-0" />

          {item.itemType ? (
            <Button
              onClick={onUpdate}
              className="inline-flex group-disabled:pointer-events-none"
            >
              <div className="flex items-center group-disabled:opacity-0">
                <Save className="mr-3" />
                Update Item
              </div>
            </Button>
          ) : (
            <Button
              onClick={onAddItem}
              className="inline-flex group-disabled:pointer-events-none"
            >
              <div className="flex items-center group-disabled:opacity-0">
                <Save className="mr-3" />
                Add Item
              </div>
            </Button>
          )}
        </CardFooter>
      </fieldset>
    </Card>
  );
};
