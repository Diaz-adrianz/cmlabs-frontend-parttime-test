'use server';

import { errorResponseAction } from '../server/error-response.server';
import { ActionResponse } from '@/types/action.type';
import { Category } from '@/types/category.type';
import api from '../server/api.server';

async function getCategories(): Promise<ActionResponse<Category[] | null>> {
  try {
    const data = await api.get<{ categories: Category[] }>('/categories.php');

    return {
      status: true,
      message: `${data.data.categories.length} Category(s) retrieved`,
      data: data.data.categories,
    };
  } catch (error) {
    return errorResponseAction(error);
  }
}

export { getCategories };
