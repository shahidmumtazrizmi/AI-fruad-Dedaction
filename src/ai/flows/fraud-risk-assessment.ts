'use server';

/**
 * @fileOverview Fraud risk assessment flow using AI to score transactions.
 *
 * - fraudRiskAssessment - A function that assesses the fraud risk of a transaction.
 * - FraudRiskAssessmentInput - The input type for the fraudRiskAssessment function.
 * - FraudRiskAssessmentOutput - The return type for the fraudRiskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudRiskAssessmentInputSchema = z.object({
  transactionDetails: z
    .string()
    .describe('Details of the transaction, including amount, sender, receiver, and timestamp.'),
  userHistory: z
    .string()
    .describe('Historical data about the user, including past transactions, login history, and profile information.'),
  deviceInfo: z
    .string()
    .describe('Information about the device used for the transaction, including IP address, device type, and location.'),
});
export type FraudRiskAssessmentInput = z.infer<typeof FraudRiskAssessmentInputSchema>;

const FraudRiskAssessmentOutputSchema = z.object({
  riskScore: z
    .number()
    .describe('A score from 0 to 1 indicating the risk of fraud, where 0 is low risk and 1 is high risk.'),
  riskFactors: z
    .array(z.string())
    .describe('An array of factors contributing to the risk score, such as unusual transaction amount or suspicious location.'),
  recommendation: z
    .string()
    .describe('A recommendation based on the risk score, such as approve, review, or deny the transaction.'),
});
export type FraudRiskAssessmentOutput = z.infer<typeof FraudRiskAssessmentOutputSchema>;

export async function fraudRiskAssessment(input: FraudRiskAssessmentInput): Promise<FraudRiskAssessmentOutput> {
  return fraudRiskAssessmentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fraudRiskAssessmentPrompt',
  input: {schema: FraudRiskAssessmentInputSchema},
  output: {schema: FraudRiskAssessmentOutputSchema},
  prompt: `You are an AI fraud detection expert. Analyze the following transaction details, user history, and device info to assess the risk of fraud.

Transaction Details: {{{transactionDetails}}}
User History: {{{userHistory}}}
Device Info: {{{deviceInfo}}}

Based on your analysis, provide a risk score (0-1), list the factors contributing to the risk, and recommend whether to approve, review, or deny the transaction.

Ensure that the risk score is a number between 0 and 1.
`,
});

const fraudRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'fraudRiskAssessmentFlow',
    inputSchema: FraudRiskAssessmentInputSchema,
    outputSchema: FraudRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
