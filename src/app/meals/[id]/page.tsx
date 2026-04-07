import { Alert, AlertTitle } from '@/components/atoms/alert';
import { Badge } from '@/components/atoms/badge';
import { Button } from '@/components/atoms/button';
import { Section } from '@/components/molecules/section';
import { YoutubeEmbed } from '@/components/molecules/youtube-embed';
import { getMealById } from '@/lib/actions/meal.action';
import { MealIngredientKey, MealMeasureKey } from '@/types/meal.type';
import { toSlug } from '@/utils/string';
import { AlertCircleIcon, MapPinIcon, UtensilsIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal.status || !meal.data)
    return (
      <Section>
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{meal.message}</AlertTitle>
        </Alert>
      </Section>
    );

  const data = meal.data;

  return (
    <>
      <Section className="relative h-80 overflow-hidden">
        <Image
          src={data.strMealThumb}
          alt={data.strMeal}
          fill
          className="w-full object-cover"
        />
        <div className="from-background absolute inset-0 top-auto bottom-0 left-0 h-40 bg-linear-to-t" />
      </Section>
      <Section className="relative z-10">
        <Image
          src={data.strMealThumb}
          alt={data.strMeal}
          width={160}
          height={160}
          className="-mt-32 mb-3 size-40 rounded-xl object-cover"
        />

        <h1 className="typo-display">{data.strMeal}</h1>
        <p className="typo-body text-muted-foreground mb-3">
          {data.strMealAlternate}
        </p>
        <div className="mb-6 flex flex-wrap gap-3">
          {data.strCategory && (
            <Badge asChild>
              <Link href={`/categories/${toSlug(data.strCategory, '_')}`}>
                <UtensilsIcon /> {data.strCategory}
              </Link>
            </Badge>
          )}
          {data.strArea && (
            <Badge>
              <MapPinIcon /> {data.strArea}
            </Badge>
          )}
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="typo-heading-md mb-3">Instructions</h3>
            <p className="text-muted-foreground">{data.strInstructions}</p>
          </div>

          <div>
            <h3 className="typo-heading-md mb-3">Ingredients</h3>
            <ul className="text-muted-foreground ms-6 list-disc">
              {Array.from({ length: 20 }, (_, i) => ({
                ingredient: data[`strIngredient${i + 1}` as MealIngredientKey],
                measure: data[`strMeasure${i + 1}` as MealMeasureKey],
              }))
                .filter(({ ingredient }) => ingredient)
                .map((item, i) => (
                  <li key={i}>
                    {item.measure} {item.ingredient}
                  </li>
                ))}
            </ul>
          </div>

          {data.strYoutube && (
            <div className="md:col-span-2">
              <h3 className="typo-heading-md mb-3">Tutorial Video</h3>
              <YoutubeEmbed src={data.strYoutube} title={data.idMeal} />
            </div>
          )}

          {data.strSource && (
            <div>
              <Button asChild>
                <a href={data.strSource} target="_blank">
                  Source
                </a>
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  );
};

export default page;
