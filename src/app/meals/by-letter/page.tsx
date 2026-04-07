import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Section } from '@/components/molecules/section';
import MealList from '@/components/organisms/meal/meal-list';
import { searchMeals } from '@/lib/actions/meal.action';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  const meals = await searchMeals(query);

  return (
    <Section>
      <h1 className="typo-display mb-3">Discover Meals A-Z</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {LETTERS.map((letter) => (
          <Button
            key={letter}
            variant={letter == query ? 'default' : 'secondary'}
            asChild
          >
            <Link href={`?query=${letter}`}>{letter}</Link>
          </Button>
        ))}
      </div>

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
