import { Card, Dialog, DialogContent } from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { BoardGrid } from './-components/BoardGrid';
import { BoardItem } from './-components/BoardItem/BoardItem';
import { BoardItemAdd } from './-components/BoardItem/BoardItemAdd';
import { BoardItemEdit } from './-components/BoardItem/BoardItemEdit';
import { getBoardQueryOptions } from './-components/boardQueryOptions';

export const Route = createFileRoute('/board/')({
  loader: ({ context }: { context: any }) =>
    context.queryClient.ensureQueryData(getBoardQueryOptions),
  component: BoardComponent,
});

function BoardComponent() {
  const boardQuery = useSuspenseQuery(getBoardQueryOptions);
  const board = boardQuery.data;

  const [boardItems, setBoardItems] = useState(board.items);
  const [dragSourceIndex, setDragSourceIndex] = useState(-1);
  const [dragTargetIndex, setDragTargetIndex] = useState(-1);
  const [editingIndex, setEditingIndex] = useState(-1);

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
    setDragSourceIndex(index);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setDragTargetIndex(index);
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const swappedArray = swapArrayItems(
      boardItems,
      dragSourceIndex,
      dragTargetIndex,
    );

    setBoardItems(swappedArray);
    setDragSourceIndex(-1);
    setDragTargetIndex(-1);
  };

  const handleAddItem = (addedItem: Item, index: number) => {
    if (addedItem) {
      const updatedItems = boardItems.map((item, i) =>
        i === index ? addedItem : item,
      );

      setBoardItems(updatedItems);
    }
    setEditingIndex(-1);
  };

  const handleDeleteItem = (itemId: string, index: number) => {
    if (itemId) {
      const emptyItem = {
        itemId: itemId,
      } as Item;

      const updatedItems = boardItems.map((item, i) =>
        i === index ? emptyItem : item,
      );

      setBoardItems(updatedItems);
    }
    setEditingIndex(-1);
  };

  const handleUpdateItem = (updatedItem: Item) => {
    if (updatedItem) {
      const newItems = boardItems.map((item) =>
        item?.itemId === updatedItem.itemId ? updatedItem : item,
      );
      setBoardItems(newItems);
    }
    setEditingIndex(-1);
  };

  return (
    <div className="m-auto">
      <BoardGrid board={board}>
        {boardItems.map((item, index) => (
          <div
            key={item.itemId}
            className="col-span-1 p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded lg:w-[90px]"
          >
            <Dialog
              open={editingIndex === index}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setEditingIndex(-1);
                }
              }}
            >
              <motion.div
                draggable={!!item?.itemType}
                layout
                className={cn(itemClasses)}
                onDrop={handleOnDrop}
                onDragStart={() => handleOnDragStart(index)}
                onDragOver={(e) => handleOnDragOver(e, index)}
              >
                <BoardItem item={item} onClick={() => setEditingIndex(index)} />
              </motion.div>

              <DialogContent>
                <Card>
                  {item.itemType ? (
                    <BoardItemEdit
                      item={item}
                      setDeleteItem={(item) =>
                        handleDeleteItem(item.itemId, index)
                      }
                      setOnSaveItem={(item) => handleUpdateItem(item)}
                    />
                  ) : (
                    <BoardItemAdd
                      setAddedItem={(addedItem) =>
                        handleAddItem(addedItem, index)
                      }
                    />
                  )}
                </Card>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </BoardGrid>
    </div>
  );
}
