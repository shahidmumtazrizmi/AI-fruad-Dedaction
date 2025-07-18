
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Database, Shield, CreditCard, Bot, FileText, BarChart3, AlertCircle, MessageSquare, Users, Settings, DollarSign, Brain, Eye, CheckCircle, ArrowDown, ArrowRight, GitBranch } from 'lucide-react';

const PayVibeWorkflowDiagram = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showValues, setShowValues] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const workflowNodes = [
    {
      id: 'user-signup',
      title: 'User Sign-Up',
      icon: <Users className="w-4 h-4" />,
      type: 'manual',
      cost: '$0',
      automation: 'Manual',
      position: { x: 50, y: 2 },
      connections: ['kyc-onboarding'],
      description: 'User creates account via mobile/web interface'
    },
    {
      id: 'kyc-onboarding',
      title: 'KYC Onboarding',
      icon: <Shield className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.10-$10.00',
      automation: 'Sumsub API',
      position: { x: 50, y: 8 },
      connections: ['sumsub-api'],
      description: 'Identity verification and compliance checks'
    },
    {
      id: 'sumsub-api',
      title: 'Sumsub API',
      subtitle: '(Hybrid)',
      icon: <Bot className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.10-$10.00',
      automation: 'AI + Human',
      position: { x: 25, y: 14 },
      connections: ['plaid-bank-link'],
      description: 'AI pre-screening with human verification'
    },
     {
      id: 'plaid-bank-link',
      title: 'Plaid Bank Link',
      icon: <CreditCard className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.10-$0.50',
      automation: 'Plaid API',
      position: { x: 50, y: 14 },
      connections: ['quickbooks-sync'],
      description: 'Secure bank account connection'
    },
    {
      id: 'quickbooks-sync',
      title: 'QuickBooks Sync',
      icon: <BarChart3 className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.05-$0.20',
      automation: 'QuickBooks API',
      position: { x: 75, y: 14 },
      connections: ['balance-dashboard'],
      description: 'Financial data synchronization'
    },
    {
      id: 'balance-dashboard',
      title: 'Balance Dashboard',
      icon: <BarChart3 className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.10-$0.50',
      automation: 'Plaid/MX APIs',
      position: { x: 50, y: 20 },
      connections: ['plaid-mx-apis', 'invoice-upload'],
      description: 'Real-time balance overview'
    },
    {
      id: 'plaid-mx-apis',
      title: 'Plaid/MX APIs',
      subtitle: '(Auto)',
      icon: <CreditCard className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.10-$0.50',
      automation: 'APIs',
      position: { x: 25, y: 26 },
      connections: ['cash-flow-insights'],
      description: 'Data aggregation from financial institutions.'
    },
    {
      id: 'cash-flow-insights',
      title: 'Cash Flow Insights',
      subtitle: '(AI, Auto)',
      icon: <Brain className="w-4 h-4" />,
      type: 'auto',
      cost: 'Included',
      automation: 'AI Analytics',
      position: { x: 75, y: 26 },
      connections: [],
      description: 'AI-powered cash flow predictions'
    },
    {
      id: 'invoice-upload',
      title: 'Invoice Upload',
      icon: <FileText className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.001-$0.01',
      automation: 'Azure OCR',
      position: { x: 50, y: 32 },
      connections: ['azure-ocr'],
      description: 'Document upload and processing'
    },
    {
      id: 'azure-ocr',
      title: 'Azure OCR',
      subtitle: '(Auto)',
      icon: <Eye className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.001-$0.01',
      automation: 'Azure API',
      position: { x: 25, y: 38 },
      connections: ['vendor-matching'],
      description: 'Automated text extraction'
    },
    {
      id: 'vendor-matching',
      title: 'Vendor Matching',
      subtitle: '(Custom, Auto)',
      icon: <CheckCircle className="w-4 h-4" />,
      type: 'auto',
      cost: 'Included',
      automation: 'Custom Algorithm',
      position: { x: 50, y: 38 },
      connections: ['s3-storage'],
      description: 'Automatic vendor identification'
    },
    {
      id: 's3-storage',
      title: 'S3 Storage',
      subtitle: '(Auto)',
      icon: <Database className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.023/GB',
      automation: 'AWS S3',
      position: { x: 75, y: 38 },
      connections: ['payment-scheduling'],
      description: 'Secure document storage'
    },
    {
      id: 'payment-scheduling',
      title: 'Payment Scheduling',
      icon: <DollarSign className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.50-$2.9%',
      automation: 'Smart Scheduler',
      position: { x: 50, y: 44 },
      connections: ['smart-scheduler'],
      description: 'Optimized payment timing'
    },
    {
      id: 'smart-scheduler',
      title: 'Smart Scheduler',
      subtitle: '(AI, Hybrid)',
      icon: <Bot className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Included',
      automation: 'AI + Human',
      position: { x: 25, y: 50 },
      connections: ['stripe-dwolla'],
      description: 'AI-optimized scheduling'
    },
    {
      id: 'stripe-dwolla',
      title: 'Stripe/Dwolla',
      subtitle: '(Hybrid)',
      icon: <CreditCard className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.50-$2.9%',
      automation: 'Payment APIs',
      position: { x: 75, y: 50 },
      connections: ['transaction-history'],
      description: 'Payment processing'
    },
    {
      id: 'transaction-history',
      title: 'Transaction History',
      icon: <BarChart3 className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.10-$0.50',
      automation: 'Stripe/Custom',
      position: { x: 50, y: 56 },
      connections: ['stripe-custom-export'],
      description: 'Transaction logging'
    },
    {
        id: 'stripe-custom-export',
        title: 'Stripe/Custom',
        subtitle: '(Auto)',
        icon: <CreditCard className="w-4 h-4" />,
        type: 'auto',
        cost: 'Varies',
        automation: 'API',
        position: {x: 25, y: 62},
        connections: ['export-data-s3'],
        description: 'Automated data sync with Stripe and custom systems.'
    },
    {
        id: 'export-data-s3',
        title: 'Export & Store',
        subtitle: '(Auto)',
        icon: <FileText className="w-4 h-4" />,
        type: 'auto',
        cost: '$0.023/GB',
        automation: 'S3 API',
        position: {x: 75, y: 62},
        connections: ['fraud-detection'],
        description: 'Export data and store metadata in S3.'
    },
    {
      id: 'fraud-detection',
      title: 'Fraud Detection',
      icon: <AlertCircle className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.05-$0.20',
      automation: 'Sift/Stripe Radar',
      position: { x: 50, y: 68 },
      connections: ['sift-stripe-radar'],
      description: 'AI fraud screening'
    },
    {
      id: 'sift-stripe-radar',
      title: 'Sift/Stripe Radar',
      subtitle: '(Hybrid)',
      icon: <AlertCircle className="w-4 h-4" />,
      type: 'hybrid',
      cost: '$0.05-$0.20',
      automation: 'AI + Human',
      position: { x: 25, y: 74 },
      connections: ['human-review'],
      description: 'AI fraud detection'
    },
    {
      id: 'human-review',
      title: 'Human Review',
      icon: <Users className="w-4 h-4" />,
      type: 'manual',
      cost: 'Labor Cost',
      automation: 'Human',
      position: { x: 75, y: 74 },
      connections: ['smart-notifications'],
      description: 'Manual fraud review for flagged transactions'
    },
    {
      id: 'smart-notifications',
      title: 'Smart Notifications',
      icon: <MessageSquare className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.01-$0.05',
      automation: 'Twilio/AI',
      position: { x: 50, y: 80 },
      connections: ['twilio-ai'],
      description: 'Automated notifications via SMS/Email'
    },
    {
      id: 'twilio-ai',
      title: 'Twilio/AI',
      subtitle: '(Auto)',
      icon: <Bot className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.01-$0.05',
      automation: 'AI + Twilio',
      position: { x: 50, y: 86 },
      connections: ['vendor-scoring'],
      description: 'AI-powered messaging for timely alerts'
    },
    {
      id: 'vendor-scoring',
      title: 'Vendor Scoring',
      icon: <Users className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Variable',
      automation: 'MX/AI',
      position: { x: 50, y: 92 },
      connections: ['mx-ai', 'human-verification'],
      description: 'Vendor performance scoring'
    },
    {
      id: 'mx-ai',
      title: 'MX/AI',
      subtitle: '(Hybrid)',
      icon: <Brain className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Variable',
      automation: 'AI + Human',
      position: { x: 25, y: 98 },
      connections: ['chat-support'],
      description: 'AI vendor analysis'
    },
    {
      id: 'human-verification',
      title: 'Human Verification',
      icon: <Users className="w-4 h-4" />,
      type: 'manual',
      cost: 'Labor Cost',
      automation: 'Human',
      position: { x: 75, y: 98 },
      connections: ['chat-support'],
      description: 'Manual verification'
    },
    {
      id: 'chat-support',
      title: 'Chat Support',
      icon: <MessageSquare className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.01-$0.10',
      automation: 'GPT-4 + RAG',
      position: { x: 50, y: 104 },
      connections: ['gpt4-rag', 'human-escalation'],
      description: 'AI chat support'
    },
    {
      id: 'gpt4-rag',
      title: 'GPT-4 + RAG',
      subtitle: '(Auto)',
      icon: <Bot className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.01-$0.10',
      automation: 'AI',
      position: { x: 25, y: 110 },
      connections: ['ai-storage-dashboard'],
      description: 'AI-powered chat'
    },
    {
      id: 'human-escalation',
      title: 'Human Escalation',
      subtitle: '(Hybrid)',
      icon: <Users className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Labor Cost',
      automation: 'Human',
      position: { x: 75, y: 110 },
      connections: ['ai-storage-dashboard'],
      description: 'Human support escalation'
    },
    {
      id: 'ai-storage-dashboard',
      title: 'AI Storage Dashboard',
      icon: <Database className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.023/GB',
      automation: 'AWS S3/Wasabi',
      position: { x: 50, y: 116 },
      connections: ['aws-s3-wasabi', 'metadata-tagging'],
      description: 'Storage management'
    },
    {
      id: 'aws-s3-wasabi',
      title: 'AWS S3/Wasabi',
      subtitle: '(Auto)',
      icon: <Database className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.023/GB',
      automation: 'Cloud Storage',
      position: { x: 25, y: 122 },
      connections: ['anomaly-detection'],
      description: 'Cloud storage services'
    },
    {
      id: 'metadata-tagging',
      title: 'Metadata Tagging',
      subtitle: '(AI, Auto)',
      icon: <Bot className="w-4 h-4" />,
      type: 'auto',
      cost: '$0.001/image',
      automation: 'AI Tagging',
      position: { x: 75, y: 122 },
      connections: ['anomaly-detection'],
      description: 'AI-powered tagging'
    },
    {
      id: 'anomaly-detection',
      title: 'Anomaly Detection',
      subtitle: '(Hybrid)',
      icon: <AlertCircle className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Included',
      automation: 'AI + Human',
      position: { x: 50, y: 128 },
      connections: ['account-settings'],
      description: 'AI anomaly detection'
    },
    {
      id: 'account-settings',
      title: 'Account Settings',
      icon: <Settings className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Variable',
      automation: 'Sumsub/Custom',
      position: { x: 50, y: 134 },
      connections: ['sumsub-custom', 'security-webhooks'],
      description: 'User account management'
    },
    {
      id: 'sumsub-custom',
      title: 'Sumsub/Custom',
      subtitle: '(Hybrid)',
      icon: <Settings className="w-4 h-4" />,
      type: 'hybrid',
      cost: 'Variable',
      automation: 'API + Custom',
      position: { x: 25, y: 140 },
      connections: [],
      description: 'Custom integrations for settings.'
    },
    {
      id: 'security-webhooks',
      title: 'Security & Webhooks',
      icon: <Shield className="w-4 h-4" />,
      type: 'auto',
      cost: 'Included',
      automation: 'Automated',
      position: { x: 75, y: 140 },
      connections: [],
      description: 'Security and webhook management'
    }
  ];

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'auto': return 'bg-teal-500';
      case 'hybrid': return 'bg-orange-500';
      case 'manual': return 'bg-gray-500';
      default: return 'bg-primary';
    }
  };

  const getNodeBorderColor = (type: string) => {
    switch (type) {
      case 'auto': return 'border-teal-300';
      case 'hybrid': return 'border-orange-300';
      case 'manual': return 'border-gray-300';
      default: return 'border-primary/50';
    }
  };

  const Node = ({ node, isSelected, onSelect }: { node: any, isSelected: boolean, onSelect: (id: string | null) => void }) => (
    <div
      className={`absolute transform -translate-x-1/2 cursor-pointer transition-all duration-200 ${
        isSelected ? 'scale-105 z-20' : 'z-10'
      }`}
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        width: '180px'
      }}
      onClick={() => onSelect(isSelected ? null : node.id)}
    >
      <div className={`bg-card rounded-lg shadow-md border-2 ${getNodeBorderColor(node.type)} ${
        isSelected ? 'border-primary shadow-xl' : ''
      } p-3 w-full`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`p-1.5 rounded-md ${getNodeColor(node.type)} text-white`}>
            {React.cloneElement(node.icon, { className: "w-5 h-5" })}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-card-foreground leading-tight truncate">
              {node.title}
            </div>
            {node.subtitle && (
              <div className="text-xs text-muted-foreground leading-tight truncate">
                {node.subtitle}
              </div>
            )}
          </div>
        </div>
        
        {showValues && (
          <div className="text-[11px] text-muted-foreground space-y-1 mt-2 border-t pt-2">
            <div><strong className="text-card-foreground/80">Cost:</strong> {node.cost}</div>
            <div><strong className="text-card-foreground/80">Tool:</strong> {node.automation}</div>
          </div>
        )}
        
        <div className={`text-xs px-2 py-0.5 rounded-full mt-2 text-center w-fit font-medium ${
          node.type === 'auto' ? 'bg-teal-100/10 text-teal-400' :
          node.type === 'hybrid' ? 'bg-orange-100/10 text-orange-400' :
          'bg-gray-100/10 text-gray-400'
        }`}>
          {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground p-3 rounded-lg shadow-lg text-xs w-48 z-30 border border-border">
          {node.description}
        </div>
      )}
    </div>
  );

  const stats = {
    totalNodes: workflowNodes.length,
    automated: workflowNodes.filter(n => n.type === 'auto').length,
    hybrid: workflowNodes.filter(n => n.type === 'hybrid').length,
    manual: workflowNodes.filter(n => n.type === 'manual').length,
  };

  return (
    <div className="w-full bg-background p-0 md:p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-headline font-bold text-foreground">PayVibe Workflow</h1>
              <p className="text-muted-foreground">End-to-end payment and storage workflow visualization.</p>
            </div>
            <button
              onClick={() => setShowValues(!showValues)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto"
            >
              {showValues ? 'Hide Values' : 'Show Values'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-primary">{stats.totalNodes}</div>
              <div className="text-sm text-muted-foreground">Total Steps</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-teal-500">{stats.automated}</div>
              <div className="text-sm text-muted-foreground">Automated</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-orange-500">{stats.hybrid}</div>
              <div className="text-sm text-muted-foreground">Hybrid</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-gray-500">{stats.manual}</div>
              <div className="text-sm text-muted-foreground">Manual</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-2 sm:p-6 mb-6 overflow-x-auto border">
          <div className="relative" style={{ height: '145rem', minWidth: '800px'}}>
             {isClient && <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
              <defs>
                {workflowNodes.map(node =>
                  node.connections.map(connectionId => {
                    const connectedNode = workflowNodes.find(n => n.id === connectionId);
                    return connectedNode ? (
                      <marker
                        key={`arrow-${node.id}-${connectedNode.id}`}
                        id={`arrow-${node.id}-${connectedNode.id}`}
                        markerWidth="10"
                        markerHeight="7"
                        refX="8"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--border))" />
                      </marker>
                    ) : null;
                  })
                )}
              </defs>
              <g>
                {workflowNodes.map(fromNode =>
                  fromNode.connections.map(toId => {
                    const toNode = workflowNodes.find(n => n.id === toId);
                    if (!toNode) return null;
                    
                    const fromX = fromNode.position.x;
                    const fromY = fromNode.position.y;
                    const toX = toNode.position.x;
                    const toY = toNode.position.y;
                    
                    const pathData = `M ${fromX}% ${fromY + 2}% V ${fromY + (toY-fromY)/2}% H ${toX}% V ${toY}%`;

                    return (
                       <path
                          key={`path-${fromNode.id}-${toNode.id}`}
                          d={pathData}
                          stroke="hsl(var(--border))"
                          strokeWidth="1.5"
                          fill="none"
                          markerEnd={`url(#arrow-${fromNode.id}-${toNode.id})`}
                        />
                    );
                  })
                )}
              </g>
            </svg>}
            
            {workflowNodes.map(node => (
              <div key={node.id} data-node-id={node.id}>
                <Node node={node} isSelected={selectedNode === node.id} onSelect={setSelectedNode} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 border">
          <h3 className="text-lg font-headline font-semibold mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-teal-500 rounded-md"></div>
              <div>
                <div className="font-semibold">Automated</div>
                <div className="text-sm text-muted-foreground">Fully automated processes</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-orange-500 rounded-md"></div>
              <div>
                <div className="font-semibold">Hybrid</div>
                <div className="text-sm text-muted-foreground">AI + Human oversight</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-gray-500 rounded-md"></div>
              <div>
                <div className="font-semibold">Manual</div>
                <div className="text-sm text-muted-foreground">Human-only processes</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <strong>Instructions:</strong> Click on any node to view detailed description. Toggle "Show Values" to see cost and automation details.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayVibeWorkflowDiagram;
