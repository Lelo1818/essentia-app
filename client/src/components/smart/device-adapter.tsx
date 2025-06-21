import { ReactNode } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface DeviceAdapterProps {
  mobile?: ReactNode;
  desktop?: ReactNode;
  tablet?: ReactNode;
  children?: ReactNode;
}

export function DeviceAdapter({ mobile, desktop, tablet, children }: DeviceAdapterProps) {
  const { isMobile, isTablet, isDesktop } = useDeviceDetection();

  if (isMobile && mobile) return <>{mobile}</>;
  if (isTablet && tablet) return <>{tablet}</>;
  if (isDesktop && desktop) return <>{desktop}</>;
  
  return <>{children}</>;
}

export function MobileOnly({ children }: { children: ReactNode }) {
  const { isMobile } = useDeviceDetection();
  return isMobile ? <>{children}</> : null;
}

export function DesktopOnly({ children }: { children: ReactNode }) {
  const { isDesktop } = useDeviceDetection();
  return isDesktop ? <>{children}</> : null;
}

export function TabletOnly({ children }: { children: ReactNode }) {
  const { isTablet } = useDeviceDetection();
  return isTablet ? <>{children}</> : null;
}