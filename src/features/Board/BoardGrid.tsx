import { Card } from '@/components';
import { Board } from '@/services/board';
import { FC } from 'react';

interface BoardGridProps {
  board: Board;
}

export const BoardGrid: FC<BoardGridProps> = ({ board }) => {
  return (
    <div className=" max-w-[1000px]">
      <Card>
        <div
          className="grid gap-0.5"
          style={{
            // TODO add tailwind
            gridTemplateColumns: `repeat(${board.width}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${board.height}, minmax(0, 1fr))`,
          }}
        >
          {board.items.map((item) => (
            <p className="truncate">{item?.itemType}</p>
          ))}
        </div>
      </Card>
    </div>
  );
};
