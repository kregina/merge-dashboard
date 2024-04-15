import { boardQueryOptions } from '@/features/Board/boardQueryOptions';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/board')({
  loader: ({ context }: { context: any }) =>
    context.queryClient.ensureQueryData(boardQueryOptions),
  component: BoardComponent,
});

function BoardComponent() {
  const boardQuery = useSuspenseQuery(boardQueryOptions);
  const board = boardQuery.data;

  return <div className="p-2">Hello from {board.boardId}</div>;
}
