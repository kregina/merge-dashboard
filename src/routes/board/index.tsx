import { Dialog, DialogContent } from '@/components';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
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
    <div className="m-auto">
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
