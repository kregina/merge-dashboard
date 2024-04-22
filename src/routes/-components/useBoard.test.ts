import { Board, ItemVisibility } from '@/services';
import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, it } from 'vitest';
import { useBoard } from './useBoard';

describe('useBoard', () => {
  it('should initialize with the provided board items', () => {
    const initialBoard: Board = {
      boardId: '1',
      height: 1,
      width: 1,
      items: [
        {
          itemId: '1',
          chainId: '1',
          itemType: 'item',
          icon: 'icon',
          isInsideBubble: false,
          itemLevel: 1,
          pausedUntil: '2022-12-12T00:00:00.000Z',
          createdAt: '2022-12-12T00:00:00.000Z',
          visibility: ItemVisibility.VISIBLE,
        },
      ],
    };
    const { result } = renderHook(() => useBoard({ board: initialBoard }));
    expect(result.current.boardItems).toEqual(initialBoard.items);
  });

  it('handles adding a new item', () => {
    const initialBoard: Board = {
      boardId: '1',
      height: 1,
      width: 1,
      items: [
        {
          itemId: '1',
          chainId: '1',
          itemType: 'item',
          icon: 'icon',
          isInsideBubble: false,
          itemLevel: 1,
          pausedUntil: '2022-12-12T00:00:00.000Z',
          createdAt: '2022-12-12T00:00:00.000Z',
          visibility: ItemVisibility.VISIBLE,
        },
      ],
    };
    const newItem = {
      itemId: '2',
      chainId: '2',
      itemType: 'item',
      icon: 'icon',
      isInsideBubble: false,
      itemLevel: 1,
      pausedUntil: '2022-12-12T00:00:00.000Z',
      createdAt: '2022-12-12T00:00:00.000Z',
      visibility: ItemVisibility.VISIBLE,
    };
    const { result } = renderHook(() => useBoard({ board: initialBoard }));
    act(() => {
      result.current.handleAddItem(newItem, 0);
    });
    expect(result.current.boardItems).toContain(newItem);
  });

  it('handles deleting an item', () => {
    const initialBoard: Board = {
      boardId: '1',
      height: 1,
      width: 1,
      items: [
        {
          itemId: '1',
          chainId: '1',
          itemType: 'item',
          icon: 'icon',
          isInsideBubble: false,
          itemLevel: 1,
          pausedUntil: '2022-12-12T00:00:00.000Z',
          createdAt: '2022-12-12T00:00:00.000Z',
          visibility: ItemVisibility.VISIBLE,
        },
      ],
    };
    const { result } = renderHook(() => useBoard({ board: initialBoard }));
    act(() => {
      result.current.handleDeleteItem('1', 0);
    });
    expect(result.current.boardItems[0]).toEqual({ itemId: '1' }); // Assuming your deletion logic sets to an empty item or similar
  });

  it('handles updating an item', () => {
    const initialBoard: Board = {
      boardId: '1',
      height: 1,
      width: 1,
      items: [
        {
          itemId: '1',
          chainId: '1',
          itemType: 'item',
          icon: 'icon',
          isInsideBubble: false,
          itemLevel: 1,
          pausedUntil: '2022-12-12T00:00:00.000Z',
          createdAt: '2022-12-12T00:00:00.000Z',
          visibility: ItemVisibility.VISIBLE,
        },
      ],
    };
    const updatedItem = {
      itemId: '1',
      chainId: '1',
      itemType: 'item',
      icon: 'icon',
      isInsideBubble: false,
      itemLevel: 4,
      pausedUntil: '2022-12-12T00:00:00.000Z',
      createdAt: '2022-12-12T00:00:00.000Z',
      visibility: ItemVisibility.VISIBLE,
    };
    const { result } = renderHook(() => useBoard({ board: initialBoard }));
    act(() => {
      result.current.handleUpdateItem(updatedItem);
    });
    expect(result.current.boardItems[0]).toEqual(updatedItem);
  });
});
