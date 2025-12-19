
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { createProduct, updateProduct } from '@/lib/actions/product.actions'
import { IProduct } from '@/lib/db/client'
import { UploadButton } from '@/lib/uploadthing'
import { ProductInputSchema, ProductUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { IProductInput } from '@/types'


const TAGS = ['new-arrival', 'featured', 'best-seller']

// ✅ Default values
const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  videos: [], // ✅ new field
  brand: '',
  description: '',
  price: 0,
  listPrice: 0,
  countInStock: 0,
  numReviews: 0,
  avgRating: 0,
  numSales: 0,
  isPublished: false,
  tags: [],
  sizes: [],
  colors: [],
  ratingDistribution: [],
  reviews: [],
  dealEndsAt: '',
}


const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update'
  product?: IProduct
  productId?: string
}) => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<IProductInput>({
    resolver:
      type === 'Update'
        ? zodResolver(ProductUpdateSchema)
        : zodResolver(ProductInputSchema),
    defaultValues:
  product && type === 'Update'
    ? ({
        ...productDefaultValues,
        ...product,
        images: product.images ?? [],
        videos: product.videos ?? [],
        dealEndsAt: product.dealEndsAt
          ? new Date(product.dealEndsAt).toISOString().slice(0, 16)
          : '',
      } as IProductInput)
    : productDefaultValues,

  })

  const images = form.watch('images') || []
  const videos = form.watch('videos' as any) || []

 async function onSubmit(values: IProductInput) {
  
   const payload = {
    ...values,
    dealEndsAt: values.dealEndsAt
      ? values.dealEndsAt
      : null,
  }

  console.log('PAYLOAD 👉', payload)

  if (type === 'Update') {
    //await updateProduct({ ...payload, _id: productId })
  }

  if (type === 'Create') {
    const res = await createProduct(payload)
    if (!res.success) {
      toast({ variant: 'destructive', description: res.message })
    } else {
      toast({ description: res.message })
      router.push(`/admin/products`)
    }
  }

  if (type === 'Update') {
    if (!productId) {
      router.push(`/admin/products`)
      return
    }
    const res = await updateProduct({ ...payload, _id: productId })
    if (!res.success) {
      toast({ variant: 'destructive', description: res.message })
    } else {
      router.push(`/admin/products`)
    }
  }
}


  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        {/* Name + Slug */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter product slug" className="pl-8" {...field} />
                    <button
                      type="button"
                      onClick={() => {
                        form.setValue('slug', toSlug(form.getValues('name')))
                      }}
                      className="absolute right-2 top-2.5"
                    >
                      Generate
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category + Brand */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Prices + Stock */}
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="listPrice"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>List Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product list price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Net Price</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countInStock"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Count In Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter stock count" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images */}
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Images</FormLabel>
              <Card>
                <CardContent className="space-y-2 mt-2 min-h-48">
                  <div className="flex flex-wrap items-center gap-2">
                    {images.map((image: string) => (
                      <Image
                        key={image}
                        src={image}
                        alt="product image"
                        className="w-20 h-20 object-cover object-center rounded-sm"
                        width={100}
                        height={100}
                      />
                    ))}
                    <FormControl>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue('images', [...images, res[0].url], {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }}
                        onUploadError={(error: Error) => {
                          toast({ variant: 'destructive', description: `ERROR! ${error.message}` })
                        }}
                      />
                    </FormControl>
                  </div>
                </CardContent>
              </Card>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ Videos */}
        <FormField
          control={form.control}
          name={'videos' as any}
          render={() => (
            <FormItem className="w-full">
              <FormLabel>Demo Videos</FormLabel>
              <Card>
                <CardContent className="space-y-2 mt-2 min-h-32">
                  <div className="flex flex-col gap-3">
                    {videos.length > 0 ? (
                      (videos as string[]).map((video: string, idx: number) => (
                        <video key={idx} controls className="w-48 rounded-md">
                          <source src={video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No video uploaded</p>
                    )}
                    <FormControl>
                      <UploadButton
                        endpoint={'videoUploader' as any}
                        onClientUploadComplete={(res: { url: string }[]) => {
                          form.setValue('videos' as any, [...videos, res[0].url], {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            variant: 'destructive',
                            description: `ERROR! ${error.message}`,
                          })
                        }}
                      />
                    </FormControl>
                  </div>
                </CardContent>
              </Card>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <div className="flex flex-wrap gap-4">
                {TAGS.map((tag) => {
                  const isChecked = field.value.includes(tag)
                  return (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked) => {
                          const newTags = checked
                            ? [...field.value, tag]
                            : field.value.filter((t: string) => t !== tag)
                          field.onChange(newTags)
                        }}
                      />
                      <span className="capitalize">{tag}</span>
                    </div>
                  )
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sizes */}
        <FormField
          control={form.control}
          name="sizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sizes (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. S, M, L, XL"
                  value={field.value.join(', ')}
                  onChange={(e) =>
                    field.onChange(e.target.value.split(',').map((size) => size.trim()))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Colors */}
        <FormField
          control={form.control}
          name="colors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. red, blue, green"
                  value={field.value.join(', ')}
                  onChange={(e) =>
                    field.onChange(e.target.value.split(',').map((color) => color.trim()))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Write about the product..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
  control={form.control}
  name="dealEndsAt"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Offer End Time (Limited Deal)</FormLabel>
      <FormControl>
        <input
          type="datetime-local"
          value={field.value || ''}
          onChange={field.onChange}
          className="border p-2 rounded-md w-full"
        />
      </FormControl>
      <FormDescription>
        Leave empty if product has no limited-time offer
      </FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>


        {/* Is Published */}
        <FormField
          control={form.control}
          name="isPublished"
          render={({ field }) => (
            <FormItem className="space-x-2 items-center">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Is Published?</FormLabel>
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? 'Submitting...' : `${type} Product`}
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
