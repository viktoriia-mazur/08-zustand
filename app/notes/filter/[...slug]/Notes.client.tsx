'use client';

import EmptyNotes from '@/components/EmptyNotes/EmptyNotes';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import Loader from '@/components/Loader/Loader';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useState } from 'react';
import css from './page.module.css';
import { useFetchNotes } from '@/queries/notes';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, error, isLoading, isError, isSuccess } = useFetchNotes(
    page,
    search,
    tag
  );

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isLoading && <Loader />}

      {isError && (
        <ErrorMessage message={`Something went wrong! ${error.message}`} />
      )}
      {isSuccess && notes.length === 0 && <EmptyNotes />}
      {isSuccess && notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}