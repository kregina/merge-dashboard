import { Item, addItemToBoard } from '@/services';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { BoardContext } from '../BoardContext';

interface UseBoardItemAddProps {
  index: number;
  onAfterSave: () => void;
  onBeforeSave: () => void;
}

export const useBoardItemAdd = (params: UseBoardItemAddProps) => {
  const { index, onAfterSave, onBeforeSave } = params;
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('useBoardItem must be used within a BoardProvider');
  }

  const onAddItem = () => {
    const itemTobeAdded = itemsToBeAdded.find(
      (item) => item.itemId === selectedItemId,
    );

    if (itemTobeAdded) mutationAdd.mutate(itemTobeAdded);
  };

  const mutationAdd = useMutation({
    mutationFn: (itemTobeAdded: Item) =>
      addItemToBoard({
        boardItems: boardContext.boardItems,
        index: index,
        newItem: itemTobeAdded,
      }),
    onMutate: () => {
      onBeforeSave();
    },
    onSuccess: (data) => {
      boardContext.setBoardItems(data);
      onAfterSave();
    },
  });

  return {
    onAddItem,
    setSelectedItemId,
  };
};
