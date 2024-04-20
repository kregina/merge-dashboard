import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from '@/components';
import { Item, addItemToBoard } from '@/services/board';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { FC, useContext, useState } from 'react';
import { BoardContext } from '../BoardContext';

interface BoardItemAddProps {
  index: number;
}

export const BoardItemAdd: FC<BoardItemAddProps> = ({ index }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const boardContext = useContext(BoardContext);

  if (!boardContext) {
    throw new Error('useBoardItem must be used within a BoardProvider');
  }

  const handleOnValueChange = () => {
    const itemTobeAdded = itemsToBeAdded.find(
      (item) => item.itemId === selectedItemId,
    );

    if (itemTobeAdded) mutation.mutate(itemTobeAdded);
  };

  const mutation = useMutation({
    mutationFn: (itemTobeAdded: Item) =>
      addItemToBoard({
        boardItems: boardContext.boardItems,
        index: index,
        newItem: itemTobeAdded,
      }),
    onSuccess: (data) => {
      boardContext.setBoardItems(data);
      boardContext.closeItem(null);
    },
  });

  return (
    <div className="grid grid-rows-2 gap-4 items-center h-full py-10">
      <Select onValueChange={setSelectedItemId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an item" />
        </SelectTrigger>
        <SelectContent>
          {itemsToBeAdded.map((item) => (
            <SelectItem key={item.itemId} value={item.itemId}>
              {item.itemType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator />

      <div className="flex justify-end">
        <Button onClick={handleOnValueChange}>
          <Save className="mr-4" />
          Add Item
        </Button>
      </div>
    </div>
  );
};
