import { Meal } from '@/types/meal.type';
import MealItem from './meal-item';
import { cn } from '@/utils/misc';
import { ComponentProps } from 'react';

const MealList = ({
  items,
  className,
  ...props
}: { items: Meal[] } & ComponentProps<'div'>) => {
  return (
    <div
      className={cn('columns-2 space-y-3 md:columns-3 lg:columns-4', className)}
      {...props}
    >
      {items?.map((item, i) => (
        <MealItem key={i} item={item} />
      ))}
    </div>
  );
};

export default MealList;
