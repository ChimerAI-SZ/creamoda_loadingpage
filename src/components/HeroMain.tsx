import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useCallback } from 'react';

export default function HeroMain() {
  const { currentTheme } = useTheme();
  const { heroMain } = currentTheme;

  // 处理demo图片点击事件
  const handleDemoClick = useCallback((imageSrc: string) => {
    // 构建完整的图片URL（落地页的图片路径）
    const currentOrigin = window.location.origin;
    const fullImageUrl = imageSrc.startsWith('http') ? imageSrc : `${currentOrigin}${imageSrc}`;
    
    // 将完整图片URL编码后传递给SaaS系统
    const encodedImageSrc = encodeURIComponent(fullImageUrl);
    
    // 构建SaaS系统的URL - 使用环境变量或默认localhost
    const saasBaseUrl = process.env.NEXT_PUBLIC_SAAS_URL || 'http://localhost:3000';
    const saasUrl = `${saasBaseUrl}/magic-kit?imageUrl=${encodedImageSrc}&variationType=3`;
    
    // 在新窗口中打开SaaS系统
    window.open(saasUrl, '_blank');
  }, []);

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
                src="/images/hero/light.png"
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
