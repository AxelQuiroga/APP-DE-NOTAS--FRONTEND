import {SquarePen,Trash} from 'lucide-react'

export const CardNote = ({title,description,date}) => {//id
  return (
    <div className="card bg-base-300 w-full">
      
      <div className="card-body">
        <h2 className="card-title text-accent font-bold lg:text-2xl">{title}</h2>
        <p className="text-amber-50">
          {description}
        </p>
        <div className="flex justify-between items-center mt-6">
          <time dateTime={date}>{date}</time>
          <div className="flex gap-4">
            <SquarePen className='text-white cursor-pointer' ></SquarePen>
            <Trash className='text-red-400 cursor-pointer'></Trash>
          </div>
        </div>
      </div>
    </div>
  );
};
