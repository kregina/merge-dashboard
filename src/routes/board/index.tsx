import { Card, Dialog, DialogContent } from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { Item } from '@/services';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { BoardDragAndDrop } from './-components/BoardDragAndDrop';
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
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSwappedItems = (sourceIndex: number, targetIndex: number) => {
    const swappedArray = swapArrayItems(boardItems, sourceIndex, targetIndex);

    setBoardItems(swappedArray);
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
      <BoardDragAndDrop
        height={board.height}
        width={board.width}
        items={boardItems}
        handleSwappedItems={handleSwappedItems}
        renderItems={(item, index) => (
          <Dialog
            key={item.itemId}
            open={editingIndex === index}
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setEditingIndex(-1);
              }
            }}
          >
            <BoardItem item={item} onClick={() => setEditingIndex(index)} />

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
        )}
      ></BoardDragAndDrop>
    </div>
  );
}
