import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tps_mtg.ipos_tpsmtg',
  appName: 'pos_android_app',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;