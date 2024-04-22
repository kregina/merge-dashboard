import { describe, expect, it, vi } from 'vitest';
import { fetchBoard } from './board.service';

// Mock uuid and delay
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'unique-id'),
}));

vi.mock('./boardFunctions', () => ({
  delay: () => new Promise<void>((resolve) => resolve()),
}));

describe('fetchBoard', () => {
  it('should fetch the board with items containing unique IDs', async () => {
    const result = await fetchBoard();
    expect(result.items[0].itemId).toBe('unique-id');
  });
});
