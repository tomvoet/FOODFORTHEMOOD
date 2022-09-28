import { Prisma } from '@prisma/client'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type FullPost = Prisma.PostGetPayload<{
  include: {
    restaurant: true
  }
}>

type singleLike =  {
  username: string
}
