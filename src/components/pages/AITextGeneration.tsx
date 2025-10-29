import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Sparkles, ArrowRight } from 'lucide-react';
import {
  generateIPSText,
  TextGenerationResult,
} from '../../utils/ipsGuidelines';

export function AITextGeneration() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<TextGenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      return;
    }

    setIsGenerating(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      const generatedResult = generateIPSText({
        componentType: 'button',
        context: input,
        safetyLevel: undefined,
        includeUnit: undefined,
        value: undefined,
      });

      setResult(generatedResult);
      setIsGenerating(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  const examplePrompts = [
    '챔버 온도 설정 버튼',
    '압력 초과 알림',
    '가스 유량 입력 필드',
    '공정 실행 상태 표시'
  ];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-12 pt-[10vh] md:pt-[15vh]">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        {!result && (
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-3">
              AI Text Generation
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Generate semiconductor equipment UI text
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-4">
          {/* Input Area */}
          {!result && (
            <div className="relative">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the UI component you need text for..."
                className="min-h-[80px] sm:min-h-[100px] w-full resize-none bg-card border-border text-foreground placeholder:text-muted-foreground text-base sm:text-lg p-4 sm:p-6 pr-14 rounded-3xl shadow-lg focus:ring-2 focus:ring-primary/20"
                disabled={isGenerating}
              />
              <Button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="absolute bottom-4 right-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                size="icon"
              >
                {isGenerating ? (
                  <Sparkles className="w-5 h-5 animate-pulse" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </Button>
            </div>
          )}

          {/* Example Prompts */}
          {!result && (
            <div className="flex flex-wrap gap-2 justify-center">
              {examplePrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="px-4 py-2 text-sm rounded-full bg-muted/50 hover:bg-muted text-foreground/80 hover:text-foreground transition-colors border border-border"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Result Display */}
          {result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Input Display */}
              <div className="p-4 sm:p-6 bg-muted/30 rounded-2xl">
                <p className="text-sm text-muted-foreground mb-2">Input</p>
                <p className="text-foreground">{input}</p>
              </div>

              {/* Generated Text */}
              <div className="p-6 sm:p-8 bg-card rounded-2xl shadow-lg border border-border space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">English</p>
                  <p className="text-xl sm:text-2xl font-medium text-foreground">
                    {result.text || 'No text generated'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">한국어</p>
                  <p className="text-xl sm:text-2xl font-medium text-foreground">
                    {result.textKo || '텍스트 미생성'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">中文</p>
                  <p className="text-xl sm:text-2xl font-medium text-foreground">
                    {result.textZh || '未生成文本'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">日本語</p>
                  <p className="text-xl sm:text-2xl font-medium text-foreground">
                    {result.textJa || 'テキスト未生成'}
                  </p>
                </div>
              </div>

              {/* Explanation */}
              {result.explanation && (
                <div className="p-4 sm:p-6 bg-muted/30 rounded-2xl">
                  <p className="text-sm text-muted-foreground mb-2">Explanation</p>
                  <p className="text-sm text-foreground/80">{result.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setResult(null);
                    setInput('');
                  }}
                  variant="outline"
                  className="flex-1 rounded-xl border-border text-foreground hover:bg-muted"
                >
                  New Generation
                </Button>
                <Button
                  onClick={() => {
                    const textToCopy = `EN: ${result.text}\nKO: ${result.textKo}\nZH: ${result.textZh}\nJA: ${result.textJa}`;
                    navigator.clipboard.writeText(textToCopy);
                  }}
                  className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Copy All
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
