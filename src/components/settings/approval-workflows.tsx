// src/components/settings/approval-workflows.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreVertical, Trash2, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { manageApprovalWorkflow } from "@/ai/flows/approval-workflow-management";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

type WorkflowStep = {
  approverRole: 'Admin' | 'Accountant' | 'Manager';
  threshold?: number;
};

type Workflow = {
  id: string;
  name: string;
  isEnabled: boolean;
  conditions: string[];
  steps: WorkflowStep[];
};

const initialWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Invoices over $1,000',
    isEnabled: true,
    conditions: ['Invoice total is greater than 1000'],
    steps: [{ approverRole: 'Admin' }],
  },
  {
    id: '2',
    name: 'Payments to new vendors',
    isEnabled: false,
    conditions: ['Vendor is new'],
    steps: [{ approverRole: 'Accountant' }, { approverRole: 'Admin' }],
  },
   {
    id: '3',
    name: 'International Payments',
    isEnabled: true,
    conditions: ['Beneficiary bank is outside the US'],
    steps: [{ approverRole: 'Manager' }],
  },
];

export function ApprovalWorkflowsSettings() {
  const [workflows, setWorkflows] = useLocalStorage<Workflow[]>("approvalWorkflows", initialWorkflows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateWorkflow = async (newWorkflowData: Omit<Workflow, 'id'>) => {
    // Simulate backend call
    const result = await manageApprovalWorkflow({
        workflowName: newWorkflowData.name,
        isEnabled: newWorkflowData.isEnabled,
        conditions: newWorkflowData.conditions,
        steps: newWorkflowData.steps,
    });
    
    const newWorkflow: Workflow = {
        ...newWorkflowData,
        id: result.workflowId,
    };
    setWorkflows([...workflows, newWorkflow]);
    toast({
      title: "Workflow Created",
      description: `The workflow "${newWorkflow.name}" has been saved.`,
    });
    setIsDialogOpen(false);
  };
  
  const handleToggleWorkflow = (id: string, isEnabled: boolean) => {
    setWorkflows(workflows.map(wf => wf.id === id ? { ...wf, isEnabled } : wf));
  };
  
  const handleRemoveWorkflow = (id: string) => {
    setWorkflows(workflows.filter(wf => wf.id !== id));
    toast({
        title: "Workflow Removed",
        description: "The approval workflow has been deleted.",
        variant: "destructive",
    })
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Create rules to ensure payments are always approved by the right people.
        </p>
        <Button onClick={() => setIsDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <div className="space-y-4">
        {workflows.map(workflow => (
          <Card key={workflow.id} className="p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Switch
                        checked={workflow.isEnabled}
                        onCheckedChange={(checked) => handleToggleWorkflow(workflow.id, checked)}
                        aria-label={`Toggle ${workflow.name} workflow`}
                    />
                    <div>
                        <p className="font-semibold">{workflow.name}</p>
                        <p className="text-sm text-muted-foreground">
                        {workflow.steps.map(s => s.approverRole).join(' → ')}
                        </p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveWorkflow(workflow.id)} className="text-destructive">
                           <Trash2 className="mr-2 h-4 w-4"/>
                           Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </Card>
        ))}
      </div>
       <CreateWorkflowDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreateWorkflow={handleCreateWorkflow}
      />
    </div>
  );
}


function CreateWorkflowDialog({
  isOpen,
  onOpenChange,
  onCreateWorkflow,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onCreateWorkflow: (data: Omit<Workflow, 'id'>) => void;
}) {
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('');
    const [approver, setApprover] = useState<'Admin' | 'Accountant' | 'Manager'>('Accountant');

    const handleSubmit = () => {
        if (!name || !condition) return;
        onCreateWorkflow({
            name,
            isEnabled: true,
            conditions: [condition],
            steps: [{ approverRole: approver }]
        });
        // Reset form
        setName('');
        setCondition('');
        setApprover('Accountant');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a new approval workflow</DialogTitle>
                    <DialogDescription>
                        Set up a rule that will require approvals before payments can be sent.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="workflow-name">Workflow Name</Label>
                        <Input id="workflow-name" placeholder="e.g., Marketing Expenses" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="workflow-condition">Condition</Label>
                        <Input id="workflow-condition" placeholder="e.g., Invoice total > $500" value={condition} onChange={e => setCondition(e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="workflow-approver">Approver</Label>
                        <Select value={approver} onValueChange={(val: 'Admin' | 'Accountant' | 'Manager') => setApprover(val)}>
                            <SelectTrigger id="workflow-approver">
                                <SelectValue placeholder="Select approver role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Accountant">Accountant</SelectItem>
                                <SelectItem value="Manager">Manager</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSubmit}>Create Workflow</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
