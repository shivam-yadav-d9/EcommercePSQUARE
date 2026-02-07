import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const CheckoutScreen = ({ navigation }) => {
  const { totalAmount } = useSelector(state => state.cart);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('free');
  const [copyAddress, setCopyAddress] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    streetName: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    navigation.navigate('Payment');
  };

  const shippingOptions = [
    {
      id: 'free',
      title: 'Free',
      subtitle: 'Delivery to home',
      time: 'Delivery from 3 to 7 business days',
      price: 0,
    },
    {
      id: 'standard',
      title: '$9.90',
      subtitle: 'Delivery to home',
      time: 'Delivery from 4 to 6 business days',
      price: 9.90,
    },
    {
      id: 'fast',
      title: '$9.90',
      subtitle: 'Fast Delivery',
      time: 'Delivery from 2 to 3 business days',
      price: 9.90,
    },
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
          <View style={[styles.stepCircle, currentStep >= 1 && styles.stepCircleActive]}>
            <Ionicons name="location" size={16} color="#fff" />
          </View>
          <View style={[styles.stepLine, currentStep >= 2 && styles.stepLineActive]} />
        </View>
        
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep >= 2 && styles.stepCircleActive]}>
            <Ionicons name="card" size={16} color={currentStep >= 2 ? "#fff" : "#6e7191"} />
          </View>
          <View style={[styles.stepLine, currentStep >= 3 && styles.stepLineActive]} />
        </View>
        
        <View style={styles.stepItem}>
          <View style={[styles.stepCircle, currentStep >= 3 && styles.stepCircleActive]}>
            <Ionicons name="checkmark-circle" size={16} color={currentStep >= 3 ? "#fff" : "#6e7191"} />
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Step Title */}
          <Text style={styles.stepTitle}>STEP {currentStep}</Text>
          <Text style={styles.stepName}>Shipping</Text>

          {/* Form Fields */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>First name *</Text>
            <TextInput
              style={styles.input}
              placeholder="Pham"
              placeholderTextColor="#6e7191"
              value={formData.firstName}
              onChangeText={(value) => handleInputChange('firstName', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Last name *</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.lastName}
              onChangeText={(value) => handleInputChange('lastName', value)}
            />
            {formData.lastName === '' && (
              <Text style={styles.errorText}>Field is required</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Country *</Text>
            <View style={styles.selectContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#6e7191"
                value={formData.country}
                onChangeText={(value) => handleInputChange('country', value)}
              />
              <Ionicons name="chevron-down" size={20} color="#6e7191" style={styles.selectIcon} />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Street name *</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.streetName}
              onChangeText={(value) => handleInputChange('streetName', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>City *</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>State / Province</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.state}
              onChangeText={(value) => handleInputChange('state', value)}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Zip-code *</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.zipCode}
              onChangeText={(value) => handleInputChange('zipCode', value)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone number *</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#6e7191"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Shipping Method */}
          <Text style={styles.sectionTitle}>Shipping method</Text>
          
          {shippingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.shippingOption,
                selectedShipping === option.id && styles.shippingOptionActive,
              ]}
              onPress={() => setSelectedShipping(option.id)}
            >
              <View style={[
                styles.radioOuter,
                selectedShipping === option.id && styles.radioOuterActive,
              ]}>
                {selectedShipping === option.id && (
                  <View style={styles.radioInner} />
                )}
              </View>
              <View style={styles.shippingInfo}>
                <View style={styles.shippingHeader}>
                  <Text style={styles.shippingTitle}>{option.title}</Text>
                  <Text style={styles.shippingSubtitle}>{option.subtitle}</Text>
                </View>
                <Text style={styles.shippingTime}>{option.time}</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* Coupon Code */}
          <Text style={styles.sectionTitle}>Coupon Code</Text>
          <View style={styles.couponContainer}>
            <TextInput
              style={styles.couponInput}
              placeholder="Have a code? type it here..."
              placeholderTextColor="#6e7191"
              value={couponCode}
              onChangeText={setCouponCode}
            />
            <TouchableOpacity style={styles.validateButton}>
              <Text style={styles.validateText}>Validate</Text>
            </TouchableOpacity>
          </View>

          {/* Billing Address */}
          <Text style={styles.sectionTitle}>Billing Address</Text>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setCopyAddress(!copyAddress)}
          >
            <View style={styles.checkbox}>
              {copyAddress && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Copy address data from shipping</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue to payment</Text>
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
  stepCircleActive: {
    backgroundColor: '#84968a',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#2a2d3a',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#c6cec9',
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
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#3a3d4a',
  },
  errorText: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 4,
  },
  selectContainer: {
    position: 'relative',
  },
  selectIcon: {
    position: 'absolute',
    right: 0,
    top: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 8,
    marginBottom: 16,
  },
  shippingOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#2a2d3a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  shippingOptionActive: {
    backgroundColor: '#3a5a5a',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#6e7191',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioOuterActive: {
    borderColor: '#4ade80',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4ade80',
  },
  shippingInfo: {
    flex: 1,
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shippingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  shippingSubtitle: {
    fontSize: 16,
    color: '#fff',
  },
  shippingTime: {
    fontSize: 13,
    color: '#6e7191',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a5a5a',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
    paddingVertical: 14,
  },
  validateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  validateText: {
    fontSize: 14,
    color: '#4ade80',
    fontWeight: '600',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#6e7191',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
  },
  footer: {
    padding: 20,
    backgroundColor: '#1f2029',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6e7191',
  },
});

export default CheckoutScreen;