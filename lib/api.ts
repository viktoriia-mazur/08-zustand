import { Note } from '@/types/note';
import axios from 'axios';

declare const process: { env: { NEXT_PUBLIC_NOTEHUB_TOKEN?: string } };

const PER_PAGE = 10;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

export interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export interface FetchNotesParams {
  page: number;
  search: string;
  tag?: string;
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: PER_PAGE,
      search,
      ...(tag ? { tag } : {}),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
}

export async function createNote(noteData: CreateNoteProps): Promise<Note> {
  const { data } = await api.post<Note>('/notes', noteData);

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
}