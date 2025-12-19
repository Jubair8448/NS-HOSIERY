 
import BrowsingHistoryList from '@/components/shared/browsing-history-list'
import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import ProductSlider from '@/components/shared/product/product-slider'
import { Card, CardContent } from '@/components/ui/card'

import {
  getProductsForCard,
  getProductsByTag,
  getAllCategories,
} from '@/lib/actions/product.actions'
import { getSetting } from '@/lib/actions/setting.actions'
import { getTranslations } from 'next-intl/server'

import { getCategoryImage } from "@/lib/actions/product.actions";
import CategoryIcons from "@/components/shared/home/CategoryIcons";

export default async function HomePage() {
  const t = await getTranslations('Home')
  const { carousels } = await getSetting()
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })

  const categories = (await getAllCategories()).slice(0, 8)

  const categoryIcons = await Promise.all(
    categories.map(async (category: string) => {
      const image = await getCategoryImage(category);
      return {
        name: category,
        image: image ?? '',
        href: `/search?category=${category}`,
      };
    })
  );

  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
  })
  const featureds = await getProductsForCard({
    tag: 'featured',
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
  })

  const cards = [
    {
      title: t('Categories to explore'),
      link: {
        text: t('See More'),
        href: '/search',
      },
      items: categoryIcons,
    },
    {
      title: t('Explore New Arrivals'),
      items: newArrivals,
      link: {
        text: t('View All'),
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: t('Discover Best Sellers'),
      items: bestSellers,
      link: {
        text: t('View All'),
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: t('Featured Products'),
      items: featureds,
      link: {
        text: t('Shop Now'),
        href: '/search?tag=new-arrival',
      },
    },
  ]

  return (
    <>
      <HomeCarousel items={carousels} />

      {/* 👇 NEW CATEGORY ICON SECTION */}
      <div className="bg-white py-4">
        <CategoryIcons categories={categoryIcons} />
      </div>

      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
        <HomeCarousel items={carousels} />

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={t("Today's Deals")} products={todaysDeals} />
          </CardContent>
        </Card>

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title={t('Best Selling Products')}
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>

      <HomeCarousel items={carousels} />

      <div className='p-4 bg-background'>
        <BrowsingHistoryList />
      </div>
    </>
  )
}
