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
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [draggingOverIndex, setDraggingOverIndex] = useState(-1);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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

  const handleOnDragStart = () => {
    setDraggingIndex(selectedIndex);
  };

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOverIndex(selectedIndex);
  };

  const handleOnDrop = () => {
    const swappedArray = swapArrayItems(
      board.items,
      draggingIndex,
      draggingOverIndex,
    );
    setBoardItems(swappedArray);
  };

  const onAddItem = (addedItem: Item) => {
    if (addedItem) {
      const updatedItems = board.items.map((item, i) => {
        if (i === selectedIndex) {
          return addedItem;
        }
        return item;
      });

      setBoardItems(updatedItems);
      setSelectedIndex(-1);
    }
  };

  const onDelete = (itemId: string) => {
    if (itemId) {
      const emptyItem = {
        itemId: itemId,
      } as Item;

      const updatedItems = board.items.map((item, i) => {
        if (i === selectedIndex) {
          return emptyItem;
        }
        return item;
      });

      setBoardItems(updatedItems);
      setSelectedIndex(-1);
    }
  };

  const onUpdate = (updatedItem: Item) => {
    if (updatedItem) {
      const newItems = board.items.map((item) =>
        item?.itemId === updatedItem.itemId ? updatedItem : item,
      );
      setBoardItems(
        newItems.map((item) => {
          if (item?.itemId === updatedItem.itemId) {
            return updatedItem;
          }
          return item;
        }),
      );
      setSelectedIndex(-1);
    }
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
              open={selectedIndex === index}
              onOpenChange={() => setSelectedIndex(-1)}
            >
              <motion.div
                draggable={!!item?.itemType}
                layout
                className={cn(itemClasses)}
                onDrop={handleOnDrop}
                onDragStart={() => handleOnDragStart()}
                onDragOver={(e) => handleOnDragOver(e)}
              >
                <div
                  className="h-full w-full "
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  <BoardItem item={item} />
                </div>
              </motion.div>

              <DialogContent>
                <Card>
                  {item.itemType ? (
                    <BoardItemEdit
                      item={item}
                      setDeleteItem={(item) => onDelete(item.itemId)}
                      setOnSaveItem={(item) => onUpdate(item)}
                    />
                  ) : (
                    <BoardItemAdd
                      setAddedItem={(addedItem) => onAddItem(addedItem)}
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
