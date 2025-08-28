"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { testAPIKey } from "@/lib/ai-service";
import { Brain, CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function APITestPage() {
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; details?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTest = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const result = await testAPIKey();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Test failed with error',
        details: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            API Key Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-white/80">
            This page will test your Chutes AI API key to help debug any issues.
          </p>
          
          <Button 
            onClick={runTest} 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing API Key...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Test API Key
              </>
            )}
          </Button>

          {testResult && (
            <div className={`p-4 rounded-lg border ${
              testResult.success 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-center gap-3 mb-3">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <h3 className={`font-semibold ${
                  testResult.success ? 'text-green-400' : 'text-red-400'
                }`}>
                  {testResult.success ? 'Success!' : 'Error'}
                </h3>
              </div>
              
              <p className="text-white mb-3">{testResult.message}</p>
              
              {testResult.details && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-white/60 hover:text-white/80 mb-2">
                    View Details
                  </summary>
                  <pre className="bg-black/20 p-3 rounded text-white/80 overflow-x-auto">
                    {JSON.stringify(testResult.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Troubleshooting Tips:</h4>
            <ul className="text-white/80 text-sm space-y-1">
              <li>• Make sure your .env.local file is in the project root</li>
              <li>• Check that NEXT_PUBLIC_CHUTES_API_KEY is set correctly</li>
              <li>• Restart the development server after adding the API key</li>
              <li>• Verify your API key is valid at https://chutes.ai</li>
              <li>• Check the browser console for detailed error logs</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
