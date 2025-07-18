import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { analyzePaymentSchedule, type AnalyzePaymentScheduleOutput } from "@/ai/flows/smart-payment-schedule-analysis"
import { Lightbulb, Terminal } from "lucide-react"
import { Button } from "../ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default async function SmartPaymentCard() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
       <Card>
        <CardHeader>
          <CardTitle className="font-headline text-accent">Smart Payment Scheduler</CardTitle>
          <CardDescription>
            AI-powered suggestions to optimize your cash flow.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>API Key Missing</AlertTitle>
            <AlertDescription>
              Please add your Gemini API key to the <code>.env</code> file to see AI-powered payment suggestions.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  // MOCK DATA to avoid hitting API rate limits during development
  const schedule: AnalyzePaymentScheduleOutput = {
    suggestedPaymentSchedule: "Based on your upcoming paycheck, consider delaying the $150 utilities payment until the 6th of the month to maintain a healthier cash balance."
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-accent">Smart Payment Scheduler</CardTitle>
        <CardDescription>
          AI-powered suggestions to optimize your cash flow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-4 rounded-md bg-accent/20 p-4">
          <Lightbulb className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div className="flex-1 space-y-1">
            <p className="font-semibold text-primary">AI Suggestion</p>
            <p className="text-sm text-foreground/80">
              {schedule.suggestedPaymentSchedule}
            </p>
          </div>
        </div>
        <Button className="w-full">View Full Schedule</Button>
      </CardContent>
    </Card>
  )
}
