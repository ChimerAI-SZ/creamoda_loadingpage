'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import HeroMain from './HeroMain';
import FusionGuide from './FusionGuide';
import WhyChoose from './WhyChoose';
import OfferMore from './OfferMore';

export default function Hero() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavHeightVar = () => {
      const navEl = navRef.current;
      if (!navEl) return;
      const height = navEl.offsetHeight;
      document.documentElement.style.setProperty('--hero-nav-height', `${height}px`);
    };

    updateNavHeightVar();
    const resizeObserver = new ResizeObserver(updateNavHeightVar);
    if (navRef.current) {
      resizeObserver.observe(navRef.current);
    }
    window.addEventListener('resize', updateNavHeightVar);
    return () => {
      window.removeEventListener('resize', updateNavHeightVar);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  const openDropdown = (dropdownName: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(dropdownName);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimeoutRef.current = null;
    }, 180);
  };

  return (
    <section className="hero-container">
      {/* 背景 */}
      <div className="hero-background"></div>
      
      {/* 内容 */}
      <div className={`hero-content ${activeDropdown ? 'dropdown-active' : ''}`}>
        {/* 导航栏 */}
        <nav className={`hero-nav ${isScrolled ? 'scrolled' : ''}`} ref={navRef as any}>
          <div className="hero-logo">
            <Image
              src={isScrolled ? "/images/logo_light.png" : "/images/logo.png"}
              alt="CREAMODA"
              width={140}
              height={45}
              className="logo-image"
              style={{
                width: 'clamp(80px, 12vw, 140px)',
                height: 'auto'
              }}
            />
          </div>
          <div className="hero-nav-links">
            <div 
              className="nav-dropdown"
              onMouseEnter={() => openDropdown('fashion-design')}
              onMouseLeave={scheduleClose}
            >
              <button 
                className="nav-link tools-link"
              >
                Fashion Design
                <svg 
                  className={`dropdown-arrow ${activeDropdown === 'fashion-design' ? 'dropdown-arrow-open' : ''}`}
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => openDropdown('virtual-tryon')}
              onMouseLeave={scheduleClose}
            >
              <button 
                className="nav-link tools-link"
              >
                Virtual Try-on
                <svg 
                  className={`dropdown-arrow ${activeDropdown === 'virtual-tryon' ? 'dropdown-arrow-open' : ''}`}
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => openDropdown('magic-kit')}
              onMouseLeave={scheduleClose}
            >
              <button 
                className="nav-link tools-link"
              >
                Magic Kit
                <svg 
                  className={`dropdown-arrow ${activeDropdown === 'magic-kit' ? 'dropdown-arrow-open' : ''}`}
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
      
          </div>
          <button className="create-btn">Create</button>
        </nav>

        {/* 下拉菜单容器 */}
        <div className="dropdown-container">
          {/* Fashion Design 下拉菜单 */}
          {activeDropdown === 'fashion-design' && (
            <div 
              className={`tools-dropdown tools-dropdown-open fashion-design-dropdown ${isScrolled ? 'tools-dropdown-scrolled' : ''}`}
              onMouseEnter={() => openDropdown('fashion-design')}
              onMouseLeave={scheduleClose}
            >
              <div className="tools-dropdown-content">
                <div className="tools-category">
                  {/* <h3 className="category-title">Design Kit</h3> */}
                  <div className="category-items-container">
                    <div className="category-items">
                      <a href="https://create.creamoda.ai/" className="tool-item">text to image</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">copy style</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">mix 2 images</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">change clothes</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">fabric to design</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">sketch to design</a>
                    </div>
                    <div className="category-items">
                      <a href="https://create.creamoda.ai/" className="tool-item">change style</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">change fabric</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">change printing</a>
                      <a href="https://create.creamoda.ai/" className="tool-item">style fusion</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Virtual Try-on 下拉菜单 */}
          {activeDropdown === 'virtual-tryon' && (
            <div 
              className={`tools-dropdown tools-dropdown-open virtual-tryon-dropdown ${isScrolled ? 'tools-dropdown-scrolled' : ''}`}
              onMouseEnter={() => openDropdown('virtual-tryon')}
              onMouseLeave={scheduleClose}
            >
              <div className="tools-dropdown-content">
                <div className="tools-category">
                  {/* <h3 className="category-title">Virtual Tryon</h3> */}
                  <div className="category-items">
                    <a href="https://create.creamoda.ai/virtual-try-on" className="tool-item">virtual try-on</a>
                    <a href="https://create.creamoda.ai/virtual-try-on" className="tool-item">change pose</a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Magic Kit 下拉菜单 */}
          {activeDropdown === 'magic-kit' && (
            <div 
              className={`tools-dropdown tools-dropdown-open magic-kit-dropdown ${isScrolled ? 'tools-dropdown-scrolled' : ''}`}
              onMouseEnter={() => openDropdown('magic-kit')}
              onMouseLeave={scheduleClose}
            >
              <div className="tools-dropdown-content">
                <div className="tools-category">
                  {/* <h3 className="category-title">Magic Kit</h3> */}
                  <div className="category-items-container">
                    <div className="category-items">
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">change color</a>
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">change background</a>
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">remove background</a>
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">partial modification</a>
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">upscale</a>
                    </div>
                    <div className="category-items">
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">pattern extraction</a>
                      <a href="https://create.creamoda.ai/magic-kit" className="tool-item">pattern application</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 主要内容 - 使用子组件 */}
        <HeroMain />
        <FusionGuide />
        <WhyChoose />
        <OfferMore />
      </div>
    </section>
  );
}