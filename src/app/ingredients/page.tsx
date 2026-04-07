import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Section } from '@/components/molecules/section';
import IngredientList from '@/components/organisms/ingredient/ingredient-list';
import { getIngredients } from '@/lib/actions/ingredient.action';
import { AlertCircleIcon } from 'lucide-react';

const page = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query: string }>;
}) => {
  const sParams = await searchParams;

  const ingredients = await getIngredients(sParams?.query);

  return (
    <Section>
      <h1 className="typo-display mb-6">Discover Ingredients</h1>

      <form className="mb-6 flex items-center gap-3" method="get">
        <Input
          name="query"
          defaultValue={sParams?.query}
          placeholder="Search ingredients..."
        />
        <Button type="submit">Search</Button>
      </form>

      {ingredients.status ? (
        <IngredientList items={ingredients.data ?? []} />
      ) : (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{ingredients.message}</AlertTitle>
        </Alert>
      )}
    </Section>
  );
};

export default page;
