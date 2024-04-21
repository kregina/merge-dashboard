import {
  Item,
  ItemVisibility,
  deleteItemFromBoard,
  updateItemToBoard,
} from '@/services';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useContext, useState } from 'react';
import { BoardContext } from '../BoardContext';

interface UseBoardItemEditProps {
  item: Item;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useBoardItemEdit = (props: UseBoardItemEditProps) => {
  const { item, setIsModalOpen } = props;
  const [currentItem, setCurrentItem] = useState<Item>(item);

  const isPausedUntil = currentItem?.pausedUntil
    ? format(new Date(currentItem?.pausedUntil), 'MM/dd/yyyy hh:mm a')
    : null;

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('useBoardItem must be used within a BoardProvider');
  }

  const mutationUpdate = useMutation({
    mutationFn: (updatedItem: Item) =>
      updateItemToBoard({
        boardItems: boardContext.boardItems,
        updatedItem: updatedItem,
      }),

    onSuccess: (data) => {
      boardContext.setBoardItems(data);
      setIsModalOpen(false);
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
      setIsModalOpen(false);
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

  return {
    currentItem,
    isPausedUntil,
    onToggleVisibility,
    onChangeLevel,
    onUnpause,
    onDelete,
    mutationUpdate,
  };
};
