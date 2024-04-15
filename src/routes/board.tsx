import { BoardGrid } from '@/features/Board/BoardGrid';
import { boardQueryOptions } from '@/features/Board/boardQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/board')({
  loader: ({ context }: { context: any }) =>
    context.queryClient.ensureQueryData(boardQueryOptions),
  component: BoardComponent,
});

function BoardComponent() {
  const boardQuery = useSuspenseQuery(boardQueryOptions);
  const board = boardQuery.data;

  return <BoardGrid board={board} />;
}
