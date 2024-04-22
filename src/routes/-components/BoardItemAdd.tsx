import {
  Button,
  Card,
  CardContent,
  CardFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { Item } from '@/services';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { Save } from 'lucide-react';
import { FC, useState } from 'react';

interface BoardItemAddProps {
  setAddedItem: (item: Item) => void;
}

export const BoardItemAdd: FC<BoardItemAddProps> = ({ setAddedItem }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOnAdd = () => {
    const itemTobeAdded = itemsToBeAdded.find(
      (item) => item.itemId === selectedId,
    );

    if (itemTobeAdded) {
      setAddedItem(itemTobeAdded);
    }
  };

  return (
    <Card>
      <CardContent className="mt-4">
        <Select onValueChange={setSelectedId}>
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
      </CardContent>
      <CardFooter className="justify-end">
        <Button onClick={handleOnAdd}>
          <Save className="mr-3" />
          Add Item
        </Button>
      </CardFooter>
    </Card>
  );
};
