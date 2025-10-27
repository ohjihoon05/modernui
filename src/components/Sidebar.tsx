import { Sparkles, FileText, CheckCircle2, LayoutTemplate, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  activePage: 'ai-text' | 'content' | 'validation' | 'templates';
  setActivePage: (page: 'ai-text' | 'content' | 'validation' | 'templates') => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export function Sidebar({ activePage, setActivePage, isDarkMode, setIsDarkMode }: SidebarProps) {
  const menuItems = [
    { id: 'ai-text' as const, icon: Sparkles, label: 'AI Text Generation', labelKo: 'AI 텍스트 생성' },
    { id: 'content' as const, icon: FileText, label: 'Content Management', labelKo: '콘텐츠 관리' },
    { id: 'validation' as const, icon: CheckCircle2, label: 'Text Validation', labelKo: '텍스트 검증' },
    { id: 'templates' as const, icon: LayoutTemplate, label: 'Template Gallery', labelKo: '템플릿 갤러리' },
  ];

  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col relative">
      {/* Subtle gradient accent - only in dark mode */}
      {isDarkMode && (
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-br from-[#53a0fd]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      )}
      
      <div className="p-8 border-b border-sidebar-border relative z-10 flex items-center justify-between">
        <div>
          <h1 className="text-sidebar-foreground">AI Content Studio</h1>
          <p className="text-muted-foreground text-sm mt-2">AI 콘텐츠 스튜디오</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 p-6 space-y-2 relative z-10">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="flex-1 text-left">
                <div>{item.label}</div>
                <div className={`text-xs ${isActive ? 'opacity-60' : 'opacity-60'}`}>{item.labelKo}</div>
              </div>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-sidebar-border relative z-10">
        <div className="px-5 py-4 bg-sidebar-accent rounded-lg border border-sidebar-border">
          <p className="text-sm text-sidebar-foreground">Need help?</p>
          <p className="text-xs text-muted-foreground mt-1">도움이 필요하신가요?</p>
        </div>
      </div>
    </div>
  );
}
