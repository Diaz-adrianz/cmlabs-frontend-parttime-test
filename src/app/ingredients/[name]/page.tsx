import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Section } from '@/components/molecules/section';
import MealList from '@/components/organisms/meal/meal-list';
import { getMealsByIngredient } from '@/lib/actions/meal.action';
import { fromSlug } from '@/utils/string';
import { AlertCircleIcon } from 'lucide-react';

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ query: string }>;
}) => {
  const { name } = await params;
  const sParams = await searchParams;

  const meals = await getMealsByIngredient(name, sParams?.query);

  return (
    <Section>
      <h1 className="typo-display mb-6">
        {meals.data?.length ?? 0} {fromSlug(name, '_')} Meals
      </h1>
      <form className="mb-6 flex items-center gap-3" method="get">
        <Input
          name="query"
          defaultValue={sParams?.query}
          placeholder="Search meals..."
        />
        <Button type="submit">Search</Button>
      </form>

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
