"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { invoiceDataExtraction, type InvoiceDataExtractionOutput } from "@/ai/flows/invoice-data-extraction"
import { Loader2, UploadCloud } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"

export function InvoiceUploader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [extractedData, setExtractedData] = useState<InvoiceDataExtractionOutput | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast();
  const [invoices, setInvoices] = useLocalStorage<InvoiceDataExtractionOutput[]>("invoices", []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setExtractedData(null)
      setError(null)
    }
  }

  const handleSaveAndClose = () => {
    if (extractedData) {
      setInvoices([...invoices, extractedData]);
      toast({
        title: "Invoice Saved",
        description: `Invoice from ${extractedData.vendor} has been saved.`,
      })
      handleOpenChange(false);
    }
  }

  const handleExtract = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      toast({
        variant: 'destructive',
        title: "API Key Missing",
        description: "Please add your Gemini API key to use this feature.",
      });
      return;
    }
    
    if (!file) {
      setError("Please select a file first.")
      return
    }

    setIsExtracting(true)
    setError(null)

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        try {
          const dataUri = reader.result as string
          const result = await invoiceDataExtraction({ invoiceDataUri: dataUri })
          setExtractedData(result)
        } catch (e: any) {
           console.error(e)
           setError(e.message || "An error occurred during extraction.")
        } finally {
          setIsExtracting(false)
        }
      }
      reader.onerror = (error) => {
        console.error("Error reading file:", error)
        setError("Failed to read the file.")
        setIsExtracting(false)
      }
    } catch (e: any) {
      console.error(e)
      setError(e.message || "An error occurred during extraction.")
      setIsExtracting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      setFile(null)
      setExtractedData(null)
      setError(null)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-accent">OCR Invoice Upload</CardTitle>
          <CardDescription>
            Automate data entry by uploading your invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center space-y-4 p-6 border-2 border-dashed border-muted-foreground/30 rounded-lg text-center">
            <UploadCloud className="w-12 h-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Click the button below to upload an invoice and let our AI extract the details for you.</p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => handleOpenChange(true)}>Upload Invoice</Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload and Extract Invoice Data</DialogTitle>
            <DialogDescription>
              Select an invoice file (PDF, PNG, JPG) to automatically extract key information like vendor, amount, and due date.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="invoice-file">Invoice File</Label>
              <Input id="invoice-file" type="file" onChange={handleFileChange} accept="application/pdf,image/png,image/jpeg" />
            </div>
            {extractedData && (
              <div className="space-y-2 rounded-lg border p-4 bg-muted/50">
                <h4 className="font-semibold text-foreground">Extracted Data:</h4>
                <p><strong>Vendor:</strong> {extractedData.vendor}</p>
                <p><strong>Amount:</strong> ${extractedData.amount.toFixed(2)}</p>
                <p><strong>Due Date:</strong> {new Date(extractedData.dueDate).toLocaleDateString()}</p>
              </div>
            )}
             {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <DialogFooter>
            {extractedData ? (
              <>
                <Button variant="outline" onClick={() => setExtractedData(null)}>Extract Again</Button>
                <Button onClick={handleSaveAndClose}>Save and Close</Button>
              </>
            ) : (
               <>
                <Button variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                <Button onClick={handleExtract} disabled={!file || isExtracting}>
                  {isExtracting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isExtracting ? "Extracting..." : "Extract Data"}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
