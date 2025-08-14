export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void;

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void;

export function random(min: number, max?: number): number;

export function clamp(value: number, min: number, max: number): number;

export function lerp(start: number, end: number, factor: number): number;

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function rectCollision(rect1: Rectangle, rect2: Rectangle): boolean;

export function distance(x1: number, y1: number, x2: number, y2: number): number;

export function formatTime(seconds: number): string;

export function isTouchDevice(): boolean;

export function isMobileDevice(): boolean;

export function preloadImage(src: string): Promise<HTMLImageElement>;

export function preloadAudio(src: string): Promise<HTMLAudioElement>;

export interface EventEmitter {
  on(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

export function createEventEmitter(): EventEmitter;

export function deepClone<T>(obj: T): T;
