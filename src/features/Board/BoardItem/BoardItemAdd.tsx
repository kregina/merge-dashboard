import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Item } from '@/services/board';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { Save } from 'lucide-react';
import { FC } from 'react';

interface BoardItemAddProps {
  item: Item | null;
}

export const BoardItemAdd: FC<BoardItemAddProps> = ({ item }) => {
  const handleOnValueChange = (value: string) => {
    console.log(value);
  };

  return (
    <div className="grid grid-rows-2 gap-4 items-center h-full py-10">
      <Select onValueChange={handleOnValueChange}>
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
        <Button variant="ghost">
          <Save className="mr-4" />
          Add Item
        </Button>
      </div>
    </div>
  );
};
