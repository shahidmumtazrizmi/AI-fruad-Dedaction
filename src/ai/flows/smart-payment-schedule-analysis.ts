// src/ai/flows/smart-payment-schedule-analysis.ts
'use server';
/**
 * @fileOverview Analyzes transaction history and suggests optimal payment schedules.
 *
 * - analyzePaymentSchedule - A function that analyzes payment data and returns suggested payment schedules.
 * - AnalyzePaymentScheduleInput - The input type for the analyzePaymentSchedule function.
 * - AnalyzePaymentScheduleOutput - The return type for the analyzePaymentSchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePaymentScheduleInputSchema = z.object({
  transactionHistory: z.string().describe('Historical transaction data in JSON format.'),
  predictedCashFlows: z.string().describe('Predicted cash flows data in JSON format.'),
});
export type AnalyzePaymentScheduleInput = z.infer<typeof AnalyzePaymentScheduleInputSchema>;

const AnalyzePaymentScheduleOutputSchema = z.object({
  suggestedPaymentSchedule: z.string().describe('AI-optimized payment schedule suggestions.'),
});
export type AnalyzePaymentScheduleOutput = z.infer<typeof AnalyzePaymentScheduleOutputSchema>;

export async function analyzePaymentSchedule(input: AnalyzePaymentScheduleInput): Promise<AnalyzePaymentScheduleOutput> {
  return analyzePaymentScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePaymentSchedulePrompt',
  input: {schema: AnalyzePaymentScheduleInputSchema},
  output: {schema: AnalyzePaymentScheduleOutputSchema},
  prompt: `You are an AI assistant specializing in financial planning and cash flow management.

  Analyze the provided transaction history and predicted cash flows to suggest an optimal payment schedule.
  Consider factors such as upcoming expenses, income patterns, and potential savings.
  Provide a clear and actionable payment schedule that helps the user improve their cash flow management.

  Transaction History: {{{transactionHistory}}}
  Predicted Cash Flows: {{{predictedCashFlows}}}

  Based on this information, what is the optimal payment schedule?
  Please provide the response in a structured, readable format.
  `, 
});

const analyzePaymentScheduleFlow = ai.defineFlow(
  {
    name: 'analyzePaymentScheduleFlow',
    inputSchema: AnalyzePaymentScheduleInputSchema,
    outputSchema: AnalyzePaymentScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
