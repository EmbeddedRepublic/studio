'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating Excel formulas from natural language descriptions.
 *
 * - generateExcelFormula - A function that takes a natural language description and returns an Excel formula.
 * - GenerateExcelFormulaInput - The input type for the generateExcelFormula function.
 * - GenerateExcelFormulaOutput - The return type for the generateExcelFormula function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateExcelFormulaInputSchema = z.object({
  description: z
    .string()
    .describe('A natural language description of the desired calculation.'),
});
export type GenerateExcelFormulaInput = z.infer<typeof GenerateExcelFormulaInputSchema>;

const GenerateExcelFormulaOutputSchema = z.object({
  formula: z.string().describe('The generated Excel formula.'),
  explanation: z.string().describe('A brief explanation of how the formula works.'),
});
export type GenerateExcelFormulaOutput = z.infer<typeof GenerateExcelFormulaOutputSchema>;

export async function generateExcelFormula(input: GenerateExcelFormulaInput): Promise<GenerateExcelFormulaOutput> {
  return generateExcelFormulaFlow(input);
}

const generateExcelFormulaPrompt = ai.definePrompt({
  name: 'generateExcelFormulaPrompt',
  input: {schema: GenerateExcelFormulaInputSchema},
  output: {schema: GenerateExcelFormulaOutputSchema},
  prompt: `You are an expert in Excel formulas. Given a description of a calculation, you will generate an Excel formula that performs that calculation, and a brief explanation of how the formula works. 

Description: {{{description}}}

Formula:`,
});

const generateExcelFormulaFlow = ai.defineFlow(
  {
    name: 'generateExcelFormulaFlow',
    inputSchema: GenerateExcelFormulaInputSchema,
    outputSchema: GenerateExcelFormulaOutputSchema,
  },
  async input => {
    const {output} = await generateExcelFormulaPrompt(input);
    return output!;
  }
);
