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

// 为每个功能页面定制的 meta 信息
const pageMetaConfig: Record<string, {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}> = {
  'image-background-remover': {
    title: 'AI Background Remover | Professional Quality | Creamoda',
    description: 'Use AI to immediately delete the image background. 100% automatic, simple, and fast, very suitable for e-commerce, design, and social media. Try it now!',
    keywords: 'free background remover, AI background removal, professional photo editing, credit-based image tool, e-commerce photo editor, high-quality background removal'
  },
  'image-background-changer': {
    title: 'AI Background Changer | Customize Your Image Background Instantly | Creamoda',
    description: 'Use AI to change the background of your images, support inputting reference images or selecting design features, and you can also use language to describe the final generated image you want - no need for manual editing!',
    keywords: 'AI background replacement, remove and change background, AI design tool, background changer, credit-based image tool, high-quality background editing',
  },
  'image-enhancer': {
    title: 'AI Image Enhancer | Enlarge & Enhance Photos Without Losing Quality | Creamoda',
    description: 'Instantly upscale images with AI-powered precision. Perfect for low-res photos, old scans, or any unclear images—get sharper details, reduced noise, and natural textures in seconds. No design skills needed!',
    keywords: 'Image upscaler, AI image enhancer, high-resolution converter, enlarge image without blur, restore old photos, HD image quality, credit-based upscaling tool',
  },
  'image-changer': {
    title: 'AI Image Changer | AI-Powered Selective Image Editor | Creamoda',
    description: 'Modify specific areas of any image with AI - change colors, textures, or objects while keeping the rest perfectly intact.',
    keywords: 'selective editing, AI image changer, object replacement, image tweaking, non-destructive editing'
  },
  'image-color-changer': {
    title: 'AI Color Changer | Instantly Swap Colors in Any Image | Creamoda',
    description: 'Modify specific colors with perfect accuracy using AI. Ideal for product photos, designs, and fashion - get natural-looking results in one click.',
    keywords: 'color replacement, AI recolor tool, product photo editor, garment color changer, precise color adjustment, AI Color Changer'
  },
  'virtual-try-on': {
    title: 'AI Virtual Try-On Tool | AI-Powered Online Fitting Room | Creamoda',
    description: 'Instantly see how clothes fit with our AI-powered virtual try-on technology. Upload your image to try any outfit digitally - no physical change needed! Supports trying on your own clothes or preset garments, with realistic pose adjustments for perfect fit visualization.',
    keywords: 'AI clothing try-on, virtual fitting room, online outfit simulator, fashion tech, 3D garment visualization, AI fashion assistant, body measurement scanning, AI pose adjustment, virtual posing tool',
  },
  'outfit-generator': {
    title: 'AI Image Generator | Text-to-Image & Image-to-Image Creation Tool | Creamoda',
    description: 'Create stunning AI-generated images from text prompts or transform existing photos with our powerful AI image generator. Perfect for designers, marketers & content creators - generate unique visuals, enhance photos, or reimagine existing images in seconds. No design skills needed!',
    keywords: 'AI image generator, text to image AI, image to image AI, AI art generator, AI photo generator, free AI image creator, AI for social media, e-commerce image generator, AI design tool, virtual try-on AI, high-quality AI images, fast AI art generator, AI image enhancer, AI background remover, copyright-free AI images online, AI photo to cartoon, AI model generator, custom AI artwork, professional AI art tool',
  },
  'sketch-to-image': {
    title: 'AI Sketch Converter | Turn Drawings into Professional Design | Creamoda',
    description: 'Instantly transform your hand-drawn sketches into polished designs with AI. Perfect for fashion, product design, and concept art. No manual tracing needed!',
    keywords: 'sketch to image AI, drawing to digital converter, fashion design tool, AI design assistant, concept art generator'
  }
};

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

  // 获取自定义 meta 配置
  const metaConfig = pageMetaConfig[slug];
  if (!metaConfig) {
    // 如果没有自定义配置，使用主题配置作为后备
    const themeId = getThemeByRoute(slug);
    const theme = getTheme(themeId);
    
    return {
      title: `${theme.heroMain.title} - Creamoda AI Tools`,
      description: theme.heroMain.subtitle,
      keywords: `AI, ${theme.name}, 图像处理, 人工智能, 在线工具`,
    };
  }

  return {
    title: metaConfig.title,
    description: metaConfig.description,
    keywords: metaConfig.keywords,
    authors: [{ name: 'Creamoda AI' }],
    creator: 'Creamoda AI',
    publisher: 'Creamoda AI',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://creamoda.ai/${slug}`,
      title: metaConfig.title,
      description: metaConfig.description,
      siteName: 'Creamoda AI Tools',
      images: [
        {
          url: metaConfig.ogImage || '/images/card/removes_bg.png',
          width: 1200,
          height: 630,
          alt: metaConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaConfig.title,
      description: metaConfig.description,
      images: [metaConfig.ogImage || '/images/card/removes_bg.png'],
      creator: '@creamoda_ai',
      site: '@creamoda_ai',
    },
    alternates: {
      canonical: `https://creamoda.ai/${slug}`,
    },
    other: {
      'application-name': 'Creamoda AI Tools',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': 'Creamoda AI',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'msapplication-config': '/browserconfig.xml',
      'msapplication-TileColor': '#2B5797',
      'msapplication-tap-highlight': 'no',
      'theme-color': '#000000',
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

  // 每个功能页的产品信息映射
  const productInfoMap: Record<string, { name: string; description: string; sku: string }> = {
    background_remove: {
      name: 'AI Background Remover',
      description: 'Instantly cut out subjects and get a clean, transparent PNG in seconds. Professional quality background removal powered by AI.',
      sku: 'AI-BGR-001'
    },
    background_change: {
      name: 'AI Background Changer', 
      description: 'Replace any background with custom colors, images, or scenes. AI-powered background replacement made simple.',
      sku: 'AI-BGC-001'
    },
    image_enhance: {
      name: 'AI Image Enhancer',
      description: 'Boost image resolution up to 2x without losing sharpness or detail. Transform blurry photos into crystal clear images.',
      sku: 'AI-ENH-001'
    },
    partial_modify: {
      name: 'AI Image Changer',
      description: 'Edit or replace only the areas you select, keeping the rest untouched. Precise AI-powered selective editing.',
      sku: 'AI-CHG-001'
    },
    color_change: {
      name: 'AI Color Changer',
      description: 'Instantly swap product or object colors with realistic results. Perfect for e-commerce and design workflows.',
      sku: 'AI-COL-001'
    },
    virtual_try: {
      name: 'AI Virtual Try-On',
      description: 'Generate lifelike model images wearing your products, cutting shoot costs and boosting sales.',
      sku: 'AI-VTO-001'
    },
    outfit_generator: {
      name: 'AI Outfit Generator',
      description: 'Generate and customize fashion outfits — swap fabrics, tweak styles, redesign patterns, all in one tool.',
      sku: 'AI-OUT-001'
    },
    sketch_convert: {
      name: 'AI Sketch to Image Converter',
      description: 'Turn garment sketches into realistic images for prototyping and presentations. From concept to visual in seconds.',
      sku: 'AI-SKT-001'
    }
  };

  const productInfo = productInfoMap[themeId] || productInfoMap.background_remove;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productInfo.name,
    image: imageMap[themeId] || '/images/card/removes_bg.png',
    description: productInfo.description,
    sku: productInfo.sku,
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