import { FC } from 'react';

interface TextBlockProps {
  text: string;
  isTruncated: boolean
  setIsTruncated: (visable:boolean) => void
}

const TextBlock: FC<TextBlockProps> = ({ text, isTruncated, setIsTruncated }) => {

    const toggleTruncate = () => {
      setIsTruncated(!isTruncated);
    };
    return (
        <div className='transition-all ease-in'>
          <div
            className='text-[20px]'
            style={{
              maxHeight: isTruncated ? 125 : 'none',
              overflow: isTruncated ? 'hidden' : 'visible',
            }}
          >
            {text}
          </div>
          {text.length > 108 && (
            <button onClick={toggleTruncate} className='cursor-pointer text-center text-[20px] font-semibold
            text-[#246A73] hover:text-[#160F29] transition-all ease-in'>
              {isTruncated ? 'Показать еще' : 'Скрыть'}
            </button>
          )}
        </div>
      );
};

export default TextBlock;