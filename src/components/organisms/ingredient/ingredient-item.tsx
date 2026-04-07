import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/atoms/item';
import { Ingredient } from '@/types/ingredient.type';
import { toSlug } from '@/utils/string';
import Image from 'next/image';
import Link from 'next/link';
import { ComponentProps } from 'react';

const IngredientItem = ({
  item,
  ...props
}: { item: Ingredient } & ComponentProps<typeof Item>) => {
  return (
    <Item {...props} asChild>
      <Link href={`/ingredients/${toSlug(item.strIngredient, '_')}`}>
        <ItemMedia variant="image">
          <Image
            src={item.strThumb}
            alt={''}
            width={32}
            height={32}
            className="object-cover"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{item.strIngredient}</ItemTitle>
          <ItemDescription>{item.strDescription}</ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
};

export default IngredientItem;
