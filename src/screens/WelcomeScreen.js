import { Ionicons } from '@expo/vector-icons';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* CENTER LOGO */}
      <View style={styles.center}>
        <Image
          source={require('../../assets/images/welcome.png')}
          style={styles.logo}
        />
      </View>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottom}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={18} color="#6B6F76" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // 🔥 MATCH IMAGE BACKGROUND
    justifyContent: 'space-between',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 500,     // slightly larger for better match
    height: 500,
    resizeMode: 'contain',
  },

  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 70,
  },

  button: {
    backgroundColor: '#E6E6E6',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6F76',
  },
});
