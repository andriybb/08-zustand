'use client';
import css from "../../page.module.css";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { NoteTag } from '@/types/note';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

interface Props {
  tag?: NoteTag | 'all';
}

const NotesByCategory = ({ tag }: Props) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <h1>Список Нотаток {tag ? `за фільтром - ${tag}` : ''}</h1>
      <div className={css.toolbar}>
      <SearchBox
        value={search}
        onChange={handleSearchChange}
      />
{totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          setCurrentPage={setPage}
        />
      )}
      <button className={css.button} onClick={() => setIsModalOpen(true)}>
        Створити нотатку
      </button>
</div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {isLoading && <p>Завантаження...</p>}

      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        !isLoading && <p>Нотаток не знайдено</p>
      )}

      
    </div>
  );
};

export default NotesByCategory;