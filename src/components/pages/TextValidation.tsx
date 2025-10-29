import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle2, XCircle, AlertCircle, Info } from 'lucide-react';
import { Progress } from '../ui/progress';
import {
  validateIPSText,
  ValidationResult,
  ValidationIssue,
  PROHIBITED_EXPRESSIONS,
} from '../../utils/ipsGuidelines';

export function TextValidation() {
  const [inputText, setInputText] = useState('');
  const [validationResults, setValidationResults] = useState<ValidationResult[] | null>(null);
  const [overallScore, setOverallScore] = useState<number>(0);

  const handleValidate = () => {
    if (!inputText.trim()) {
      alert('Please enter text to validate');
      return;
    }

    const results = validateIPSText(inputText);
    setValidationResults(results);

    // Calculate overall score
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    setOverallScore(Math.round(avgScore));
  };

  const handleClear = () => {
    setInputText('');
    setValidationResults(null);
    setOverallScore(0);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'accuracy':
        return '🎯';
      case 'clarity':
        return '💡';
      case 'safety':
        return '🛡️';
      case 'usability':
        return '✨';
      default:
        return '📋';
    }
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, { en: string; ko: string }> = {
      accuracy: { en: 'Accuracy', ko: '정확성' },
      clarity: { en: 'Clarity', ko: '명확성' },
      safety: { en: 'Safety', ko: '안전성' },
      usability: { en: 'Usability', ko: '사용성' },
    };
    return names[category] || { en: category, ko: category };
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getIssueBadge = (type: string) => {
    const variants = {
      error: { label: 'Error', className: 'bg-red-400/20 text-red-600 dark:text-red-400 border-red-400/30' },
      warning: { label: 'Warning', className: 'bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 border-yellow-400/30' },
      info: { label: 'Info', className: 'bg-blue-400/20 text-blue-600 dark:text-blue-400 border-blue-400/30' },
    };
    const config = variants[type as keyof typeof variants] || variants.info;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground">원익IPS Text Validation</h2>
            <p className="text-muted-foreground mt-2">
              원익IPS 텍스트 검증 - Validate text against IPS UX Writing guidelines
            </p>
          </div>
          <Badge className="bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30">
            Priority P2
          </Badge>
        </div>
      </div>

      {/* Input Section */}
      <Card className="mb-8 bg-card border-border backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Text to Validate</CardTitle>
          <CardDescription className="text-muted-foreground">검증할 텍스트 입력</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] resize-none font-mono text-sm bg-input-background border-border text-foreground placeholder:text-muted-foreground"
            placeholder="Enter text to validate against IPS guidelines...&#10;예시: 적절한 온도로 설정하세요&#10;예시: 챔버 압력: 10 Torr"
          />
          <div className="flex gap-2">
            <Button onClick={handleValidate} className="flex-1 sm:flex-initial bg-primary text-primary-foreground hover:bg-primary/90">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Validate Text / 텍스트 검증
            </Button>
            <Button onClick={handleClear} variant="outline" className="border-border text-foreground hover:bg-muted">
              Clear / 초기화
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Overall Score */}
      {validationResults && (
        <Card className="mb-8 bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Overall Compliance Score</CardTitle>
            <CardDescription className="text-muted-foreground">전체 가이드라인 준수도</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</div>
              <div className="flex-1">
                <Progress value={overallScore} className="h-4 bg-muted">
                  <div className={`h-full ${getProgressColor(overallScore)}`} style={{ width: `${overallScore}%` }} />
                </Progress>
                <p className="text-sm text-muted-foreground mt-2">
                  {overallScore >= 95 ? '✅ Excellent - Meets IPS guidelines / 우수 - IPS 가이드라인 준수' :
                   overallScore >= 70 ? '⚠️ Acceptable - Minor improvements needed / 양호 - 소폭 개선 필요' :
                   '❌ Needs improvement - Major revisions required / 개선 필요 - 대폭 수정 필요'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Validation Results by Category */}
      {validationResults && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {validationResults.map((result, index) => {
            const categoryName = getCategoryName(result.category);
            const categoryIcon = getCategoryIcon(result.category);

            return (
              <Card key={index} className="bg-card border-border backdrop-blur-sm shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <span className="text-2xl">{categoryIcon}</span>
                      <div>
                        <div>{categoryName.en}</div>
                        <div className="text-sm font-normal text-muted-foreground">{categoryName.ko}</div>
                      </div>
                    </CardTitle>
                    {result.passed ? (
                      <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Passed
                      </Badge>
                    ) : (
                      <Badge className="bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-end gap-2 mb-2">
                      <h3 className={`text-3xl font-bold ${getScoreColor(result.score)}`}>{result.score}</h3>
                      <span className="text-muted-foreground mb-1">/ 100</span>
                    </div>
                    <Progress value={result.score} className="h-2 bg-muted">
                      <div className={`h-full ${getProgressColor(result.score)}`} style={{ width: `${result.score}%` }} />
                    </Progress>
                  </div>

                  {result.issues.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground/80">Issues Found / 발견된 문제</h4>
                      {result.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="p-3 bg-muted/50 rounded border border-border">
                          <div className="flex items-start gap-2 mb-2">
                            {getIssueIcon(issue.type)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                {getIssueBadge(issue.type)}
                              </div>
                              <p className="text-sm text-foreground/80">{issue.message}</p>
                              <p className="text-xs text-muted-foreground">{issue.messageKo}</p>
                            </div>
                          </div>
                          {issue.suggestion && (
                            <div className="mt-2 p-2 bg-blue-500/5 rounded border border-blue-500/20">
                              <p className="text-xs font-medium text-blue-700 dark:text-blue-400">Suggestion:</p>
                              <p className="text-xs text-foreground/70 mt-1">{issue.suggestion}</p>
                              <p className="text-xs text-muted-foreground">{issue.suggestionKo}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-500/10 rounded border border-green-500/20">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">No issues found / 문제 없음</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Guidelines Reference */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Prohibited Expressions</CardTitle>
            <CardDescription className="text-muted-foreground">금지 표현 목록</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PROHIBITED_EXPRESSIONS.map((expr, index) => (
                <Badge key={index} variant="secondary" className="bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
                  🚫 {expr}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              These vague expressions must be replaced with specific values, ranges, or concrete terms.
              / 이러한 모호한 표현은 구체적인 값, 범위 또는 명확한 용어로 대체되어야 합니다.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Standard Units</CardTitle>
            <CardDescription className="text-muted-foreground">표준 단위</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Temperature:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">°C</span>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Pressure:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">Torr</span>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Flow:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">sccm</span>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Power:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">W</span>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Voltage:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">V</span>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <span className="font-medium text-foreground/80">Current:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">A</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Always include units with numeric values in semiconductor equipment UI.
              / 반도체 설비 UI에서 숫자 값에는 항상 단위를 포함하세요.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Success Criteria */}
      <Card className="mt-8 bg-card border-border backdrop-blur-sm shadow-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Success Criteria / 성공 기준</CardTitle>
          <CardDescription className="text-muted-foreground">측정 가능한 결과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-003: Violation Detection</p>
                <p className="text-xs text-muted-foreground mt-1">100% accurate identification of guideline violations / 가이드라인 위반 100% 정확 식별</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-foreground/80">SC-005: Prohibited Terms</p>
                <p className="text-xs text-muted-foreground mt-1">100% identification with alternatives / 금지 표현 100% 식별 및 대안 제시</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
