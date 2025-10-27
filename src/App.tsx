import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { AITextGeneration } from './components/pages/AITextGeneration';
import { ContentManagement } from './components/pages/ContentManagement';
import { TextValidation } from './components/pages/TextValidation';
import { TemplateGallery } from './components/pages/TemplateGallery';
import { Sheet, SheetContent } from './components/ui/sheet';
import { Button } from './components/ui/button';
import { Menu } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<'ai-text' | 'content' | 'validation' | 'templates'>('ai-text');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const renderPage = () => {
    switch (activePage) {
      case 'ai-text':
        return <AITextGeneration />;
      case 'content':
        return <ContentManagement />;
      case 'validation':
        return <TextValidation />;
      case 'templates':
        return <TemplateGallery />;
      default:
        return <AITextGeneration />;
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-background">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            activePage={activePage} 
            setActivePage={setActivePage}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>

        {/* Mobile Menu Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-80 bg-sidebar border-sidebar-border">
            <Sidebar 
              activePage={activePage} 
              setActivePage={(page) => {
                setActivePage(page);
                setMobileMenuOpen(false);
              }}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          </SheetContent>
        </Sheet>

        <main className="flex-1 overflow-y-auto relative">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              className="text-foreground"
            >
              <Menu className="w-6 h-6" />
            </Button>
            <h2 className="text-foreground">AI Content Studio</h2>
            <div className="w-10" />
          </div>

          {/* Gradient orbs - only visible in dark mode */}
          {isDarkMode && (
            <>
              <div className="absolute top-[20%] left-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-r from-[#3effb4] to-[#3effb4] rounded-full opacity-20 blur-[100px] pointer-events-none" />
              <div className="absolute top-[40%] right-[15%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-gradient-to-r from-[#53a0fd] to-[#53a0fd] rounded-full opacity-20 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-[10%] left-[30%] w-[175px] sm:w-[350px] h-[175px] sm:h-[350px] bg-gradient-to-r from-[#3023ae] to-[#c471ed] rounded-full opacity-20 blur-[100px] pointer-events-none" />
            </>
          )}
          
          {/* Light mode gradient orbs */}
          {!isDarkMode && (
            <>
              <div className="absolute top-[20%] left-[10%] w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-r from-blue-200 to-blue-300 rounded-full opacity-30 blur-[120px] pointer-events-none" />
              <div className="absolute top-[40%] right-[15%] w-[150px] sm:w-[300px] h-[150px] sm:h-[300px] bg-gradient-to-r from-purple-200 to-purple-300 rounded-full opacity-30 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[10%] left-[30%] w-[175px] sm:w-[350px] h-[175px] sm:h-[350px] bg-gradient-to-r from-pink-200 to-pink-300 rounded-full opacity-30 blur-[120px] pointer-events-none" />
            </>
          )}
          
          <div className="relative z-10">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  );
}
