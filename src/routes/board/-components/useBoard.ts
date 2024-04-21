import { swapArrayItems } from '@/lib/swapArrayItems';
import { Board, Item } from '@/services';
import { useState } from 'react';

export const useBoard = ({ board }: { board: Board }) => {
  const [boardItems, setBoardItems] = useState(board.items);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleSwapItems = (sourceIndex: number, targetIndex: number) => {
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

  return {
    boardItems,
    editingIndex,
    handleSwapItems,
    handleAddItem,
    handleDeleteItem,
    handleUpdateItem,
    setEditingIndex,
  };
};
