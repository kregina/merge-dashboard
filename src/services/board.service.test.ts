import { describe, expect, it, vi } from 'vitest';
import { Board, Item, fetchBoard } from './board.service';

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
    expect(result.items[0].itemId).toBe('unique-id');
  });
});
