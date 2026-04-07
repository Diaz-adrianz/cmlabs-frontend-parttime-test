'use server';

import { errorResponseAction } from '../server/error-response.server';
import { ActionResponse } from '@/types/action.type';
import { Ingredient } from '@/types/ingredient.type';
import api from '../server/api.server';

async function getIngredients(): Promise<ActionResponse<Ingredient[] | null>> {
  try {
    const data = await api.get<{ meals: Ingredient[] }>('/list.php?i=list');

    return {
      status: true,
      message: `${data.data.meals.length} ingredient(s) retrieved`,
      data: data.data.meals,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

export { getIngredients };
