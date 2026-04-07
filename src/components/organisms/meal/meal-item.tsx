import { Meal } from '@/types/meal.type';
import { cn } from '@/utils/misc';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

const MealItem = ({
  item,
  className,
  ...props
}: {
  item: Pick<Meal, 'idMeal' | 'strMealThumb' | 'strMeal'>;
} & ComponentProps<'div'>) => {
  return (
    <div
      className={cn('group relative overflow-hidden rounded-xl', className)}
      {...props}
    >
      <Link href={`/meals/${item.idMeal}`}>
        <Image
          src={item.strMealThumb}
          alt={''}
          width={500}
          height={500}
          className="h-auto w-full object-cover transition-transform group-hover:scale-110"
        />
        <div className="from-background dark text-foreground group-hover:from-primary pointer-events-none absolute inset-0 top-auto bottom-0 left-0 flex h-40 flex-col justify-end bg-linear-to-t p-3 transition-colors">
          <h4 className="typo-heading-sm line-clamp-2">{item.strMeal}</h4>
        </div>
      </Link>
    </div>
  );
};

export default MealItem;
