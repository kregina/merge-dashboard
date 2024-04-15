import { fetchBoard } from '@/services/board';
import { queryOptions } from '@tanstack/react-query';

export const boardQueryOptions = queryOptions({
  queryKey: ['board'],
  queryFn: () => fetchBoard(),
});
