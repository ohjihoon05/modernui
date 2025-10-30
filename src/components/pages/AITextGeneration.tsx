import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Sparkles, ArrowRight, Copy } from 'lucide-react';
import {
  generateIPSText,
  TextGenerationResult,
  UsageType,
} from '../../utils/ipsGuidelines';

export function AITextGeneration() {
  const [input, setInput] = useState('');
  const [usageType, setUsageType] = useState<UsageType | ''>('');
  const [result, setResult] = useState<TextGenerationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) {
      return;
    }

    setIsGenerating(true);

    // Simulate a slight delay for better UX
    setTimeout(() => {
      // Auto-infer componentType, safetyLevel, and units from context
      const generatedResult = generateIPSText({
        context: input,
        usageType: usageType || undefined,
        // componentType, safetyLevel, includeUnit, value are auto-inferred
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
    { text: '챔버 온도 설정 버튼', type: 'button' as UsageType },
    { text: '압력 초과 알림', type: 'alert' as UsageType },
    { text: 'TC별 알람 범위 설정 설명', type: 'manual' as UsageType },
    { text: '공정 실행 상태 표시', type: 'parameter' as UsageType },
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
            <div className="flex gap-3 items-center bg-card border-border rounded-3xl shadow-lg p-4 sm:p-6">
              <Select value={usageType} onValueChange={(value) => setUsageType(value as UsageType)}>
                <SelectTrigger className="w-[140px] sm:w-[160px] rounded-xl border-border bg-input-background">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="button">🔘 Button</SelectItem>
                  <SelectItem value="popup">💬 Popup</SelectItem>
                  <SelectItem value="alert">⚠️ Alert</SelectItem>
                  <SelectItem value="manual">📄 Manual</SelectItem>
                  <SelectItem value="parameter">📊 Parameter</SelectItem>
                </SelectContent>
              </Select>

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe the UI component..."
                className="flex-1 resize-none bg-transparent border-0 text-foreground placeholder:text-muted-foreground text-base sm:text-lg p-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px]"
                disabled={isGenerating}
                rows={1}
              />

              <Button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 shrink-0"
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
                  onClick={() => {
                    setInput(prompt.text);
                    setUsageType(prompt.type);
                  }}
                  className="px-4 py-2 text-sm rounded-full bg-muted/50 hover:bg-muted text-foreground/80 hover:text-foreground transition-colors border border-border"
                >
                  {prompt.text}
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
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xl sm:text-2xl font-medium text-foreground flex-1">
                      {result.text || 'No text generated'}
                    </p>
                    <Button
                      onClick={() => navigator.clipboard.writeText(result.text)}
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">한국어</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xl sm:text-2xl font-medium text-foreground flex-1">
                      {result.textKo || '텍스트 미생성'}
                    </p>
                    <Button
                      onClick={() => navigator.clipboard.writeText(result.textKo)}
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">中文</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xl sm:text-2xl font-medium text-foreground flex-1">
                      {result.textZh || '未生成文本'}
                    </p>
                    <Button
                      onClick={() => navigator.clipboard.writeText(result.textZh)}
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">日本語</p>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xl sm:text-2xl font-medium text-foreground flex-1">
                      {result.textJa || 'テキスト未生成'}
                    </p>
                    <Button
                      onClick={() => navigator.clipboard.writeText(result.textJa)}
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-8 w-8"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
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
                    setUsageType('');
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
