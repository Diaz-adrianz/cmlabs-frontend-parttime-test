import { Ingredient } from '@/types/ingredient.type';
import IngredientItem from './ingredient-item';
import { cn } from '@/utils/misc';
import { ComponentProps } from 'react';

const IngredientList = ({
  items,
  className,
  ...props
}: { items: Ingredient[] } & ComponentProps<'div'>) => {
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)} {...props}>
      {items?.map((item, i) => (
        <IngredientItem key={i} item={item} />
      ))}
    </div>
  );
};

export default IngredientList;
