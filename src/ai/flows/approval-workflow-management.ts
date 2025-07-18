'use server';

/**
 * @fileOverview Manages approval workflows.
 *
 * - manageApprovalWorkflow - A function that simulates creating/updating approval workflows.
 * - ApprovalWorkflowInput - The input type for the manageApprovalWorkflow function.
 * - ApprovalWorkflowOutput - The return type for the manageApprovalWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ApprovalStepSchema = z.object({
  approverRole: z.enum(['Admin', 'Accountant', 'Manager']),
  threshold: z.number().optional(),
});

const ApprovalWorkflowInputSchema = z.object({
  workflowName: z.string().describe('The name of the approval workflow.'),
  isEnabled: z.boolean().describe('Whether the workflow is currently active.'),
  conditions: z.array(z.string()).describe('The conditions that trigger this workflow.'),
  steps: z.array(ApprovalStepSchema).describe('The sequence of approval steps required.'),
});
export type ApprovalWorkflowInput = z.infer<typeof ApprovalWorkflowInputSchema>;

const ApprovalWorkflowOutputSchema = z.object({
  workflowId: z.string().describe('The unique identifier for the workflow.'),
  status: z.string().describe('The status of the operation (e.g., "Saved").'),
});
export type ApprovalWorkflowOutput = z.infer<typeof ApprovalWorkflowOutputSchema>;

export async function manageApprovalWorkflow(
  input: ApprovalWorkflowInput
): Promise<ApprovalWorkflowOutput> {
  return manageApprovalWorkflowFlow(input);
}

const prompt = ai.definePrompt({
  name: 'manageApprovalWorkflowPrompt',
  input: {schema: ApprovalWorkflowInputSchema},
  output: {schema: ApprovalWorkflowOutputSchema},
  prompt: `You are an AI assistant that processes approval workflow configurations.
  A user has submitted the following workflow for creation or update:
  - Name: {{{workflowName}}}
  - Enabled: {{{isEnabled}}}
  - Conditions: {{#each conditions}} {{{this}}}; {{/each}}
  - Steps: {{#each steps}}Requires approval from {{{approverRole}}}{{#if threshold}} over \${{{threshold}}}{{/if}}; {{/each}}

  Acknowledge the receipt and confirm that the workflow has been saved.
  Generate a unique ID for the workflow.
  Return the status as "Saved".
`,
});

const manageApprovalWorkflowFlow = ai.defineFlow(
  {
    name: 'manageApprovalWorkflowFlow',
    inputSchema: ApprovalWorkflowInputSchema,
    outputSchema: ApprovalWorkflowOutputSchema,
  },
  async input => {
    // In a real application, you would save this to a database.
    // For this prototype, we'll just simulate the AI confirmation.
    console.log('Managing workflow:', input);
    const {output} = await prompt(input);
    return output!;
  }
);
