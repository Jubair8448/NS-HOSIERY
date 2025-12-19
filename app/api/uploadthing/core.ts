import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'
import { auth } from '@/auth'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // 🖼️ Image Upload
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new UploadThingError('Unauthorized')
      return { userId: session?.user?.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('✅ Image uploaded:', file.url)
      
      return { uploadedBy: metadata.userId }
    }),

  // 🎥 Video Upload
  videoUploader: f({ video: { maxFileSize: '128MB' } })
    .middleware(async () => {
      const session = await auth()
      if (!session) throw new UploadThingError('Unauthorized')
      return { userId: session?.user?.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('✅ Video uploaded:', file.url)
      return { uploadedBy: metadata.userId }
    }),
    
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
