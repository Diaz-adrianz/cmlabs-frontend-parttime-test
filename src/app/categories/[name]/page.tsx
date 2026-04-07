import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Section } from '@/components/molecules/section';
import MealList from '@/components/organisms/meal/meal-list';
import { getMealsByCategory } from '@/lib/actions/meal.action';
import { fromSlug } from '@/utils/string';
import { AlertCircleIcon } from 'lucide-react';

const page = async ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = await params;
  const meals = await getMealsByCategory(name);

  return (
    <Section>
      <h1 className="typo-display mb-6">
        {meals.data?.length ?? 0} {fromSlug(name, '_')} Meals
      </h1>

      {meals.status ? (
        <MealList items={meals.data ?? []} />
      ) : (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{meals.message}</AlertTitle>
        </Alert>
      )}
    </Section>
  );
};

export default page;
