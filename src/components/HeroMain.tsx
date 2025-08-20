import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useCallback } from 'react';

// 主题ID到SaaS页面和功能类型的映射
const themeToSaasConfigMap: Record<string, { page: string; variationType?: string; tab?: string }> = {
  // Magic Kit 相关功能
  'background_remove': { page: 'magic-kit', variationType: '3' },    // Remove Background
  'background_change': { page: 'magic-kit', variationType: '2' },    // Change Background
  'image_enhance': { page: 'magic-kit', variationType: '5' },        // Upscale
  'color_change': { page: 'magic-kit', variationType: '1' },         // Change Color
  'partial_modify': { page: 'magic-kit', variationType: '4' },       // Partial Modification
  
  // Virtual Try-On 相关功能
  'virtual_try': { page: 'virtual-try-on' },                        // Virtual Try-On
  
  // 首页 Image to Image 相关功能
  'outfit_generator': { page: '', variationType: '11', tab: 'image-to-image' },  // Vary style (首页)
  'sketch_convert': { page: '', variationType: '4', tab: 'image-to-image' },     // Sketch to Design (首页)
};

export default function HeroMain() {
  const { currentTheme } = useTheme();
  const { heroMain } = currentTheme;

  // 根据当前域名确定SaaS环境
  const getSaasBaseUrl = useCallback(() => {
    const currentHost = window.location.hostname;
    
    // 根据当前域名判断环境
    if (currentHost === 'localhost' || currentHost === '127.0.0.1') {
      // 本地开发环境
      return 'http://localhost:3000';
    } else if (currentHost.includes('test-mvp.creamoda.ai')) {
      // 测试环境
      return 'https://test-mvp.creamoda.ai';
    } else if (currentHost.includes('create.creamoda.ai')) {
      // 生产环境
      return 'https://create.creamoda.ai';
    } else if (currentHost.includes('vercel.app')) {
      // Vercel 预览部署环境，跳转到测试环境
      return 'https://test-mvp.creamoda.ai';
    } else {
      // 默认回退到测试环境
      return 'https://test-mvp.creamoda.ai';
    }
  }, []);

  // 处理demo图片点击事件
  const handleDemoClick = useCallback((imageSrc: string) => {
    // 构建完整的图片URL（落地页的图片路径）
    const currentOrigin = window.location.origin;
    const fullImageUrl = imageSrc.startsWith('http') ? imageSrc : `${currentOrigin}${imageSrc}`;
    
    // 将完整图片URL编码后传递给SaaS系统
    const encodedImageSrc = encodeURIComponent(fullImageUrl);
    
    // 根据当前主题获取对应的SaaS页面配置
    const saasConfig = themeToSaasConfigMap[currentTheme.id] || { page: 'magic-kit', variationType: '3' };
    
    // 动态获取SaaS系统的URL
    const saasBaseUrl = getSaasBaseUrl();
    
    // 根据页面类型构建不同的URL
    let saasUrl: string;
    const params = new URLSearchParams();
    params.set('imageUrl', encodedImageSrc);
    
    if (saasConfig.variationType) {
      params.set('variationType', saasConfig.variationType);
    }
    
    if (saasConfig.tab) {
      params.set('tab', saasConfig.tab);
    }
    
    // 构建最终URL
    if (saasConfig.page) {
      saasUrl = `${saasBaseUrl}/${saasConfig.page}?${params.toString()}`;
    } else {
      // 首页
      saasUrl = `${saasBaseUrl}/?${params.toString()}`;
    }
    
    console.log('Jumping to SaaS with theme:', currentTheme.id, 'page:', saasConfig.page, 'variationType:', saasConfig.variationType);
    
    // 在新窗口中打开SaaS系统
    window.open(saasUrl, '_blank');
  }, [currentTheme.id, getSaasBaseUrl]);

  return (
    <div className="hero-main">
      <h1 className="hero-title">{heroMain.title}</h1>
      <div className="hero-subtitle">
        <p className="subtitle-main">{heroMain.subtitle}</p>
      </div>

      {/* 图片展示区域 */}
      <div className="hero-images">
        <div className="sample-image sample-1">
          <Image
            src={heroMain.mainImage}
            alt="Main sample image"
            width={500}
            height={750}
            className="sample-img"
          />
        </div>
        
        <div className="upload-showcase">
          <div className="upload-demo-area">
            <button className="upload-demo-btn">
              <Image
                src="/images/hero/upload.png"
                alt="Upload icon"
                width={18}
                height={18}
                className="upload-icon"
              />
              {heroMain.uploadText}
            </button>
            <p className="upload-demo-text">{heroMain.uploadSubText}</p>
            <button className="upload-tips-btn">
              <Image
                src="/images/hero/enhance/light.png"
                alt="Tips icon"
                width={16}
                height={16}
                className="tips-icon"
              />
              Upload Tips
            </button>
          </div>
          
          <div className="demo-suggestions">
            <p>No image? Try on of these:</p>
            <div className="demo-thumbnails">
              {heroMain.demoImages.map((imageSrc, index) => (
                <div key={index} className="demo-thumb" onClick={() => handleDemoClick(imageSrc)}>
                  <Image
                    src={imageSrc}
                    alt={`Demo image ${index + 1}`}
                    width={50}
                    height={50}
                    className="demo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
