import { useEffect, useState } from 'react'
import { useInput } from './useInput'
import { getUniqueObjects } from '../utils'

import { IAuthorsAndGenres } from '../models/IAuthorsAndGenres'
import { AUTHORS, GENRES } from '../constants/constants'
import { sortObjectsAlphabetically } from '../utils/sortObjectsAlphabetically'

export const useBooks = (
  initialPage: number,
  initialList: boolean,
  initialValue: string
) => {
  const [page, setPage] = useState<number>(initialPage)
  const [list, setList] = useState<boolean>(initialList)
  const value = useInput(initialValue)
  
  const [authors, setAuthors] = useState<IAuthorsAndGenres[]>(
    sortObjectsAlphabetically(getUniqueObjects(AUTHORS))
  )
  const [genres, setGenres] = useState<IAuthorsAndGenres[]>(
    sortObjectsAlphabetically(getUniqueObjects(GENRES))
  )
  const [searchedAuthors,setSearchedAuthors] = useState<IAuthorsAndGenres[]>(authors)
  let resultAuthors: string[] = []
  let resultGenres: string[] = []

  const handleOnClickView = (type: boolean) => {
    setList(type)
  }

  const handleOnClickAuthor: (id: string) => void = (id) => {
    setAuthors(
      authors.map((author) =>
        author.id === id ? { ...author, checked: !author.checked } : author
      )
    )
  }

  const handleOnClickGenre: (id: string) => void = (id) => {
    setGenres(
      genres.map((genre) =>
        genre.id === id ? { ...genre, checked: !genre.checked } : genre
      )
    )
  }

  const clear: () => void = () => {
    setGenres(
      genres.map((genre) =>
        genre.checked ? { ...genre, checked: !genre.checked } : genre
      )
    )
    setAuthors(
      searchedAuthors.map((author) =>
        author.checked ? { ...author, checked: !author.checked } : author
      )
    )
  }

  const pushToAuthors = (author: string) => {
    resultAuthors.push(author)
  }

  const pushToGenres = (genre: string) => {
    resultGenres.push(genre)
  }

  const createResults = () => {
    authors
      .filter((author) => author.checked)
      .map((el) => pushToAuthors(el.author))
    genres
      .filter((author) => author.checked)
      .map((el) => pushToGenres(el.author))
  }

  useEffect(()=>{
    const filteredAuthors = authors.filter((author) =>
      author.author.toLowerCase().includes(value.value.toLowerCase())
    );

    setSearchedAuthors(value.value ? filteredAuthors : authors);
  },[value])


  return {
    page,
    list,
    value,
    handleOnClickView,
    handleOnClickAuthor,
    handleOnClickGenre,
    clear,
    searchedAuthors,
    createResults,
    resultAuthors,
    resultGenres,
    genres,
    setPage,
  }
}