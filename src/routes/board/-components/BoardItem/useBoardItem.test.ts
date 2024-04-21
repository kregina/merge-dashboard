import { act, renderHook } from '@testing-library/react-hooks';
import { describe, expect, it, vi } from 'vitest';
import { useBoardItem } from './useBoardItem';

describe('useBoardItem', () => {
  const mockSetDragStartIndex = vi.fn();
  const mockSetActiveChainId = vi.fn();
  const mockHandleDrop = vi.fn();
  const initialProps = {
    index: 1,
    chainId: 'chain123',
    setDragStartIndex: mockSetDragStartIndex,
    setActiveChainId: mockSetActiveChainId,
    handleDrop: mockHandleDrop,
  };

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useBoardItem(initialProps));

    expect(result.current.hoveredId).toBeNull();
  });

  it('handles drag start correctly', () => {
    const { result } = renderHook(() => useBoardItem(initialProps));

    act(() => {
      result.current.handleOnDragStart();
    });

    expect(mockSetDragStartIndex).toHaveBeenCalledWith(1);
    expect(mockSetActiveChainId).toHaveBeenCalledWith('chain123');
  });

  it('handles drag over and sets hovered ID', () => {
    const { result } = renderHook(() => useBoardItem(initialProps));
    const mockEvent: any = { preventDefault: vi.fn() };

    act(() => {
      result.current.handleOnDragOver(mockEvent, 'newChain', 2);
    });

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(result.current.hoveredId).toBe('newChain');
  });

  it('handles drag leave and resets hovered ID', () => {
    const { result } = renderHook(() => useBoardItem(initialProps));

    act(() => {
      result.current.handleOnDragLeave();
    });

    expect(result.current.hoveredId).toBeNull();
  });

  it('handles drop and resets hovered ID', () => {
    const { result } = renderHook(() => useBoardItem(initialProps));

    act(() => {
      result.current.onHandleOnDrop();
    });

    expect(mockHandleDrop).toHaveBeenCalledWith(1);
    expect(result.current.hoveredId).toBeNull();
  });
});
