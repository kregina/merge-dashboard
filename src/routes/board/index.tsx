import {
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
} from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { BoardDragAndDrop } from './-components/BoardDragAndDrop';
import { BoardItem } from './-components/BoardItem';
import { BoardItemAdd } from './-components/BoardItemAdd';
import { BoardItemEdit } from './-components/BoardItemEdit';
import { getBoardQueryOptions } from './-components/boardQueryOptions';
import { useBoard } from './-components/useBoard';

export const Route = createFileRoute('/board/')({
  loader: ({ context }: { context: any }) =>
    context.queryClient.ensureQueryData(getBoardQueryOptions),
  component: BoardComponent,
});

function BoardComponent() {
  const boardQuery = useSuspenseQuery(getBoardQueryOptions);
  const board = boardQuery.data;

  const {
    boardItems,
    editingIndex,
    handleSwapItems,
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    setEditingIndex,
  } = useBoard({ board });

  return (
    <div className="grid md:grid-cols-[auto_1fr] md:gap-20">
      <div className="px-4 md:pt-20 hidden md:block">
        <Card className="rounded-md border-1 bg-background shadow-md">
          <CardHeader className="flex-row items-center gap-4">
            <Lightbulb
              size={42}
              className="shadow-sm rounded-full bg-muted/30 p-2 text-orange-500"
            />
            Tips:
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>Click on an item to edit it.</li>
              <li>Click on the "+" button to add a new item.</li>
              <li>Drag and drop items to reorder them.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <BoardDragAndDrop
        height={board.height}
        width={board.width}
        items={boardItems}
        handleSwappedItems={handleSwapItems}
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
              {item.itemType ? (
                <BoardItemEdit
                  item={item}
                  setDeleteItem={(item) => handleDeleteItem(item.itemId, index)}
                  setOnSaveItem={(item) => handleUpdateItem(item)}
                />
              ) : (
                <BoardItemAdd
                  setAddedItem={(addedItem) => handleAddItem(addedItem, index)}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      ></BoardDragAndDrop>
    </div>
  );
}
