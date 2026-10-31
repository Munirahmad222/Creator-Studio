import type { SupportedLocale } from './branding';

export type Direction = 'ltr' | 'rtl';

const dictionaries = {
  en: { overview: 'Overview', creatorStudio: 'Creator Studio', videoEditor: 'Video Editor', autoDm: 'Auto-DM', marketplace: 'Brand Marketplace', analytics: 'Analytics', settings: 'Settings', demoMode: 'Demo mode' },
  ur: { overview: 'جائزہ', creatorStudio: 'کریئیٹر اسٹوڈیو', videoEditor: 'ویڈیو ایڈیٹر', autoDm: 'آٹو ڈی ایم', marketplace: 'برانڈ مارکیٹ پلیس', analytics: 'تجزیات', settings: 'ترتیبات', demoMode: 'ڈیمو موڈ' },
  ar: { overview: 'نظرة عامة', creatorStudio: 'استوديو المبدعين', videoEditor: 'محرر الفيديو', autoDm: 'الرسائل التلقائية', marketplace: 'سوق العلامات التجارية', analytics: 'التحليلات', settings: 'الإعدادات', demoMode: 'الوضع التجريبي' },
} satisfies Record<SupportedLocale, Record<string, string>>;

export function directionFor(locale: SupportedLocale): Direction {
  return locale === 'ur' || locale === 'ar' ? 'rtl' : 'ltr';
}

export function translate(locale: SupportedLocale, key: keyof typeof dictionaries.en): string {
  return dictionaries[locale][key] ?? dictionaries.en[key];
}

export function isSupportedLocale(value: string): value is SupportedLocale {
  return value === 'en' || value === 'ur' || value === 'ar';
}
