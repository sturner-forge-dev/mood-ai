import { ChatOpenAI } from '@langchain/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    summary: z.string().describe('quick summary of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'whether the journal entry is negative or not. (i.e. does it contain negative emotions?)'
      ),
    color: z
      .string()
      .describe(
        'a hexidecimal color representing the mood of the journal entry. Example: #010fe for blue representing happiness.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const formatted_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format
    your response to match the format instructions, no matter what! \n
    {formatted_instructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: { formatted_instructions },
  })

  const input = await prompt.format({ entry: content })

  console.log('input', input)
  return input
}

export const analyze = async (content: string) => {
  const input = await getPrompt(content)

  const model = new ChatOpenAI({
    temperature: 0,
    modelName: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
  })
  const result = await model.invoke(input)

  try {
    return parser.parse(String(result.content))
  } catch (e) {
    console.log('error', e)
  }
}
