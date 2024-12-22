import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LLMResponse } from "@/lib/formattingText";

interface ChatProps {
  prompt?: string;
  result?: string;
}

const Chat: React.FC<ChatProps> = ({ prompt, result }) => {
  return (
    <>
      {prompt && (
        <div className="w-full py-4">
          <div className="flex items-center justify-end">
            <Card className="max-w-full">
              <CardHeader>
                <CardTitle>You</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{prompt}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {result && (
        <div className="w-full py-4">
          <div className="flex items-center justify-start">
            <Card className="max-w-full">
              <CardHeader>
                <CardTitle>Gemini</CardTitle>
              </CardHeader>
              <CardContent>
                <LLMResponse content={result} />
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
