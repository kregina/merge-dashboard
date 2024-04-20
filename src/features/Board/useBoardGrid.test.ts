// useBoardGrid.test.ts
import { Board, Item } from '@/services';
import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';
import { useBoardGrid } from './useBoardGrid';

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

describe('useBoardGrid', () => {
  it('updates boardItems on handleDrop', () => {
    const initialBoard: Board = {
      width: 3,
      height: 3,
      boardId: 'board-1',
      items: [
        sampleItem,
        { ...sampleItem, itemId: 'item-2' },
        { ...sampleItem, itemId: 'item-3' },
      ],
    };

    const { result } = renderHook(() => useBoardGrid(initialBoard));

    // Simulate setting drag start index before drop
    act(() => {
      result.current.setBoardState((prevState) => ({
        ...prevState,
        dragStartIndex: 0,
      }));
    });

    act(() => {
      result.current.handleDrop(2);
    });

    expect(result.current.boardState.boardItems[2]?.itemId).toBe('item-1');
  });
});
