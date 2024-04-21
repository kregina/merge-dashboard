import {
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { FC } from 'react';

interface BoardItemAddProps {
  index: number;
  setSelectedItemId: (itemId: string) => void;
}

export const BoardItemAdd: FC<BoardItemAddProps> = ({
  index,
  setSelectedItemId,
}) => {
  return (
    <CardContent className="mt-4">
      <Select onValueChange={setSelectedItemId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose an item" />
        </SelectTrigger>
        <SelectContent className="group-disabled:opacity-50">
          {itemsToBeAdded.map((item) => (
            <SelectItem key={item.itemId} value={item.itemId}>
              {item.itemType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </CardContent>
  );
};
