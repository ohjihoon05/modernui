import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sparkles } from 'lucide-react';

export function AITextGeneration() {
  const [inputText, setInputText] = useState('');
  const [template, setTemplate] = useState('');
  const [tone, setTone] = useState('');
  const [style, setStyle] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleGenerate = () => {
    setGeneratedText(`Generated content based on your input:\n\n${inputText}\n\nTemplate: ${template}\nTone: ${tone}\nStyle: ${style}\n\nThis is a preview of AI-generated content that would appear here in a real implementation.`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12">
        <h2 className="text-foreground">AI Text Generation</h2>
        <p className="text-muted-foreground mt-2">AI 텍스트 생성 - Create engaging content with AI assistance</p>
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
                <Label htmlFor="input-text" className="text-foreground/80">Your Content / 콘텐츠 입력</Label>
                <Textarea
                  id="input-text"
                  placeholder="Enter your text here... / 텍스트를 입력하세요..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[140px] resize-none bg-input-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="template" className="text-foreground/80">Template / 템플릿</Label>
                <Select value={template} onValueChange={setTemplate}>
                  <SelectTrigger id="template" className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select a template... / 템플릿 선택" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="blog">Blog Post / 블로그 포스트</SelectItem>
                    <SelectItem value="social">Social Media / 소셜 미디어</SelectItem>
                    <SelectItem value="email">Email / 이메일</SelectItem>
                    <SelectItem value="product">Product Description / 제품 설명</SelectItem>
                    <SelectItem value="article">Article / 기사</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tone" className="text-foreground/80">Tone / 톤</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone" className="bg-input-background border-border text-foreground">
                      <SelectValue placeholder="Select tone..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="professional">Professional / 전문적</SelectItem>
                      <SelectItem value="casual">Casual / 캐주얼</SelectItem>
                      <SelectItem value="friendly">Friendly / 친근한</SelectItem>
                      <SelectItem value="formal">Formal / 격식있는</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style" className="text-foreground/80">Style / 스타일</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="style" className="bg-input-background border-border text-foreground">
                      <SelectValue placeholder="Select style..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="concise">Concise / 간결한</SelectItem>
                      <SelectItem value="detailed">Detailed / 상세한</SelectItem>
                      <SelectItem value="creative">Creative / 창의적</SelectItem>
                      <SelectItem value="technical">Technical / 기술적</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Text / 텍스트 생성
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Additional Options</CardTitle>
              <CardDescription className="text-muted-foreground">추가 옵션</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="length" className="text-foreground/80">Length / 길이</Label>
                <Select>
                  <SelectTrigger id="length" className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select length..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="short">Short (100-200 words)</SelectItem>
                    <SelectItem value="medium">Medium (200-500 words)</SelectItem>
                    <SelectItem value="long">Long (500+ words)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="text-foreground/80">Language / 언어</Label>
                <Select>
                  <SelectTrigger id="language" className="bg-input-background border-border text-foreground">
                    <SelectValue placeholder="Select language..." />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ko">한국어 (Korean)</SelectItem>
                    <SelectItem value="both">Both / 둘 다</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div>
          <Card className="h-full bg-card border-border backdrop-blur-sm shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Real-time Preview</CardTitle>
              <CardDescription className="text-muted-foreground">실시간 미리보기</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger value="preview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Preview / 미리보기</TabsTrigger>
                  <TabsTrigger value="html" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">HTML</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="min-h-[500px] p-6 bg-muted/50 rounded-lg border border-border">
                    {generatedText ? (
                      <div className="whitespace-pre-wrap text-foreground/80">{generatedText}</div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>Generated content will appear here</p>
                          <p className="text-sm mt-1">생성된 콘텐츠가 여기에 표시됩니다</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="html" className="mt-4">
                  <div className="min-h-[500px] p-6 bg-secondary rounded-lg text-chart-1 font-mono text-sm border border-border">
                    {generatedText ? (
                      <pre className="whitespace-pre-wrap"><div>\n  {generatedText}\n</div></pre>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No content generated yet
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {generatedText && (
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">Copy / 복사</Button>
                  <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-muted">Download / 다운로드</Button>
                  <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">Save / 저장</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
