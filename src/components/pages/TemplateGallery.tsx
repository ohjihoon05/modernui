import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { COMPONENT_TEMPLATES, ComponentTemplate } from '../../utils/ipsGuidelines';

export function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ComponentTemplate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const componentTypes = Array.from(new Set(COMPONENT_TEMPLATES.map(t => t.componentType)));

  const filteredTemplates = COMPONENT_TEMPLATES.filter(template => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.nameKo.includes(searchTerm) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.descriptionKo.includes(searchTerm);

    const matchesType = !selectedType || template.componentType === selectedType;

    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      button: '🔘',
      alert: '🚨',
      input: '📝',
      status: '📊',
      parameter: '⚙️',
      action: '⚡',
      measurement: '📐',
    };
    return icons[type] || '📋';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { en: string; ko: string }> = {
      button: { en: 'Button', ko: '버튼' },
      alert: { en: 'Alert', ko: '알림' },
      input: { en: 'Input', ko: '입력' },
      status: { en: 'Status', ko: '상태' },
      parameter: { en: 'Parameter', ko: '파라미터' },
      action: { en: 'Action', ko: '동작' },
      measurement: { en: 'Measurement', ko: '측정값' },
    };
    return labels[type] || { en: type, ko: type };
  };

  const handlePreview = (template: ComponentTemplate) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-foreground">원익IPS Component Templates</h2>
            <p className="text-muted-foreground mt-2">
              원익IPS 컴포넌트 템플릿 - Pre-built templates for semiconductor equipment UI
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            Priority P3
          </Badge>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search templates... / 템플릿 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Button
            variant={selectedType === null ? 'default' : 'outline'}
            onClick={() => setSelectedType(null)}
            className={`flex-shrink-0 ${selectedType === null ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border text-foreground hover:bg-muted'}`}
          >
            All / 전체
          </Button>
          {componentTypes.map((type) => {
            const typeLabel = getTypeLabel(type);
            return (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                onClick={() => setSelectedType(type)}
                className={`flex-shrink-0 ${selectedType === type ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border text-foreground hover:bg-muted'}`}
              >
                {getTypeIcon(type)} {typeLabel.en}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
        {filteredTemplates.map((template) => {
          const typeIcon = getTypeIcon(template.componentType);
          const typeLabel = getTypeLabel(template.componentType);

          return (
            <Card key={template.id} className="bg-card border-border backdrop-blur-sm hover:shadow-lg dark:hover:shadow-white/5 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-500/10 text-3xl">
                    {typeIcon}
                  </div>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground border-border">
                    {typeLabel.en} / {typeLabel.ko}
                  </Badge>
                </div>
                <CardTitle className="text-foreground">{template.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{template.nameKo}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-foreground/70">{template.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{template.descriptionKo}</p>
                </div>

                {/* Example Preview */}
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Example / 예시:</p>
                  {template.examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground/80">{example.text}</span>
                        <span className="text-sm text-muted-foreground">/ {example.textKo}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{example.contextKo}</p>
                    </div>
                  ))}
                </div>

                {/* Guidelines Summary */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground/80">Key Guidelines / 주요 가이드라인:</p>
                  <div className="space-y-1">
                    {template.guidelines.slice(0, 2).map((guideline, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-foreground/70">{guideline}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2 flex-col sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 w-full border-border text-foreground hover:bg-muted"
                  onClick={() => handlePreview(template)}
                >
                  <span className="hidden sm:inline">View Details / 상세 보기</span>
                  <span className="sm:hidden">Details / 상세</span>
                </Button>
                <Button className="flex-1 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <span className="hidden sm:inline">Use Template / 사용</span>
                  <span className="sm:hidden">Use / 사용</span>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No templates found / 템플릿을 찾을 수 없습니다</p>
          <p className="text-sm mt-1">Try adjusting your search or filters / 검색어나 필터를 조정해보세요</p>
        </div>
      )}

      {/* Template Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-card border-border">
          {selectedTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-foreground">
                  <span className="text-3xl">{getTypeIcon(selectedTemplate.componentType)}</span>
                  <div>
                    <div>{selectedTemplate.name}</div>
                    <div className="text-sm font-normal text-muted-foreground">{selectedTemplate.nameKo}</div>
                  </div>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedTemplate.description} / {selectedTemplate.descriptionKo}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* All Examples */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Examples / 예시</h3>
                  <div className="space-y-3">
                    {selectedTemplate.examples.map((example, index) => (
                      <Card key={index} className="bg-muted/50 border-border">
                        <CardContent className="pt-4">
                          <div className="mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">Example {index + 1}</Badge>
                            </div>
                            <div className="p-3 bg-card rounded border border-border">
                              <p className="text-base font-medium text-foreground">{example.text}</p>
                              <p className="text-sm text-muted-foreground mt-1">{example.textKo}</p>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            <p><strong>Context:</strong> {example.context}</p>
                            <p>{example.contextKo}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Guidelines */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Guidelines / 가이드라인</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedTemplate.guidelines.map((guideline, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/5 rounded border border-blue-500/20">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-foreground/80">{guideline}</p>
                          <p className="text-xs text-muted-foreground mt-1">{selectedTemplate.guidelinesKo[index]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">
                    Copy Examples / 예시 복사
                  </Button>
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                    Use in Generator / 생성기에 사용
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 lg:mt-8">
        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Info className="w-5 h-5" />
              Template Benefits
            </CardTitle>
            <CardDescription className="text-muted-foreground">템플릿 사용의 장점</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span>Consistent terminology across all equipment UI / 모든 설비 UI에서 일관된 용어 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span>Pre-validated against IPS guidelines / IPS 가이드라인 사전 검증</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span>Faster content creation / 빠른 콘텐츠 생성</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
                <span>Reduced errors and revisions / 오류 및 수정 감소</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Usage Notes
            </CardTitle>
            <CardDescription className="text-muted-foreground">사용 시 주의사항</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <span>Always include units for measurements / 측정값에는 항상 단위 포함</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <span>Use safety icons for alerts / 알림에는 안전 아이콘 사용</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <span>Adapt examples to your specific context / 예시를 특정 상황에 맞게 조정</span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <span>Validate customized text / 맞춤 텍스트 검증 필수</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
