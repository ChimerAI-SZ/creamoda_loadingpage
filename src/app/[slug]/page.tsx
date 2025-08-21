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

  // 每个功能页的 Schema Markup（按需求指定 image/rating）
  const imageMap: Record<string, string> = {
    background_remove: '/images/card/removes_bg.png',
    background_change: '/images/card/changes_bg.png',
    color_change: '/images/card/change_colors.png',
    outfit_generator: '/images/card/designs.png',
    partial_modify: '/images/card/partial_mod.png',
    sketch_convert: '/images/card/sketch_design.png',
    image_enhance: '/images/card/upscaless.png',
    virtual_try: '/images/card/virtual_try.png',
  };

  const ratingMap: Record<string, { ratingValue: string; reviewCount: string }> = {
    background_remove: { ratingValue: '4.9', reviewCount: '268' },
    background_change: { ratingValue: '4.8', reviewCount: '192' },
    color_change: { ratingValue: '4.8', reviewCount: '205' },
    outfit_generator: { ratingValue: '4.8', reviewCount: '173' },
    partial_modify: { ratingValue: '4.7', reviewCount: '156' },
    sketch_convert: { ratingValue: '4.7', reviewCount: '98' },
    image_enhance: { ratingValue: '4.9', reviewCount: '321' },
    virtual_try: { ratingValue: '4.9', reviewCount: '284' },
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'AI 图片生成工具',
    image: imageMap[themeId] || '/images/card/removes_bg.png',
    description: '免费在线 AI 图片生成工具，支持一键生成高清电商图、AI 模特图和创意图片。',
    sku: 'AI-IMG-001',
    brand: { '@type': 'Brand', name: 'Creamoda' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (ratingMap[themeId] || ratingMap.background_remove).ratingValue,
      reviewCount: (ratingMap[themeId] || ratingMap.background_remove).reviewCount,
    },
  } as const;

  return (
    <Suspense fallback={<PageFallback />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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