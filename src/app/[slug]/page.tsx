import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getThemeByRoute, getAllRoutes } from '@/config/routes';
import { getTheme } from '@/config/themes';
import ThemeAwarePage from '@/components/ThemeAwarePage';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>
  );
}

// 动态生成元数据
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // 检查路由是否有效
  const validRoutes = getAllRoutes();
  if (!validRoutes.includes(slug)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  // 获取主题配置
  const themeId = getThemeByRoute(slug);
  const theme = getTheme(themeId);

  return {
    title: `${theme.heroMain.title} - Chimer AI Tools`,
    description: theme.heroMain.subtitle,
    keywords: `AI, ${theme.name}, 图像处理, 人工智能, 在线工具`,
    openGraph: {
      title: theme.heroMain.title,
      description: theme.heroMain.subtitle,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: theme.heroMain.title,
      description: theme.heroMain.subtitle,
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  
  // 检查路由是否有效
  const validRoutes = getAllRoutes();
  if (!validRoutes.includes(slug)) {
    notFound();
  }

  // 获取对应的主题ID
  const themeId = getThemeByRoute(slug);

  return (
    <Suspense fallback={<PageFallback />}>
      <ThemeAwarePage initialTheme={themeId} />
    </Suspense>
  );
}

// 生成静态路径（可选，用于提高性能）
export async function generateStaticParams() {
  const routes = getAllRoutes();
  
  return routes.map((slug) => ({
    slug,
  }));
} 