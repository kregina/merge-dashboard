import { fetchBoard } from '@/services';
import { queryOptions } from '@tanstack/react-query';

export const getBoardQueryOptions = queryOptions({
  queryKey: ['fetch-board'],
  queryFn: () => fetchBoard(),
});
