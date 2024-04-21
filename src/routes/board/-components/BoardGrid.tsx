import { Card, Dialog, DialogContent } from '@/components';
import { swapArrayItems } from '@/lib/swapArrayItems';
import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useBoardContext } from './BoardContext';
import { BoardItem } from './BoardItem/BoardItem';
import { BoardItemAdd } from './BoardItem/BoardItemAdd';
import { BoardItemEdit } from './BoardItem/BoardItemEdit';

export const BoardGrid = () => {
  const context = useBoardContext();

  const [board, setBoard] = useState(context.board);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [draggingOverIndex, setDraggingOverIndex] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

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
    setDraggingIndex(index);
  };

  const handleOnDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
  ) => {
    e.preventDefault();
    setDraggingOverIndex(index);
  };

  const handleOnDrop = () => {
    const swappedArray = swapArrayItems(
      board.items,
      draggingIndex,
      draggingOverIndex,
    );
    setBoard({ ...board, items: swappedArray });
  };

  const onAddItem = (addedItem: Item, index: number) => {
    if (addedItem) {
      setBoard((prevBoard) => {
        const updatedItems = [
          ...prevBoard.items.slice(0, index),
          addedItem,
          ...prevBoard.items.slice(index + 1),
        ];
        return { ...prevBoard, items: updatedItems };
      });
      setSelectedIndex(-1);
    }
  };

  const onDelete = (itemId: string, index: number) => {
    if (itemId) {
      const emptyItem = {
        itemId: itemId,
      } as Item;

      const newBoard = [
        ...board.items.slice(0, index),
        emptyItem,
        ...board.items.slice(index + 1),
      ];

      setBoard({ ...board, items: newBoard });
      setSelectedIndex(-1);
    }
  };

  const onUpdate = (updatedItem: Item) => {
    if (updatedItem) {
      const newItems = board.items.map((item) =>
        item?.itemId === updatedItem.itemId ? updatedItem : item,
      );
      setBoard({ ...board, items: newItems });
      setSelectedIndex(-1);
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
              <Dialog open={selectedIndex === index}>
                <motion.div
                  draggable={!!item?.itemType}
                  layout
                  className={cn(itemClasses)}
                  onDrop={handleOnDrop}
                  onDragStart={() => handleOnDragStart(index)}
                  onDragOver={(e) => handleOnDragOver(e, index)}
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
                        setDeleteItem={(item) => onDelete(item.itemId, index)}
                        setOnSaveItem={(item) => onUpdate(item)}
                      />
                    ) : (
                      <BoardItemAdd
                        setAddedItem={(addedItem) =>
                          onAddItem(addedItem, index)
                        }
                      />
                    )}
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
