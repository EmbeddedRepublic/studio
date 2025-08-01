'use client';

import { useEffect, useState, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { generateFormulaAction } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { GenerateExcelFormulaOutput } from '@/ai/flows/generate-excel-formula';

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
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Formula
        </>
      )}
    </Button>
  );
}

export function FormulaGenerator() {
  const [state, formAction] = useFormState(generateFormulaAction, initialState);
  const [copied, setCopied] = useState(false);
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

  const handleCopy = () => {
    if (state.result?.formula) {
      navigator.clipboard.writeText(state.result.formula);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const result = state.result as GenerateExcelFormulaOutput | null;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Generate Formula</CardTitle>
        <CardDescription>Describe what you want to calculate, and we'll generate the Excel formula for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <Textarea
            name="description"
            placeholder="e.g., 'Sum of values in column A if column B contains the word &quot;Complete&quot;'"
            className="min-h-[100px]"
            required
            minLength={10}
          />
          <SubmitButton />
        </form>

        {result && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-500">
            <div>
              <h3 className="font-semibold mb-2">Generated Formula</h3>
              <div className="flex items-center justify-between p-3 bg-muted rounded-md font-mono text-sm group">
                <code className="break-all">{result.formula}</code>
                <Button variant="ghost" size="icon" onClick={handleCopy} aria-label="Copy formula">
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
                </Button>
              </div>
            </div>
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
