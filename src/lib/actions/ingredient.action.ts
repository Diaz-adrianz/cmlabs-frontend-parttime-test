'use server';

import { errorResponseAction } from '../server/error-response.server';
import { ActionResponse } from '@/types/action.type';
import { Ingredient } from '@/types/ingredient.type';
import api from '../server/api.server';

async function getIngredients(
  query: string = ''
): Promise<ActionResponse<Ingredient[] | null>> {
  try {
    const data = await api.get<{ meals: Ingredient[] }>('/list.php?i=list');

    const items = Array.isArray(data.data.meals) ? data.data.meals : [];

    const q = query.trim();
    const filtered =
      q.length > 0
        ? (() => {
            const re = new RegExp(
              q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
              'i'
            );
            return items.filter((item) => re.test(item.strIngredient));
          })()
        : items;

    return {
      status: true,
      message: `${filtered.length} ingredient(s) retrieved`,
      data: filtered,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

export { getIngredients };
