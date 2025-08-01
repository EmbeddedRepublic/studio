'use client';

import { useEffect, useState, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { explainFormulaAction } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ExplainExcelFormulaOutput } from '@/ai/flows/explain-excel-formula';

const initialState = {
  error: null,
  result: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full h-11" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Explaining...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Explain Formula
        </>
      )}
    </Button>
  );
}

export function FormulaExplainer() {
  const [state, formAction] = useFormState(explainFormulaAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.error,
      });
    }
    if (state.result) {
        formRef.current?.reset();
    }
  }, [state, toast]);

  const result = state.result as ExplainExcelFormulaOutput | null;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Explain Formula</CardTitle>
        <CardDescription>Paste an Excel formula, and we'll provide a step-by-step explanation of how it works.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="formula"
            placeholder='e.g., =VLOOKUP(A2,Sheet2!A:B,2,FALSE)'
            className="min-h-[100px] font-mono"
            required
            minLength={3}
          />
          <SubmitButton />
        </form>

        {result && (
          <div className="mt-6 space-y-4 animate-in fade-in duration-500">
            <div>
              <h3 className="font-semibold mb-2">Explanation</h3>
              <div className="prose prose-sm text-muted-foreground dark:prose-invert leading-relaxed">
                {result.explanation}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
