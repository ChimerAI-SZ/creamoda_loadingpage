'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';

interface ThemeAwarePageProps {
  initialTheme?: string;
}

export default function ThemeAwarePage({ initialTheme }: ThemeAwarePageProps) {
  const searchParams = useSearchParams();
  const { setTheme, themeId } = useTheme();

  useEffect(() => {
    // 优先使用路径参数传入的主题
    if (initialTheme && initialTheme !== themeId) {
      setTheme(initialTheme);
      return;
    }

    // 备用：检查查询参数（保持向后兼容）
    const themeParam = searchParams.get('theme');
    if (themeParam && themeParam !== themeId) {
      setTheme(themeParam);
    }
  }, [initialTheme, searchParams, setTheme, themeId]);

  return (
    <div className="min-h-screen">
      {/* <ThemeSwitcher /> */}
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
} 