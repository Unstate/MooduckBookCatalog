import { IAuthorsAndGenres } from "../models/IAuthorsAndGenres";

export const sortObjectsAlphabetically = (
    objects: IAuthorsAndGenres[]
  ): IAuthorsAndGenres[] => {
    return objects.sort((a, b) => a.author.localeCompare(b.author));
};