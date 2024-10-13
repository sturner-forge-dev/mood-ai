import { prisma } from './db'
import { auth } from '@clerk/nextjs/server'

export const getUserByClerkId = async ({
  select = undefined,
  includes = undefined,
} = {}) => {
  const { userId } = await auth()

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    select,
    includes: includes as never,
  })

  return user
}
