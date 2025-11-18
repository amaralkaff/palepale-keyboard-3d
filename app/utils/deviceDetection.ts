/**
 * Device detection utilities for mobile optimization
 */

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768;
}

export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check for low-end devices
  const isLowEnd =
    // @ts-ignore - deviceMemory is experimental
    (navigator.deviceMemory && navigator.deviceMemory < 4) ||
    // @ts-ignore - hardwareConcurrency as proxy for CPU power
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4);

  return isLowEnd;
}

export function getOptimalPixelRatio(): number {
  if (typeof window === 'undefined') return 1;

  const dpr = window.devicePixelRatio || 1;
  const isMobile = isMobileDevice();
  const isLowPower = isLowPowerDevice();

  // Limit pixel ratio on mobile/low-power devices for performance
  if (isMobile || isLowPower) {
    return Math.min(dpr, 1.5);
  }

  return Math.min(dpr, 2);
}
