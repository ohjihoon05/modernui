import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface Content {
  id: string;
  title: string;
  titleKo: string;
  status: 'published' | 'draft' | 'archived';
  date: string;
  author: string;
}

export function ContentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [contents] = useState<Content[]>([
    {
      id: '1',
      title: 'Introduction to AI Content',
      titleKo: 'AI 콘텐츠 소개',
      status: 'published',
      date: '2025-10-20',
      author: 'John Doe',
    },
    {
      id: '2',
      title: 'Best Practices for SEO',
      titleKo: 'SEO 모범 사례',
      status: 'published',
      date: '2025-10-18',
      author: 'Jane Smith',
    },
    {
      id: '3',
      title: 'Content Marketing Strategy',
      titleKo: '콘텐츠 마케팅 전략',
      status: 'draft',
      date: '2025-10-15',
      author: 'Mike Johnson',
    },
    {
      id: '4',
      title: 'Social Media Tips',
      titleKo: '소셜 미디어 팁',
      status: 'published',
      date: '2025-10-12',
      author: 'Sarah Lee',
    },
    {
      id: '5',
      title: 'Email Campaign Guide',
      titleKo: '이메일 캠페인 가이드',
      status: 'draft',
      date: '2025-10-10',
      author: 'Tom Wilson',
    },
    {
      id: '6',
      title: 'Brand Voice Development',
      titleKo: '브랜드 보이스 개발',
      status: 'archived',
      date: '2025-09-28',
      author: 'Emily Chen',
    },
  ]);

  const getStatusBadge = (status: Content['status']) => {
    const variants = {
      published: { 
        variant: 'default' as const, 
        label: 'Published / 발행됨', 
        className: 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 hover:bg-green-500/20' 
      },
      draft: { 
        variant: 'secondary' as const, 
        label: 'Draft / 초안', 
        className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30 hover:bg-blue-500/20' 
      },
      archived: { 
        variant: 'outline' as const, 
        label: 'Archived / 보관됨', 
        className: 'bg-muted/50 text-muted-foreground border-border' 
      },
    };
    
    const config = variants[status];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.titleKo.includes(searchTerm)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-12">
      <div className="mb-6 lg:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-foreground">Content Management</h2>
          <p className="text-muted-foreground mt-2">콘텐츠 관리 - Manage and organize your content</p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">New Content / 새 콘텐츠</span>
          <span className="sm:hidden">New / 새 콘텐츠</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Content</p>
                <h3 className="text-foreground mt-1">{contents.length}</h3>
              </div>
              <div className="w-12 h-12 bg-chart-2/20 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <h3 className="text-foreground mt-1">
                  {contents.filter(c => c.status === 'published').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 text-green-600 dark:text-green-400">✓</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <h3 className="text-foreground mt-1">
                  {contents.filter(c => c.status === 'draft').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-chart-2/20 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Archived</p>
                <h3 className="text-foreground mt-1">
                  {contents.filter(c => c.status === 'archived').length}
                </h3>
              </div>
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border backdrop-blur-sm shadow-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-foreground">All Content</CardTitle>
              <CardDescription className="text-muted-foreground">모든 콘텐츠</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search content... / 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-input-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Title / 제목</TableHead>
                <TableHead className="text-muted-foreground hidden sm:table-cell">Status / 상태</TableHead>
                <TableHead className="text-muted-foreground hidden md:table-cell">Date / 날짜</TableHead>
                <TableHead className="text-muted-foreground hidden lg:table-cell">Author / 작성자</TableHead>
                <TableHead className="text-right text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContents.map((content) => (
                <TableRow key={content.id} className="border-border hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="text-foreground">{content.title}</div>
                      <div className="text-sm text-muted-foreground">{content.titleKo}</div>
                      <div className="sm:hidden mt-1">{getStatusBadge(content.status)}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{getStatusBadge(content.status)}</TableCell>
                  <TableCell className="text-foreground/60 hidden md:table-cell">{content.date}</TableCell>
                  <TableCell className="text-foreground/60 hidden lg:table-cell">{content.author}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted h-8 w-8 p-0">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-400/10 h-8 w-8 p-0">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredContents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No content found / 콘텐츠를 찾을 수 없습니다</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
