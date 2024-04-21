import { BoardGrid } from './BoardGrid';

export const Board = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-4">
      <BoardGrid />
      <div>history</div>
    </div>
  );
};
