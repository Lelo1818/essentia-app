import { useState, useEffect } from 'react';

export function useDeviceDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const width = window.innerWidth;
      
      // Mobile detection
      const mobileKeywords = ['mobile', 'android', 'iphone', 'ipod', 'blackberry', 'windows phone'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      const isMobileWidth = width < 768;
      
      // Tablet detection
      const tabletKeywords = ['ipad', 'tablet'];
      const isTabletUA = tabletKeywords.some(keyword => userAgent.includes(keyword));
      const isTabletWidth = width >= 768 && width < 1024;
      
      setIsMobile(isMobileUA || (isMobileWidth && !isTabletUA));
      setIsTablet(isTabletUA || (isTabletWidth && !isMobileUA));
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet
  };
}