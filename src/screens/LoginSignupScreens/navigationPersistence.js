import AsyncStorage from '@react-native-async-storage/async-storage';

const NAVIGATION_STATE_KEY = 'NAVIGATION_STATE';

// Save the navigation state
export const saveNavigationState = async (state) => {
  try {
    await AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save navigation state:', error);
  }
};

// Restore the navigation state
export const loadNavigationState = async () => {
  try {
    const savedState = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error('Failed to load navigation state:', error);
    return null;
  }
};

// Clear the navigation state (optional)
export const clearNavigationState = async () => {
  try {
    await AsyncStorage.removeItem(NAVIGATION_STATE_KEY);
  } catch (error) {
    console.error('Failed to clear navigation state:', error);
  }
};