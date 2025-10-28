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
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground">원익IPS UX Text Generation</h2>
            <p className="text-muted-foreground mt-2">
              원익IPS UX 텍스트 생성 - Generate semiconductor equipment UI text following IPS guidelines
            </p>
          </div>
          <Badge className="bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30">
            Priority P1
          </Badge>
        </div>
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
                <Button onClick={handleClear} variant="outline" className="border-border text-foreground hover:bg-muted">
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
        </div>

        {/* Output Section */}
        <div>
          <Card className="h-full bg-card border-border backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Generated Text</CardTitle>
              <CardDescription className="text-muted-foreground">생성된 텍스트</CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Generated Text Display */}
                  <div className="p-6 bg-green-500/5 rounded-lg border border-green-500/20">
                    <div className="mb-4">
                      <Label className="text-sm text-muted-foreground">English</Label>
                      <div className="text-2xl font-semibold text-foreground mt-1">
                        {result.text || <span className="text-muted-foreground">N/A</span>}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">한국어</Label>
                      <div className="text-2xl font-semibold text-foreground mt-1">
                        {result.textKo || <span className="text-muted-foreground">N/A</span>}
                      </div>
                    </div>
                  </div>

                  {/* Input Context Display */}
                  <div className="space-y-2">
                    <Label className="text-foreground/80">Input Context / 입력 상황</Label>
                    <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-foreground/80">{context}</p>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="space-y-2">
                    <Label className="text-foreground/80">Explanation / 설명</Label>
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-foreground/80">{result.explanation}</p>
                      <p className="text-sm text-muted-foreground mt-1">{result.explanationKo}</p>
                    </div>
                  </div>

                  {/* Applied Rules */}
                  <div className="space-y-2">
                    <Label className="text-foreground/80">Applied Guidelines / 적용된 가이드라인</Label>
                    <div className="space-y-2">
                      {result.appliedRules.map((rule, index) => (
                        <div key={index} className="flex items-start gap-2 p-3 bg-blue-500/5 rounded border border-blue-500/20">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm text-foreground/80">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4">
                    <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">
                      Copy / 복사
                    </Button>
                    <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      Save / 저장
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[500px] flex items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 opacity-50 text-muted-foreground" />
                    <p className="text-muted-foreground">Generated text will appear here</p>
                    <p className="text-sm text-muted-foreground mt-1">생성된 텍스트가 여기에 표시됩니다</p>
                    <div className="mt-6 p-4 bg-muted/30 rounded-lg max-w-md mx-auto text-left">
                      <p className="text-xs text-muted-foreground">
                        <strong>Example contexts:</strong>
                      </p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        <li>• 챔버 온도 설정 버튼</li>
                        <li>• 압력 초과 긴급 알림</li>
                        <li>• 가스 유량 입력 필드</li>
                        <li>• 공정 실행 상태 표시</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Criteria Display */}
      <Card className="mt-6 lg:mt-8 bg-card border-border backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Success Criteria / 성공 기준</CardTitle>
          <CardDescription className="text-muted-foreground">측정 가능한 결과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-001: Response Time</p>
                <p className="text-xs text-muted-foreground mt-1">Generate text within 5 seconds / 5초 이내 텍스트 생성</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-002: Guideline Compliance</p>
                <p className="text-xs text-muted-foreground mt-1">95%+ pass all 4 validation areas / 4개 검증 영역 95% 이상 통과</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-004: Safety Text</p>
                <p className="text-xs text-muted-foreground mt-1">100% include warning icons and actions / 100% 경고 표시 및 대응 방법 포함</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-005: Prohibited Terms</p>
                <p className="text-xs text-muted-foreground mt-1">100% avoid vague expressions / 100% 모호한 표현 회피</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
