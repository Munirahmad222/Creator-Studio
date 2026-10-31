import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.creatorplatform.app',
  appName: 'Creator Platform',
  webDir: '../web/dist',
  bundledWebRuntime: false,
  backgroundColor: '#F8F7FC',
  ios: { contentInset: 'automatic' },
  android: { allowMixedContent: false },
};

export default config;
