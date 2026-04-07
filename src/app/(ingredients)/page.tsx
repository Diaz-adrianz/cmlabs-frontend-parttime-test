import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Section } from '@/components/molecules/section';
import IngredientList from '@/components/organisms/ingredient/ingredient-list';
import { getIngredients } from '@/lib/actions/ingredient.action';
import { AlertCircleIcon } from 'lucide-react';

const page = async () => {
  const ingredients = await getIngredients();

  return (
    <Section>
      <h1 className="typo-display mb-6">Discover Ingredients</h1>

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
