import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fraudRiskAssessment } from "@/ai/flows/fraud-risk-assessment"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"

const transactions = [
  { name: "John Doe", email: "john.doe@email.com", amount: 250.00, avatar: "/avatars/01.png" },
  { name: "Jane Smith", email: "jane.smith@email.com", amount: 150.75, avatar: "/avatars/02.png" },
  { name: "Sam Wilson", email: "sam.wilson@email.com", amount: 99.00, avatar: "/avatars/03.png" },
  { name: "Alice Johnson", email: "alice.j@email.com", amount: 500.00, avatar: "/avatars/04.png" },
  { name: "Mike Brown", email: "mike.b@email.com", amount: 45.50, avatar: "/avatars/05.png" },
]

function RiskBadge({ score }: { score: number }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
  let text = "Low";

  if (score > 0.75) {
    variant = "destructive";
    text = "High";
  } else if (score > 0.4) {
    variant = "outline";
    text = "Medium";
  }
  
  return <Badge variant={variant} className="capitalize">{text} Risk</Badge>
}

export default async function RecentTransactions() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
       <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>API Key Missing</AlertTitle>
        <AlertDescription>
          Please add your Gemini API key to the <code>.env</code> file to see AI-powered transaction risk analysis.
        </AlertDescription>
      </Alert>
    )
  }

  // MOCK DATA to avoid hitting API rate limits during development
  const riskScores = [
    0.2,  // John Doe - low risk
    0.1,  // Jane Smith - low risk
    0.5,  // Sam Wilson - medium risk
    0.8,  // Alice Johnson - high risk
    0.05, // Mike Brown - low risk
  ];

  return (
    <div className="space-y-6">
      {transactions.map((transaction, index) => (
        <div className="flex items-center" key={transaction.email}>
          <Avatar className="h-9 w-9">
            <AvatarImage data-ai-hint="person avatar" src={`https://placehold.co/36x36.png`} alt="Avatar" />
            <AvatarFallback>{transaction.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="ml-auto font-medium flex flex-col items-end">
            <span>+${transaction.amount.toFixed(2)}</span>
            <RiskBadge score={riskScores[index]} />
          </div>
        </div>
      ))}
    </div>
  )
}
