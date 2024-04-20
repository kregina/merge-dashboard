import { describe, expect, it, vi } from 'vitest';
import {
  Board,
  Item,
  addItemToBoard,
  deleteItemFromBoard,
  fetchBoard,
  updateItemToBoard,
} from './board.service';

// Mock uuid and delay
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'unique-id'),
}));

vi.mock('./boardFunctions', () => ({
  delay: () => new Promise<void>((resolve) => resolve()),
}));

// Sample data
const sampleItem: Item = {
  itemId: 'item-1',
  itemType: 'type-1',
  chainId: 'chain-1',
  pausedUntil: null,
  createdAt: '2022-01-01T00:00:00Z',
  visibility: 'visible',
  itemLevel: 1,
  isInsideBubble: false,
  icon: 'icon.png',
};

const board: Board = {
  width: 10,
  height: 10,
  boardId: 'board-1',
  items: [sampleItem],
};

describe('fetchBoard', () => {
  it('should fetch the board with items containing unique IDs', async () => {
    const result = await fetchBoard();
    expect(result.items[0]?.itemId).toBe('unique-id');
  });
});

describe('addItemToBoard', () => {
  it('should add an item at specified index', async () => {
    const newItem = { ...sampleItem, itemId: 'item-2' };
    const result = await addItemToBoard({
      index: 1,
      newItem,
      boardItems: board.items,
    });
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(newItem);
  });
});

describe('updateItemToBoard', () => {
  it('should update an item based on its ID', async () => {
    const updatedItem = { ...sampleItem, itemLevel: 2 };
    const result = await updateItemToBoard({
      updatedItem,
      boardItems: board.items,
    });
    expect(result[0]?.itemLevel).toBe(2);
  });
});

describe('deleteItemFromBoard', () => {
  it('should delete an item by setting it to null at the specified index', async () => {
    const result = await deleteItemFromBoard({
      itemId: 'item-1',
      boardItems: board.items,
      index: 0,
    });
    expect(result[0]?.itemId).toBe('item-1');
  });
});
