import { fetchBoard } from '@/services/board';
import { queryOptions } from '@tanstack/react-query';

export const getBoardQueryOptions = queryOptions({
  queryKey: ['fetch-board'],
  queryFn: () => fetchBoard(),
});
