import { FC } from "react";
import { BookSmallInfoProps } from "./BookSmallInfo";

const BookBigInfo: FC<BookSmallInfoProps> = ({ book }) => {
  return (
    <section
      id="section1"
      className="flex w-full flex-col gap-y-[30px] py-[30px]"
    >
      <p className="text-[25px] font-bold text-mooduck-black">О книге</p>
      <p className="2xl:w-2/3 xl:w-2/3 w-full ">{book.description}</p>
      <p className="text-[25px] font-bold text-mooduck-black">Характеристики</p>
      <div className="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row gap-y-[30px] 2xl:gap-x-[70px] xl:gap-x-[70px] justify-between 2xl:justify-start xl:justify-start">
        <div className="flex flex-col gap-y-5">
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Жанр</p>
            <div>
              {book.genres.map((genre, index) => (
                <div className="" key={index}>
                  {genre}
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Издательство</p>
            <p className="">{book.publisher}</p>
          </div>
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Серия</p>
            <p className="">{book.bookSeries}</p>
          </div>
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Переплет</p>
            <p className="">{book.bookBinding}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Художник</p>
            <div>
              {book.painters.length ? (
                book.painters.map((painter, index) => (
                  <div key={index}>{painter}</div>
                ))
              ) : (
                <div> — </div>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Переводчик</p>
            <div>
              {book.translaters.length ? (
                book.translaters.map((translater, index) => (
                  <div key={index}>{translater}</div>
                ))
              ) : (
                <div> — </div>
              )}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <p className="w-[200px] text-mooduck-gray">Год издания</p>
            <p>{book.publishedDate}</p>
          </div>
          <div className="flex w-full justify-between">
            <p className=" text-mooduck-gray">Количество страниц</p>
            <p>{book.pageCount}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookBigInfo;
