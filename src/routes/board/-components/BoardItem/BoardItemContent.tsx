import { Item, ItemVisibility } from '@/services';
import { format } from 'date-fns';
import { FC } from 'react';
import { BoardItemAdd } from './BoardItemAdd';
import { BoardItemEdit } from './BoardItemEdit';

interface BoardItemContentProps {
  item: Item;
  index: number;
  setSelectedItemId: (itemId: string | null) => void;
  onDelete: (itemId: string, index: number) => void;
  setItemUpdated: (item: Item) => void;
}

export const BoardItemContent: FC<BoardItemContentProps> = (props) => {
  const { item, index, setSelectedItemId, onDelete, setItemUpdated } = props;

  const onToggleVisibility = () => {
    setItemUpdated({
      ...item,
      visibility:
        item.visibility === ItemVisibility.VISIBLE
          ? ItemVisibility.HIDDEN
          : ItemVisibility.VISIBLE,
    });
  };

  const onChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemUpdated({
      ...item,
      itemLevel: Number(e.target.value),
    });
  };

  const onUnpause = () => {
    setItemUpdated({
      ...item,
      pausedUntil: null,
    });
  };

  const isPausedUntil = item.pausedUntil
    ? format(new Date(item.pausedUntil), 'MM/dd/yyyy hh:mm a')
    : null;

  return (
    <>
      {item.itemType ? (
        <BoardItemEdit
          item={item}
          onChangeLevel={onChangeLevel}
          onDelete={() => onDelete(item.itemId, index)}
          isPausedUntil={isPausedUntil}
          onToggleVisibility={onToggleVisibility}
          onUnpause={onUnpause}
        />
      ) : (
        <BoardItemAdd index={index} setSelectedItemId={setSelectedItemId} />
      )}
    </>
  );
};
