import { Ionicons } from '@expo/vector-icons';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const OrderCompleteScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1d29" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check out</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* STEPS */}
      <View style={styles.steps}>
        <Ionicons name="location-outline" size={18} color="#8e8e93" />
        <View style={styles.dots} />
        <Ionicons name="card-outline" size={18} color="#8e8e93" />
        <View style={styles.dots} />
        <Ionicons name="checkmark-circle" size={18} color="#6c5ce7" />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.title}>Order Completed</Text>

        <View style={styles.iconWrapper}>
          <Ionicons name="bag-outline" size={70} color="#fff" />
          <View style={styles.checkBadge}>
            <Ionicons name="checkmark" size={18} color="#1a1d29" />
          </View>
        </View>

        <Text style={styles.message}>
          Thank you for your purchase.{'\n'}
          You can view your order in “My Orders” section.
        </Text>
      </View>

      {/* BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.buttonText}>Continue shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d29',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  /* STEPS */
  steps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  dots: {
    width: 40,
    height: 1,
    backgroundColor: '#3a3d4a',
    marginHorizontal: 8,
  },

  /* CONTENT */
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },

  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#3a3d4a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkBadge: {
    position: 'absolute',
    bottom: 20,
    right: 22,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    fontSize: 14,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22,
  },

  /* FOOTER */
  footer: {
    padding: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1d29',
  },
});
