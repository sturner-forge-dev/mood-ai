import { Analysis } from '@prisma/client'

export type JournalEntry = {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  userId: string
  analysis?: Analysis | null
}
