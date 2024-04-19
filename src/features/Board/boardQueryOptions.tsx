import { UpdateBoardProps, fetchBoard, updateBoard } from '@/services/board';
import { queryOptions } from '@tanstack/react-query';

export const getBoardQueryOptions = queryOptions({
  queryKey: ['fetch-board'],
  queryFn: () => fetchBoard(),
});

export const updateBoardQueryOptions = (options: UpdateBoardProps) => {
  return queryOptions({
    queryKey: ['update-board', options],
    queryFn: () => updateBoard(options),
  });
};
