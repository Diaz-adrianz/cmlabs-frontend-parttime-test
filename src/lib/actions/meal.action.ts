'use server';

import { errorResponseAction } from '../server/error-response.server';
import { ActionResponse } from '@/types/action.type';
import api from '../server/api.server';
import { Meal } from '@/types/meal.type';

async function getMealsByIngredient(
  ingredient: string
): Promise<ActionResponse<Meal[] | null>> {
  try {
    const data = await api.get<{ meals: Meal[] }>(
      `/filter.php?i=${ingredient}`
    );

    return {
      status: true,
      message: `${data.data.meals.length} meal(s) retrieved`,
      data: data.data.meals,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

async function searchMeals(
  query: string
): Promise<ActionResponse<Meal[] | null>> {
  try {
    const data = await api.get<{ meals: Meal[] }>(`/search.php?f=${query}`);
    const items = Array.isArray(data.data.meals) ? data.data.meals : [];

    return {
      status: true,
      message: `${items.length} meal(s) retrieved`,
      data: items,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

export { getMealsByIngredient, searchMeals };
