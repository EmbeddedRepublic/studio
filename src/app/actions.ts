'use server';

import { z } from 'zod';
import { generateExcelFormula } from '@/ai/flows/generate-excel-formula';
import { explainExcelFormula } from '@/ai/flows/explain-excel-formula';

const generateSchema = z.object({
  description: z.string().min(10, 'Please provide a description of at least 10 characters.'),
});

const explainSchema = z.object({
  formula: z.string().min(3, 'Please provide a formula of at least 3 characters.'),
});

export async function generateFormulaAction(prevState: any, formData: FormData) {
  const validatedFields = generateSchema.safeParse({
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
      result: null,
    };
  }

  try {
    const result = await generateExcelFormula(validatedFields.data);
    return { error: null, result };
  } catch (error) {
    console.error(error);
    return {
      error: 'An AI error occurred. Please try again later.',
      result: null,
    };
  }
}


export async function explainFormulaAction(prevState: any, formData: FormData) {
  const validatedFields = explainSchema.safeParse({
    formula: formData.get('formula'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
      result: null,
    };
  }
  
  try {
    const result = await explainExcelFormula(validatedFields.data);
    return { error: null, result };
  } catch (error) {
    console.error(error);
    return {
      error: 'An AI error occurred. Please try again later.',
      result: null,
    };
  }
}
