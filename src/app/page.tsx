import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Section } from '@/components/molecules/section';
import CategoryList from '@/components/organisms/category/category-list';
import { getCategories } from '@/lib/actions/category.action';
import { AlertCircleIcon } from 'lucide-react';

const page = async () => {
  const categories = await getCategories();

  return (
    <>
      <Section className="bg-primary/20 items-start">
        <h1 className="typo-display text-primary">See All Delicious Foods</h1>
        <p className="typo-body mb-6">
          Explore recipes by ingredient, category, or letter—all in one place.
        </p>
      </Section>
      <Section>
        <h2 className="typo-heading-lg mb-6">Discover Categories</h2>

        {categories.status ? (
          <CategoryList items={categories.data ?? []} />
        ) : (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>{categories.message}</AlertTitle>
          </Alert>
        )}
      </Section>
    </>
  );
};

export default page;
