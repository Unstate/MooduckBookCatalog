//@ts-ignore
import logotype from '../../assets/logotype.svg'
import { cn } from '../../utils'

interface LogoAndNameOfCompanyProps {
  className: string
}

const LogoAndNameOfCompany: React.FC<LogoAndNameOfCompanyProps> = ({
  className
}) => {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-7 lg:gap-7 xl:gap-7 2xl:gap-7">
      <img className='2xl:w-[71px] 2xl:h-[67px] xl:w-[71px] xl:h-[67px] lg:w-[71px] lg:h-[67px] w-[50px] h-[50px]' src={logotype} />
      <p className={cn('2xl:text-4xl xl:text-4xl lg:text-4xl text-2xl font-bold uppercase', className)}>mooduck</p>
    </div>
  )
}

export default LogoAndNameOfCompany
