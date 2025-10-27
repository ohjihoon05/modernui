import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle2, XCircle, AlertCircle, TrendingUp, FileText, Zap } from 'lucide-react';
import { Progress } from '../ui/progress';

export function TextValidation() {
  const [originalText, setOriginalText] = useState('This is a sample text that needs improvement. It contains some grammatical errors and could be more engaging. The content is okay but not great.');
  const [improvedText, setImprovedText] = useState('This is an enhanced version of the sample text. It has been refined to eliminate grammatical errors and increase engagement. The content is now polished and professional.');

  const metrics = [
    { label: 'Readability Score', labelKo: '가독성 점수', value: 85, max: 100, icon: FileText, color: '#3b82f6' },
    { label: 'Grammar Quality', labelKo: '문법 품질', value: 92, max: 100, icon: CheckCircle2, color: '#10b981' },
    { label: 'Engagement Level', labelKo: '참여도', value: 78, max: 100, icon: TrendingUp, color: '#a855f7' },
    { label: 'SEO Score', labelKo: 'SEO 점수', value: 88, max: 100, icon: Zap, color: '#f59e0b' },
  ];

  const issues = [
    { type: 'error', message: 'Grammatical error detected', messageKo: '문법 오류 감지됨', line: 1 },
    { type: 'warning', message: 'Passive voice usage', messageKo: '수동태 사용', line: 2 },
    { type: 'info', message: 'Consider using stronger adjectives', messageKo: '더 강한 형용사 사용 고려', line: 3 },
  ];

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
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

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12">
        <h2 className="text-foreground">Text Validation</h2>
        <p className="text-muted-foreground mt-2">텍스트 검증 - Compare and validate your content quality</p>
      </div>

      {/* Quality Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="bg-card border-border backdrop-blur-sm shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground/60">{metric.labelKo}</p>
                  </div>
                  <Icon className="w-8 h-8" style={{ color: metric.color }} />
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <h2 className="text-foreground">{metric.value}</h2>
                  <span className="text-muted-foreground mb-1">/ {metric.max}</span>
                </div>
                <Progress value={metric.value} className="h-2 bg-muted" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Original Text */}
        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Original Text</CardTitle>
            <CardDescription className="text-muted-foreground">원본 텍스트</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              placeholder="Enter your original text... / 원본 텍스트를 입력하세요..."
            />
            <div className="mt-6 p-5 bg-muted/50 rounded-lg space-y-3 border border-border">
              <h4 className="text-foreground/80">Issues Found / 발견된 문제</h4>
              {issues.map((issue, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded border border-border">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getIssueBadge(issue.type)}
                      <span className="text-xs text-muted-foreground">Line {issue.line}</span>
                    </div>
                    <p className="text-sm text-foreground/80">{issue.message}</p>
                    <p className="text-xs text-muted-foreground">{issue.messageKo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improved Text */}
        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span>Improved Text</span>
              <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Validated
              </Badge>
            </CardTitle>
            <CardDescription className="text-muted-foreground">개선된 텍스트</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={improvedText}
              onChange={(e) => setImprovedText(e.target.value)}
              className="min-h-[400px] resize-none font-mono text-sm bg-green-500/5 border-green-500/20 text-foreground placeholder:text-muted-foreground"
              placeholder="Improved text will appear here... / 개선된 텍스트가 표시됩니다..."
            />
            <div className="mt-6 p-5 bg-green-500/10 rounded-lg border border-green-500/20">
              <h4 className="text-green-700 dark:text-green-400 mb-3">Improvements Made / 개선 사항</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span>Fixed 1 grammatical error / 문법 오류 1개 수정</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span>Improved sentence structure / 문장 구조 개선</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span>Enhanced readability by 15% / 가독성 15% 향상</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span>Optimized for SEO / SEO 최적화</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
        <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full sm:w-auto">
          <span className="hidden sm:inline">Reset / 초기화</span>
          <span className="sm:hidden">Reset</span>
        </Button>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted w-full sm:w-auto">
          <span className="hidden lg:inline">Compare Side-by-Side / 나란히 비교</span>
          <span className="lg:hidden">Compare / 비교</span>
        </Button>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Approve Changes / 변경사항 승인</span>
          <span className="sm:hidden">Approve / 승인</span>
        </Button>
      </div>
    </div>
  );
}
