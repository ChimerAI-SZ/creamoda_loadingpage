'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

export default function OfferMore() {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (cardsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = cardsContainerRef.current;
      
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = cardsContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (cardsContainerRef.current && canScrollLeft) {
      cardsContainerRef.current.scrollBy({
        left: -350, // 滚动一个卡片的宽度
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (cardsContainerRef.current && canScrollRight) {
      cardsContainerRef.current.scrollBy({
        left: 350, // 滚动一个卡片的宽度
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="offer-more-section">
      <div className="offer-more-header">
        <h2 className="offer-more-title">We Offer More</h2>
        <div className="offer-more-navigation">
          <button className={`nav-arrow nav-arrow-left ${!canScrollLeft ? 'nav-arrow-disabled' : ''}`} onClick={scrollLeft}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M8 2L2 9L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`nav-arrow nav-arrow-right ${!canScrollRight ? 'nav-arrow-disabled' : ''}`} onClick={scrollRight}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M2 2L8 9L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="offer-more-cards" ref={cardsContainerRef}>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/remove_bg.png"
              alt="Image Background Remover"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">Image Background Remover</h3>
            <p className="offer-card-desc">Instantly cut out subjects and get a clean, transparent PNG in seconds.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/change_bg.png"
              alt="Image Background Changer"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">Image Background Changer</h3>
            <p className="offer-card-desc">Replace any background with custom colors, images, or scenes.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/upscale.png"
              alt="Image Enhancer"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">Image Enhancer</h3>
            <p className="offer-card-desc">Boost image resolution up to 2× without losing sharpness or detail.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/partial_mod.png"
              alt="AI Image Changer"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">AI Image Changer</h3>
            <p className="offer-card-desc">Edit or replace only the areas you select, keeping the rest untouched.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/change_color.png"
              alt="Image Color Changer"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">Image Color Changer</h3>
            <p className="offer-card-desc">Instantly swap product or object colors with realistic results.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/virtual_try.png"
              alt="AI Virtual Try-On"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">AI Virtual Try-On</h3>
            <p className="offer-card-desc">Generate lifelike model images wearing your products, cutting shoot costs and boosting sales.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/design.png"
              alt="AI Outfit Generator"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">AI Outfit Generator</h3>
            <p className="offer-card-desc">Generate and customize fashion outfits — swap fabrics, tweak styles, redesign patterns, all in one tool.</p>
          </div>
        </div>
        <div className="offer-card">
          <div className="offer-card-image">
            <Image
              src="/images/card/sketch_design.png"
              alt="AI Sketch to Image Converter"
              width={280}
              height={201}
              className="card-img"
            />
          </div>
          <div className="offer-card-content">
            <h3 className="offer-card-title">AI Sketch to Image Converter</h3>
            <p className="offer-card-desc">Turn garment sketches into realistic images for prototyping and presentations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
