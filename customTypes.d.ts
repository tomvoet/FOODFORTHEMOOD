import { Prisma } from '@prisma/client'

type FullPost = Prisma.PostGetPayload<{
  include: {
    restaurant: true,
    author: true
  }}>