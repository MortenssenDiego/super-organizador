import { isPlatform } from "@ionic/react";

export const domain = "dev-za6-76vz.us.auth0.com";
export const clientId = "NjSeqzdpa2UpKIdNYGXAMj26j15dhnL8";
const appId = "com.superorganizador.app";

// Use `auth0Domain` in string interpolation below so that it doesn't
// get replaced by the quickstart auto-packager
const auth0Domain = domain;
const iosOrAndroid = isPlatform('ios') || isPlatform('android');

export const callbackUri = iosOrAndroid
  ? `${appId}://${auth0Domain}/capacitor/${appId}/callback`
  : 'http://localhost:3000';