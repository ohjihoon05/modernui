import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, FileText, Mail, Share2, ShoppingCart, Newspaper, MessageSquare, Star } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  descriptionKo: string;
  category: string;
  categoryKo: string;
  tags: string[];
  icon: any;
  color: string;
  rating: number;
  uses: number;
}

export function TemplateGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: '1',
      title: 'Blog Post Template',
      titleKo: '블로그 포스트 템플릿',
      description: 'Perfect for writing engaging blog articles',
      descriptionKo: '매력적인 블로그 기사 작성에 완벽',
      category: 'Content',
      categoryKo: '콘텐츠',
      tags: ['Blog', 'SEO', 'Article'],
      icon: FileText,
      color: '#3b82f6',
      rating: 4.8,
      uses: 1243,
    },
    {
      id: '2',
      title: 'Email Newsletter',
      titleKo: '이메일 뉴스레터',
      description: 'Create compelling email campaigns',
      descriptionKo: '매력적인 이메일 캠페인 생성',
      category: 'Marketing',
      categoryKo: '마케팅',
      tags: ['Email', 'Newsletter', 'Marketing'],
      icon: Mail,
      color: '#a855f7',
      rating: 4.6,
      uses: 892,
    },
    {
      id: '3',
      title: 'Social Media Post',
      titleKo: '소셜 미디어 포스트',
      description: 'Craft viral social media content',
      descriptionKo: '바이럴 소셜 미디어 콘텐츠 작성',
      category: 'Social',
      categoryKo: '소셜',
      tags: ['Social', 'Instagram', 'Facebook'],
      icon: Share2,
      color: '#10b981',
      rating: 4.9,
      uses: 2156,
    },
    {
      id: '4',
      title: 'Product Description',
      titleKo: '제품 설명',
      description: 'Write persuasive product descriptions',
      descriptionKo: '설득력 있는 제품 설명 작성',
      category: 'E-commerce',
      categoryKo: '전자상거래',
      tags: ['Product', 'E-commerce', 'Sales'],
      icon: ShoppingCart,
      color: '#10b981',
      rating: 4.7,
      uses: 1567,
    },
    {
      id: '5',
      title: 'Press Release',
      titleKo: '보도자료',
      description: 'Professional press release format',
      descriptionKo: '전문적인 보도자료 형식',
      category: 'Business',
      categoryKo: '비즈니스',
      tags: ['Press', 'News', 'Business'],
      icon: Newspaper,
      color: '#f59e0b',
      rating: 4.5,
      uses: 678,
    },
    {
      id: '6',
      title: 'Customer Testimonial',
      titleKo: '고객 후기',
      description: 'Showcase customer success stories',
      descriptionKo: '고객 성공 사례 소개',
      category: 'Marketing',
      categoryKo: '마케팅',
      tags: ['Testimonial', 'Review', 'Social Proof'],
      icon: MessageSquare,
      color: '#3b82f6',
      rating: 4.8,
      uses: 934,
    },
  ];

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = 
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.titleKo.includes(searchTerm) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12">
        <h2 className="text-foreground">Template Gallery</h2>
        <p className="text-muted-foreground mt-2">템플릿 갤러리 - Choose from pre-built content templates</p>
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
            variant={selectedCategory === null ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 ${selectedCategory === null ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border text-foreground hover:bg-muted'}`}
          >
            All / 전체
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 ${selectedCategory === category ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-border text-foreground hover:bg-muted'}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTemplates.map((template) => {
          const Icon = template.icon;
          
          return (
            <Card key={template.id} className="bg-card border-border backdrop-blur-sm hover:shadow-lg dark:hover:shadow-white/5 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${template.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: template.color }} />
                </div>
                <CardTitle className="text-foreground">{template.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{template.titleKo}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/70 mb-1">{template.description}</p>
                <p className="text-xs text-muted-foreground mb-4">{template.descriptionKo}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-muted text-muted-foreground border-border">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1" style={{ color: template.color }}>
                    <Star className="w-4 h-4 fill-current" />
                    <span>{template.rating}</span>
                  </div>
                  <span className="text-muted-foreground">{template.uses.toLocaleString()} uses</span>
                </div>
              </CardContent>
              <CardFooter className="gap-2 flex-col sm:flex-row">
                <Button variant="outline" className="flex-1 w-full border-border text-foreground hover:bg-muted">
                  <span className="hidden sm:inline">Preview / 미리보기</span>
                  <span className="sm:hidden">Preview</span>
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
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No templates found / 템플릿을 찾을 수 없습니다</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
