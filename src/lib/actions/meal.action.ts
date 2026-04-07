'use server';

import { errorResponseAction } from '../server/error-response.server';
import { ActionResponse } from '@/types/action.type';
import api from '../server/api.server';
import { Meal } from '@/types/meal.type';

async function getMealsByIngredient(
  ingredient: string
): Promise<ActionResponse<Meal[] | null>> {
  try {
    const data = await api.get<{ meals: Meal[] | null }>(
      `/filter.php?i=${ingredient}`
    );

    return {
      status: true,
      message: `${data.data.meals?.length ?? 0} meal(s) retrieved`,
      data: data.data.meals,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

async function getMealsByCategory(
  category: string
): Promise<ActionResponse<Meal[] | null>> {
  try {
    const data = await api.get<{ meals: Meal[] | null }>(
      `/filter.php?c=${category}`
    );

    return {
      status: true,
      message: `${data.data.meals?.length} meal(s) retrieved`,
      data: data.data.meals,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

async function getMealById(id: string): Promise<ActionResponse<Meal | null>> {
  try {
    const data = await api.get<{ meals: Meal[] }>(`/lookup.php?i=${id}`);

    const item = data.data.meals?.at(0);
    if (!item)
      return {
        status: false,
        message: 'Meal not found',
        data: null,
      };

    return {
      status: true,
      message: 'Meal retrieved',
      data: item,
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

export { getMealsByIngredient, getMealsByCategory, getMealById, searchMeals };
