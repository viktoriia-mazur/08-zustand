import { fetchNotes } from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export function useFetchNotes(page: number, search: string, tag?: string) {
  return useQuery({
    queryKey: ['notes', page, search, tag ?? ''],
    queryFn: () => fetchNotes({ page, search, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
}