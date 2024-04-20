import { Card } from '@/components';
import { Board } from '@/services';
import { FC, useMemo } from 'react';
import { BoardProvider } from './BoardContext';
import { BoardItem } from './BoardItem/BoardItem';
import { useBoardGrid } from './useBoardGrid';

interface BoardGridProps {
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  const { boardState, setBoardState, handleDrop, boardContextValues } =
    useBoardGrid(board);

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
    }),
    [board.width, board.height],
  );

  return (
    <BoardProvider value={boardContextValues}>
      <div className="m-auto">
        <Card>
          <div
            className="w-full h-full grid border-4 border-[#c2a061] bg-[#e4dccc] rounded-xl p-1 gap-1"
            style={gridStyle}
          >
            {boardState.boardItems.map((item, index) => (
              <BoardItem
                key={item?.itemId}
                item={item}
                index={index}
                activeChainId={boardState.activeChainId}
                setDragStartIndex={(index) =>
                  setBoardState((prev) => ({ ...prev, dragStartIndex: index }))
                }
                setActiveChainId={(chainId) =>
                  setBoardState((prev) => ({ ...prev, activeChainId: chainId }))
                }
                handleDrop={handleDrop}
              />
            ))}
          </div>
        </Card>
      </div>
    </BoardProvider>
  );
};
