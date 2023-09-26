import { Capacitor } from '@capacitor/core';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

const get = async (key: string) => {
  if (Capacitor.getPlatform() === 'web') {
    const value = localStorage.getItem(key);
    return value;
  } else {
    try {
      const { value } = await SecureStoragePlugin.get({ key });
      return value;
    } catch (error) {
      return null;
    }
  }
};

export default { get };
