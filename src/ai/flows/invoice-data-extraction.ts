'use server';

/**
 * @fileOverview An invoice data extraction AI agent.
 *
 * - invoiceDataExtraction - A function that handles the invoice data extraction process.
 * - InvoiceDataExtractionInput - The input type for the invoiceDataExtraction function.
 * - InvoiceDataExtractionOutput - The return type for the invoiceDataExtraction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvoiceDataExtractionInputSchema = z.object({
  invoiceDataUri: z
    .string()
    .describe(
      "An invoice document, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type InvoiceDataExtractionInput = z.infer<typeof InvoiceDataExtractionInputSchema>;

const InvoiceDataExtractionOutputSchema = z.object({
  vendor: z.string().describe('The name of the vendor.'),
  amount: z.number().describe('The total amount due on the invoice.'),
  dueDate: z.string().describe('The due date of the invoice in ISO 8601 format (YYYY-MM-DD).'),
});
export type InvoiceDataExtractionOutput = z.infer<typeof InvoiceDataExtractionOutputSchema>;

export async function invoiceDataExtraction(input: InvoiceDataExtractionInput): Promise<InvoiceDataExtractionOutput> {
  return invoiceDataExtractionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'invoiceDataExtractionPrompt',
  input: {schema: InvoiceDataExtractionInputSchema},
  output: {schema: InvoiceDataExtractionOutputSchema},
  prompt: `You are an expert accounting assistant. Your job is to extract key information from invoices.

  Specifically, extract the vendor name, the total amount due, and the due date.

  Return the data in JSON format.

  Invoice: {{media url=invoiceDataUri}}`,
});

const invoiceDataExtractionFlow = ai.defineFlow(
  {
    name: 'invoiceDataExtractionFlow',
    inputSchema: InvoiceDataExtractionInputSchema,
    outputSchema: InvoiceDataExtractionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
