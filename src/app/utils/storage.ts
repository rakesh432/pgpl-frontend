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

const set = async (key: string, value: string) => {
  if (Capacitor.getPlatform() === 'web') {
    return localStorage.setItem(key, value);
  } else {
    try {
      return SecureStoragePlugin.set({ key, value });
    } catch (error) {}
  }
};

const del = async (key: string) => {
  if (Capacitor.getPlatform() === 'web') {
    return localStorage.removeItem(key);
  } else {
    try {
      return SecureStoragePlugin.remove({ key });
    } catch (error) {}
  }
};

export default { get, set, del };
