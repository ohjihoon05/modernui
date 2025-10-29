import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import {
  generateIPSText,
  ComponentType,
  SafetyLevel,
  UNITS,
  TextGenerationResult,
} from '../../utils/ipsGuidelines';

export function AITextGeneration() {
  const [componentType, setComponentType] = useState<ComponentType>('button');
  const [context, setContext] = useState('');
  const [safetyLevel, setSafetyLevel] = useState<SafetyLevel | '' | 'none'>('none');
  const [includeUnit, setIncludeUnit] = useState<keyof typeof UNITS | '' | 'none'>('none');
  const [value, setValue] = useState('');
  const [result, setResult] = useState<TextGenerationResult | null>(null);

  const handleGenerate = () => {
    if (!context.trim()) {
      alert('Please enter a context description');
      return;
    }

    const generatedResult = generateIPSText({
      componentType,
      context,
      safetyLevel: (safetyLevel && safetyLevel !== 'none') ? safetyLevel as SafetyLevel : undefined,
      includeUnit: (includeUnit && includeUnit !== 'none') ? includeUnit as keyof typeof UNITS : undefined,
      value: value || undefined,
    });

    console.log('=== Text Generation Debug ===');
    console.log('Input:', { componentType, context, safetyLevel, includeUnit, value });
    console.log('Generated Result:', generatedResult);
    console.log('Text:', generatedResult.text);
    console.log('TextKo:', generatedResult.textKo);
    console.log('TextZh:', generatedResult.textZh);
    console.log('TextJa:', generatedResult.textJa);
    console.log('Text length:', generatedResult.text?.length);
    console.log('TextKo length:', generatedResult.textKo?.length);
    console.log('TextZh length:', generatedResult.textZh?.length);
    console.log('TextJa length:', generatedResult.textJa?.length);
    console.log('===========================');

    setResult(generatedResult);
  };

  const handleClear = () => {
    setContext('');
    setSafetyLevel('none');
    setIncludeUnit('none');
    setValue('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-8">
      {/* Header */}
      <div className="w-full max-w-3xl text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          원익IPS UX Text Generation
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate semiconductor equipment UI text following IPS guidelines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Input Section */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Input Settings</CardTitle>
              <CardDescription className="text-muted-foreground">입력 설정</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="component-type" className="text-foreground/80">
                  Component Type / 컴포넌트 유형
                </Label>
                <Select value={componentType} onValueChange={(v) => setComponentType(v as ComponentType)}>
                  <SelectTrigger id="component-type" className="bg-input-background border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="button">Button / 버튼</SelectItem>
                    <SelectItem value="alert">Alert / 알림</SelectItem>
                    <SelectItem value="input">Input Field / 입력 필드</SelectItem>
                    <SelectItem value="status">Status / 상태 표시</SelectItem>
                    <SelectItem value="parameter">Parameter / 파라미터</SelectItem>
                    <SelectItem value="action">Action / 동작</SelectItem>
                    <SelectItem value="measurement">Measurement / 측정값</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context" className="text-foreground/80">
                  Context / 상황 설명
                </Label>
                <Textarea
                  id="context"
                  placeholder="예: 챔버 온도 설정 버튼, 압력 초과 알림, 가스 유량 입력"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  className="min-h-[100px] resize-none bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="safety-level" className="text-foreground/80">
                  Safety Level / 안전 수준 (Optional)
                </Label>
                <Select value={safetyLevel} onValueChange={(v) => setSafetyLevel(v as SafetyLevel | '' | 'none')}>
                  <SelectTrigger id="safety-level" className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select if safety-related... / 안전 관련 시 선택" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="none">None / 없음</SelectItem>
                    <SelectItem value="critical">🚨 Critical / 긴급</SelectItem>
                    <SelectItem value="danger">🔴 Danger / 위험</SelectItem>
                    <SelectItem value="warning">⚠️ Warning / 경고</SelectItem>
                    <SelectItem value="blocked">🚫 Blocked / 차단</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-foreground/80">
                    Unit / 단위 (Optional)
                  </Label>
                  <Select value={includeUnit} onValueChange={(v) => setIncludeUnit(v as keyof typeof UNITS | '' | 'none')}>
                    <SelectTrigger id="unit" className="bg-input-background border-border text-foreground">
                      <SelectValue placeholder="Select unit..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="none">None / 없음</SelectItem>
                      <SelectItem value="temperature">°C (Temperature)</SelectItem>
                      <SelectItem value="pressure">Torr (Pressure)</SelectItem>
                      <SelectItem value="flow">sccm (Flow)</SelectItem>
                      <SelectItem value="power">W (Power)</SelectItem>
                      <SelectItem value="voltage">V (Voltage)</SelectItem>
                      <SelectItem value="current">A (Current)</SelectItem>
                      <SelectItem value="time">s (Time)</SelectItem>
                      <SelectItem value="rpm">RPM (Rotation)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="value" className="text-foreground/80">
                    Value / 값 (Optional)
                  </Label>
                  <Input
                    id="value"
                    type="text"
                    placeholder="e.g., 350, 450±2"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleGenerate} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Text / 텍스트 생성
                </Button>
                <Button onClick={handleClear} variant="secondary" className="bg-muted hover:bg-muted/70 text-foreground">
                  Clear / 초기화
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines Info */}
          <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Info className="w-5 h-5" />
                IPS UX Writing Principles
              </CardTitle>
              <CardDescription className="text-muted-foreground">5대 핵심 원칙</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span><strong>Accuracy</strong> / 정확성: Precise values and units</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span><strong>Safety</strong> / 안전성: Clear warnings and icons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span><strong>Immediate Comprehensibility</strong> / 즉시 이해 가능성</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span><strong>Consistency</strong> / 일관성: Standard terminology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span><strong>Hierarchical Structure</strong> / 계층적 정보 구조</span>
                </li>
              </ul>
            </CardContent>
          </Card>
      {/* Main Content */}
      <div className="w-full max-w-3xl space-y-4">
        {/* Component Type Selection - Compact Pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {(['button', 'alert', 'input', 'status', 'parameter', 'action', 'measurement'] as ComponentType[]).map((type) => (
            <button
              key={type}
              onClick={() => setComponentType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                componentType === type
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Input Area */}
        <div className="relative">
          <Textarea
            placeholder="예: 챔버 온도 설정 버튼, 압력 초과 알림, 가스 유량 입력..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="min-h-[120px] resize-none bg-card border-border text-foreground placeholder:text-muted-foreground text-base px-6 py-4 pr-14 rounded-2xl shadow-sm"
          />
          <Button
            onClick={handleGenerate}
            disabled={!context.trim()}
            className="absolute bottom-3 right-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            size="sm"
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>

        {/* Optional Settings - Compact Row */}
        <div className="flex flex-wrap gap-2">
          <Select value={safetyLevel} onValueChange={(v) => setSafetyLevel(v as SafetyLevel | '' | 'none')}>
            <SelectTrigger className="w-auto bg-card border-border text-foreground text-sm rounded-full px-4">
              <SelectValue placeholder="Safety Level" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="critical">🚨 Critical</SelectItem>
              <SelectItem value="danger">🔴 Danger</SelectItem>
              <SelectItem value="warning">⚠️ Warning</SelectItem>
              <SelectItem value="blocked">🚫 Blocked</SelectItem>
            </SelectContent>
          </Select>

          <Select value={includeUnit} onValueChange={(v) => setIncludeUnit(v as keyof typeof UNITS | '' | 'none')}>
            <SelectTrigger className="w-auto bg-card border-border text-foreground text-sm rounded-full px-4">
              <SelectValue placeholder="Unit" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="temperature">°C</SelectItem>
              <SelectItem value="pressure">Torr</SelectItem>
              <SelectItem value="flow">sccm</SelectItem>
              <SelectItem value="power">W</SelectItem>
              <SelectItem value="voltage">V</SelectItem>
              <SelectItem value="current">A</SelectItem>
              <SelectItem value="time">s</SelectItem>
              <SelectItem value="rpm">RPM</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Value (e.g., 350)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-auto max-w-[140px] bg-card border-border text-foreground placeholder:text-muted-foreground text-sm rounded-full px-4"
          />

          {(context || safetyLevel !== 'none' || includeUnit !== 'none' || value) && (
            <Button
              onClick={handleClear}
              variant="ghost"
              size="sm"
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Generated Output */}
        {result ? (
          <div className="space-y-4 animate-in fade-in-50 duration-500">
            {/* Generated Text Display */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">English</div>
                <div className="text-xl font-medium text-foreground">
                  {result.text && result.text.trim() ? result.text : '[No text generated]'}
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">한국어</div>
                <div className="text-xl font-medium text-foreground">
                  {result.textKo && result.textKo.trim() ? result.textKo : '[텍스트 미생성]'}
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">中文</div>
                <div className="text-xl font-medium text-foreground">
                  {result.textZh && result.textZh.trim() ? result.textZh : '[未生成文本]'}
                </div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <div className="text-xs text-muted-foreground mb-1">日本語</div>
                <div className="text-xl font-medium text-foreground">
                  {result.textJa && result.textJa.trim() ? result.textJa : '[テキスト未生成]'}
                </div>
              </div>
            </div>

            {/* Explanation - Collapsible */}
            <details className="bg-muted/30 rounded-xl p-4 group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80 list-none flex items-center justify-between">
                <span>Explanation</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 space-y-2 text-sm text-foreground/70">
                <p>{result.explanation}</p>
                <p className="text-muted-foreground">{result.explanationKo}</p>
              </div>
            </details>

            {/* Applied Guidelines - Collapsible */}
            <details className="bg-muted/30 rounded-xl p-4 group">
              <summary className="cursor-pointer text-sm font-medium text-foreground/80 list-none flex items-center justify-between">
                <span>Applied Guidelines</span>
                <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="mt-2 space-y-2">
                {result.appliedRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-foreground/70">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </details>
          </div>
        ) : (
          <div className="text-center py-16">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Enter context and press generate to create UI text
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
