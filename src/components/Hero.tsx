'use client';

import Image from 'next/image';
import { useState } from 'react';
import HeroMain from './HeroMain';
import FusionGuide from './FusionGuide';
import WhyChoose from './WhyChoose';
import OfferMore from './OfferMore';

export default function Hero() {
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsToolsDropdownOpen(false);
  };

  return (
    <section className="hero-container">
      {/* 背景 */}
      <div className="hero-background"></div>
      
      {/* 内容 */}
      <div className="hero-content">
        {/* 导航栏 */}
        <nav className="hero-nav">
          <div className="hero-logo">
            <Image
              src="/images/logo.png"
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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button 
                className="nav-link tools-link"
              >
                Fashion Design
                <svg 
                  className={`dropdown-arrow ${isToolsDropdownOpen ? 'dropdown-arrow-open' : ''}`}
                  width="12" 
                  height="8" 
                  viewBox="0 0 12 8" 
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <a href="#" className="nav-link">Virtual Try-on</a>
            <a href="#" className="nav-link">Design Kit</a>
            <a href="#" className="nav-link">Pricing</a>
            <a href="#" className="nav-link">Use Cases</a>
            <a href="#" className="nav-link">Start/Create</a>
          </div>
          <button className="create-btn">Create</button>
        </nav>

        {/* 下拉菜单内容 - 独立元素 */}
        <div 
          className={`tools-dropdown ${isToolsDropdownOpen ? 'tools-dropdown-open' : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="tools-dropdown-content">
            <div className="tools-category">
              <h3 className="category-title">Design Kit</h3>
              <div className="category-items-container">
                <div className="category-items">
                  <a href="#" className="tool-item">text to image</a>
                  <a href="#" className="tool-item">copy style</a>
                  <a href="#" className="tool-item">mix 2 images</a>
                  <a href="#" className="tool-item">change clothes</a>
                  <a href="#" className="tool-item">fabric to design</a>
                  <a href="#" className="tool-item">sketch to design</a>
                </div>
                <div className="category-items">
                  <a href="#" className="tool-item">change style</a>
                  <a href="#" className="tool-item">change fabric</a>
                  <a href="#" className="tool-item">change printing</a>
                  <a href="#" className="tool-item">style fusion</a>
                </div>
              </div>
            </div>
            
            <div className="tools-category">
              <h3 className="category-title">Virtual Tryon</h3>
              <div className="category-items">
                <a href="#" className="tool-item">virtual try-on</a>
                <a href="#" className="tool-item">change pose</a>
              </div>
            </div>
            
            <div className="tools-category">
              <h3 className="category-title">Magic Kit</h3>
              <div className="category-items-container">
                <div className="category-items">
                  <a href="#" className="tool-item">change color</a>
                  <a href="#" className="tool-item">change background</a>
                  <a href="#" className="tool-item">remove background</a>
                  <a href="#" className="tool-item">partial modification</a>
                  <a href="#" className="tool-item">upscale</a>
                </div>
                <div className="category-items">
                  <a href="#" className="tool-item">pattern extraction</a>
                  <a href="#" className="tool-item">pattern application</a>
                </div>
              </div>
            </div>
            

          </div>
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