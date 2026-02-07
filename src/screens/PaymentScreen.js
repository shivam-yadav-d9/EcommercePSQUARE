import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';

const PaymentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { totalAmount } = useSelector(state => state.cart);
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    navigation.navigate('OrderComplete');
  };

  const paymentMethods = [
    { id: 'cash', icon: 'cash', title: 'Cash', bgColor: '#3a5a5a' },
    { id: 'credit', icon: 'card', title: 'Credit Card', bgColor: '#e8e8e8' },
    { id: 'other', icon: 'ellipsis-horizontal', title: '...', bgColor: '#3a5a5a' },
  ];

  const paymentProviders = [
    { id: 'paypal', icon: 'logo-paypal', color: '#0070ba' },
    { id: 'visa', name: 'VISA', color: '#1a1f71' },
    { id: 'mastercard', icon: 'ellipse', color: '#eb001b' },
    { id: 'alipay', name: 'Alipay', color: '#1677ff' },
    { id: 'amex', name: 'AMEX', color: '#006fcf' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1f2029" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Check out</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
            <Ionicons name="location" size={16} color="#fff" />
          </View>
          <View style={[styles.stepLine, styles.stepLineActive]} />
        </View>
        
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, styles.stepCircleActive]}>
            <Ionicons name="card" size={16} color="#fff" />
          </View>
          <View style={styles.stepLine} />
        </View>
        
        <View style={styles.stepItem}>
          <View style={styles.stepCircle}>
            <Ionicons name="checkmark-circle" size={16} color="#6e7191" />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Step Title */}
          <Text style={styles.stepTitle}>STEP 2</Text>
          <Text style={styles.stepName}>Payment</Text>

          {/* Payment Method Cards */}
          <View style={styles.paymentMethodsContainer}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethodCard,
                  { backgroundColor: method.bgColor },
                  selectedMethod === method.id && styles.paymentMethodCardActive,
                ]}
                onPress={() => setSelectedMethod(method.id)}
              >
                <View style={styles.methodIconContainer}>
                  <Ionicons 
                    name={method.icon} 
                    size={28} 
                    color={method.id === 'credit' ? "#333" : "#fff"} 
                  />
                </View>
                <Text style={[
                  styles.methodTitle,
                  method.id === 'credit' && { color: '#333' }
                ]}>
                  {method.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Choose Your Card Section */}
          <View style={styles.cardSection}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardSectionTitle}>Choose your card</Text>
              <TouchableOpacity>
                <Text style={styles.addNewText}>Add new+</Text>
              </TouchableOpacity>
            </View>

            {/* Payment Provider Icons */}
            <Text style={styles.checkoutWithText}>or check out with</Text>
            <View style={styles.providersContainer}>
              {paymentProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  style={[styles.providerCard, { borderColor: provider.color }]}
                >
                  {provider.icon ? (
                    <Ionicons name={provider.icon} size={24} color={provider.color} />
                  ) : (
                    <Text style={[styles.providerText, { color: provider.color }]}>
                      {provider.name}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.summarySection}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Product price</Text>
              <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>Freeship</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>${totalAmount.toFixed(2)}</Text>
            </View>

            {/* Terms and Conditions */}
            <TouchableOpacity
              style={styles.termsContainer}
              onPress={() => setAgreeTerms(!agreeTerms)}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
                {agreeTerms && (
                  <Ionicons name="checkmark" size={14} color="#fff" />
                )}
              </View>
              <Text style={styles.termsText}>
                I agree to{' '}
                <Text style={styles.termsLink}>Terms and conditions</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.placeOrderButton} 
          onPress={handlePlaceOrder}
          disabled={!agreeTerms}
        >
          <Text style={styles.placeOrderButtonText}>Place my order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f2029',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2a2d3a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: '#9caca2',
  },
  stepCircleActive: {
    backgroundColor: '#9caca2',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#2a2d3a',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 11,
    color: '#6e7191',
    letterSpacing: 1,
    marginBottom: 4,
  },
  stepName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  paymentMethodsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  paymentMethodCard: {
    flex: 1,
    aspectRatio: 1.2,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodCardActive: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  methodIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  methodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
  },
  cardSection: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  addNewText: {
    fontSize: 14,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  checkoutWithText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
  },
  providersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  providerCard: {
    width: 60,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2a2d3a',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  providerText: {
    fontSize: 11,
    fontWeight: '700',
  },
  summarySection: {
    marginTop: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '400',
  },
  summaryValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2d3a',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6e7191',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#4ade80',
    borderColor: '#4ade80',
  },
  termsText: {
    fontSize: 13,
    color: '#fff',
  },
  termsLink: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
  footer: {
    padding: 20,
    backgroundColor: '#1f2029',
  },
  placeOrderButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6e7191',
  },
});

export default PaymentScreen;