'use server';

/**
 * @fileOverview This file defines a Genkit flow for explaining Excel formulas.
 *
 * - explainExcelFormula - A function that takes an Excel formula as input and returns an explanation of how it works.
 * - ExplainExcelFormulaInput - The input type for the explainExcelFormula function.
 * - ExplainExcelFormulaOutput - The return type for the explainExcelFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainExcelFormulaInputSchema = z.object({
  formula: z.string().describe('The Excel formula to explain.'),
});
export type ExplainExcelFormulaInput = z.infer<typeof ExplainExcelFormulaInputSchema>;

const ExplainExcelFormulaOutputSchema = z.object({
  explanation: z.string().describe('A brief explanation of how the Excel formula works.'),
});
export type ExplainExcelFormulaOutput = z.infer<typeof ExplainExcelFormulaOutputSchema>;

export async function explainExcelFormula(input: ExplainExcelFormulaInput): Promise<ExplainExcelFormulaOutput> {
  return explainExcelFormulaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainExcelFormulaPrompt',
  input: {schema: ExplainExcelFormulaInputSchema},
  output: {schema: ExplainExcelFormulaOutputSchema},
  prompt: `You are an expert in Excel formulas. Explain how the following Excel formula works in a concise and easy-to-understand manner.\n\nFormula: {{{formula}}}`,
});

const explainExcelFormulaFlow = ai.defineFlow(
  {
    name: 'explainExcelFormulaFlow',
    inputSchema: ExplainExcelFormulaInputSchema,
    outputSchema: ExplainExcelFormulaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
