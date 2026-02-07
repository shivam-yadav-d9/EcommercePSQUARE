import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { supabase } from './src/config/supabase';
import AppNavigator from './src/navigation/AppNavigator';
import { setSession, setUser } from './src/redux/slices/authSlice';
import { store } from './src/redux/store';

export default function App() {
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        store.dispatch(setSession(session));
        store.dispatch(setUser(session.user));
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        store.dispatch(setSession(session));
        store.dispatch(setUser(session.user));
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}