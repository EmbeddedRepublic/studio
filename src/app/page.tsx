import { FormulaGenerator } from '@/components/formula-generator';
import { FormulaExplainer } from '@/components/formula-explainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sigma, FunctionSquare, MessageSquareText } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-4 pt-12 sm:p-8 sm:pt-16 md:p-12 md:pt-20 lg:p-24">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Sigma className="w-9 h-9 sm:w-10 sm:h-10 text-primary" />
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          FormulaWise
        </h1>
      </div>
      <p className="text-muted-foreground mb-8 sm:mb-10 text-center max-w-2xl text-base sm:text-lg">
        Your AI-powered assistant for Excel. Generate complex formulas from simple descriptions or get clear explanations for existing ones.
      </p>
      <div className="w-full max-w-3xl">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="generate" className="text-sm">
              <FunctionSquare className="mr-2 h-5 w-5" />
              Generate Formula
            </TabsTrigger>
            <TabsTrigger value="explain" className="text-sm">
              <MessageSquareText className="mr-2 h-5 w-5" />
              Explain Formula
            </TabsTrigger>
          </TabsList>
          <TabsContent value="generate">
            <FormulaGenerator />
          </TabsContent>
          <TabsContent value="explain">
            <FormulaExplainer />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
