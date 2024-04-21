import { Card } from '@/components';
import { Board } from '@/services';
import { FC, ReactNode, useMemo } from 'react';

interface BoardGridProps {
  children: ReactNode;
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ children, board }) => {
  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
      gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
    }),
    [board.width, board.height],
  );

  return (
    <Card>
      <div
        className="w-full h-full grid border-4 border-[#c2a061] bg-[#e4dccc] rounded-xl p-1 gap-1"
        style={gridStyle}
      >
        {children}
      </div>
    </Card>
  );
};
