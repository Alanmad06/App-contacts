import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  
  appId: 'com.contactosApp',
  appName: 'proyect-global',
  plugins: {
    GoogleAuth :{
      scopes : ["profile","email"],
      serverClientId : "703924612126-02kkbnpl6n6ar4ude8k86agqisjjebdh.apps.googleusercontent.com"
    }

  },
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
