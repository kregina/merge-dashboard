import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Item, updateBoard } from '@/services/board';
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
    console.log('selectedItemId', selectedItemId);
    const itemTobeAdded = itemsToBeAdded.find(
      (item) => item.itemId === selectedItemId,
    );

    console.log('itemTobeAdded', itemTobeAdded);
    if (itemTobeAdded) mutation.mutate(itemTobeAdded);
  };

  const mutation = useMutation({
    mutationFn: (itemTobeAdded: Item) =>
      updateBoard({
        board: boardContext.board,
        index: index,
        newItem: itemTobeAdded,
      }),
    onSuccess: (data) => {
      console.log('data', data);
      boardContext.setBoardItems(data.items);
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

      <div className="flex justify-end">
        <Button variant="ghost" onClick={handleOnValueChange}>
          <Save className="mr-4" />
          Add Item
        </Button>
      </div>
    </div>
  );
};
