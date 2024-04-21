import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Board } from './-components/Board';
import { BoardContext } from './-components/BoardContext';
import { getBoardQueryOptions } from './-components/boardQueryOptions';

export const Route = createFileRoute('/board/')({
  loader: ({ context }: { context: any }) =>
    context.queryClient.ensureQueryData(getBoardQueryOptions),
  component: BoardComponent,
});

function BoardComponent() {
  const boardQuery = useSuspenseQuery(getBoardQueryOptions);
  const board = boardQuery.data;

  return (
    <BoardContext.Provider
      value={{
        board,
        itemsHistory: [],
        selectedIndex: -1,
      }}
    >
      <Board />
    </BoardContext.Provider>
  );
}
