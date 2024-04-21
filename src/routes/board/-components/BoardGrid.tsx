import {
  Button,
  Card,
  CardFooter,
  Dialog,
  DialogContent,
  Spinner,
} from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import {
  Item,
  addItemToBoard,
  deleteItemFromBoard,
  updateItemToBoard,
} from '@/services';
import { itemsToBeAdded } from '@/services/data/itemsTobeAdded';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Save } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useBoardContext } from './BoardContext';
import { BoardItem } from './BoardItem/BoardItem';
import { BoardItemContent } from './BoardItem/BoardItemContent';

export const BoardGrid = () => {
  const context = useBoardContext();

  const [board, setBoard] = useState(context.board);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [hoverIndex, setHoveredIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [updatedItem, setItemUpdated] = useState({} as Item);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
    }),
    [board.width, board.height],
  );

  // const isHovered = hoveredId === item?.chainId;

  const itemClasses = useMemo(
    () =>
      cn(
        'rounded cursor-grab transition-colors duration-100 ease-in-out relative overflow-hidden h-full',
        // isActive && 'bg-emerald-600 dark:bg-emerald-800',
        // isHovered && 'bg-orange-500 dark:bg-orange-700',
      ),
    [],
  );

  const handleOnDragStart = (index: number) => {
    setSelectedIndex(index);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setHoveredIndex(index);
  };

  const handleOnDrop = () => {
    const swappedArray = swapArrayItems(board.items, selectedIndex, hoverIndex);
    setBoard({ ...board, items: swappedArray });
  };

  const onAddItem = (index: number) => {
    const itemTobeAdded = itemsToBeAdded.find(
      (item) => item.itemId === selectedItemId,
    );

    if (itemTobeAdded) {
      mutationAddItem.mutate({ itemTobeAdded, index });
    }
  };

  const mutationAddItem = useMutation<
    Item[],
    Item,
    { itemTobeAdded: Item; index: number }
  >({
    mutationFn: async ({ itemTobeAdded, index }) =>
      addItemToBoard({
        boardItems: board.items,
        index: index,
        newItem: itemTobeAdded,
      }),
    onMutate: () => {
      setIsDisabled(true);
    },
    onSuccess: (data) => {
      setBoard({ ...board, items: data });
      setIsDisabled(false);
      setIsModalOpen(false);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: (item: Item) =>
      updateItemToBoard({
        boardItems: board.items,
        updatedItem: item,
      }),

    onMutate: () => {
      setIsDisabled(true);
    },
    onSuccess: (data) => {
      setBoard({ ...board, items: data });
      setIsDisabled(false);
    },
    onSettled: () => {
      setIsModalOpen(false);
      setSelectedItemId(null);
      setItemUpdated({} as Item);
    },
  });

  const mutationDelete = useMutation<
    Item[],
    number,
    { itemId: string; index: number }
  >({
    mutationFn: async ({ itemId, index }) =>
      deleteItemFromBoard({
        boardItems: board.items,
        itemId: itemId,
        index: index,
      }),
    onMutate: () => {
      setIsDisabled(true);
    },
    onSuccess: (data) => {
      setBoard({ ...board, items: data });
      setIsDisabled(false);
    },
    onSettled: () => {
      setIsModalOpen(false);
      setSelectedItemId(null);
      setItemUpdated({} as Item);
    },
  });

  const onDelete = (itemId: string, index: number) => {
    if (itemId) {
      mutationDelete.mutate({ itemId, index });
    }
  };

  const onUpdate = () => {
    if (updatedItem) {
      mutationUpdate.mutate(updatedItem);
    }
  };

  return (
    <div className="m-auto">
      <Card>
        <div
          className="w-full h-full grid border-4 border-[#c2a061] bg-[#e4dccc] rounded-xl p-1 gap-1"
          style={gridStyle}
        >
          {board.items.map((item, index) => (
            <div
              key={item.itemId}
              className="col-span-1 p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded lg:w-[90px]"
            >
              <Dialog
                onOpenChange={setIsModalOpen}
                open={item.itemId === updatedItem.itemId && isModalOpen}
              >
                <motion.div
                  draggable={!!item?.itemType}
                  layout
                  className={cn(itemClasses)}
                  onDrop={handleOnDrop}
                  onDragStart={() => handleOnDragStart(index)}
                  onDragOver={(e) => handleOnDragOver(e, index)}
                >
                  <div
                    className="w-full h-full"
                    onClick={() => {
                      setItemUpdated(item);
                      setIsModalOpen(true);
                    }}
                  >
                    <BoardItem item={item} setIsModalOpen={setIsModalOpen} />
                  </div>
                </motion.div>

                <DialogContent>
                  <Card>
                    <fieldset disabled={isDisabled} className="group">
                      <BoardItemContent
                        item={updatedItem}
                        index={index}
                        setItemUpdated={setItemUpdated}
                        onDelete={() => onDelete(item.itemId, index)}
                        setSelectedItemId={setSelectedItemId}
                      />

                      <CardFooter className="justify-center">
                        <Spinner className="w-5 h-5 absolute group-enabled:opacity-0" />

                        {item.itemType ? (
                          <Button
                            onClick={() => onUpdate()}
                            className="inline-flex group-disabled:pointer-events-none"
                          >
                            <div className="flex items-center group-disabled:opacity-0">
                              <Save className="mr-3" />
                              Update Item
                            </div>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => onAddItem(index)}
                            className="inline-flex group-disabled:pointer-events-none"
                          >
                            <div className="flex items-center h-full w-full group-disabled:opacity-0">
                              <Save className="mr-3" />
                              Add Item
                            </div>
                          </Button>
                        )}
                      </CardFooter>
                    </fieldset>
                  </Card>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
