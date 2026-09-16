import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UiState {
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  isMobileMenuOpen: boolean;
  isNotificationDrawerOpen: boolean;
  activeSearchDrawer: boolean;
  toasts: ToastMessage[];
}

const initialState: UiState = {
  isAuthModalOpen: false,
  authModalTab: 'login',
  isMobileMenuOpen: false,
  isNotificationDrawerOpen: false,
  activeSearchDrawer: false,
  toasts: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAuthModal: (state, action: PayloadAction<'login' | 'register' | undefined>) => {
      state.isAuthModalOpen = true;
      if (action.payload) {
        state.authModalTab = action.payload;
      }
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleNotificationDrawer: (state) => {
      state.isNotificationDrawerOpen = !state.isNotificationDrawerOpen;
    },
    closeNotificationDrawer: (state) => {
      state.isNotificationDrawerOpen = false;
    },
    toggleSearchDrawer: (state) => {
      state.activeSearchDrawer = !state.activeSearchDrawer;
    },
    showToast: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>) => {
      const id = Date.now().toString();
      state.toasts.push({ id, ...action.payload });
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  toggleMobileMenu,
  closeMobileMenu,
  toggleNotificationDrawer,
  closeNotificationDrawer,
  toggleSearchDrawer,
  showToast,
  dismissToast,
} = uiSlice.actions;

export default uiSlice.reducer;
