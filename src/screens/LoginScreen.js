import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { supabase } from '../config/supabase';
import { setError, setLoading, setSession, setUser } from '../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLocalLoading(true);
      dispatch(setLoading(true));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      dispatch(setUser(data.user));
      dispatch(setSession(data.session));
      dispatch(setError(null));
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      dispatch(setError(error.message));
    } finally {
      setLocalLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* HEADER (LOWER FROM TOP) */}
      <View style={styles.header}>
        <Text style={styles.title}>Log into</Text>
        <Text style={styles.title}>your account</Text>
      </View>

      {/* FORM (MIDDLE) */}
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>SIGN IN</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* FOOTER (BOTTOM FIXED) */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingHorizontal: 24,
  },

  /* HEADER LOWERED */
  header: {
    marginTop: 120,   // ⬅️ THIS is the key
    marginBottom: 60,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 40,
  },

  /* FORM IN MIDDLE */
  form: {
    flex: 1,
  },

  field: {
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    color: '#9A9A9A',
    marginBottom: 8,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
    paddingVertical: 10,
    fontSize: 16,
    color: '#FFFFFF',
  },

  button: {
    marginTop: 36,
    backgroundColor: '#E5E5E5',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B6F76',
    letterSpacing: 1,
  },

  /* FOOTER STUCK TO BOTTOM */
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 68, // ⬅️ pushes it down
  },

  footerText: {
    color: '#8A8A8A',
    fontSize: 14,
  },

  footerLink: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
