import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { fetchProductById, fetchProducts } from '../redux/slices/productSlice';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const { selectedProduct, items, loading } = useSelector(state => state.products);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);

  useEffect(() => {
    dispatch(fetchProductById(productId));
    // Fetch similar products if not already loaded
    if (!items || items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      navigation.navigate('Cart');
    }
  };

  if (loading || !selectedProduct) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  const colors = ['#ffb6c1', '#87ceeb', '#f0e68c'];
  const sizes = ['S', 'M', 'L', 'XL'];

  // Get similar products from the same category
  const similarProducts = items
    ? items
        .filter(item => 
          item.id !== selectedProduct.id && 
          item.category?.id === selectedProduct.category?.id
        )
        .slice(0, 5)
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1d29" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: selectedProduct.images?.[selectedImage] || 'https://via.placeholder.com/400',
            }}
            style={styles.mainImage}
            resizeMode="cover"
          />
          <View style={styles.imageIndicators}>
            {selectedProduct.images?.slice(0, 3).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  selectedImage === index && styles.indicatorActive,
                ]}
                onPress={() => setSelectedImage(index)}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.productTitle}>{selectedProduct.title}</Text>
              <Text style={styles.category}>{selectedProduct.category?.name}</Text>
            </View>
            <Text style={styles.price}>${selectedProduct.price}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= 4 ? 'star' : 'star-outline'}
                  size={16}
                  color="#ffd700"
                />
              ))}
            </View>
            <Text style={styles.ratingText}>4.9 stars</Text>
            <Text style={styles.reviewCount}>(99 reviews)</Text>
          </View>

          {/* Size Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Color</Text>
            <View style={styles.colorContainer}>
              {colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorButton,
                    selectedColor === index && styles.colorButtonActive,
                  ]}
                  onPress={() => setSelectedColor(index)}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: color }]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.sectionHeader}
              onPress={() => setIsDescriptionOpen(!isDescriptionOpen)}
            >
              <Text style={styles.sectionTitle}>Description</Text>
              <Ionicons 
                name={isDescriptionOpen ? "chevron-down" : "chevron-up"} 
                size={20} 
                color="#fff" 
              />
            </TouchableOpacity>
            {isDescriptionOpen && (
              <Text style={styles.description}>{selectedProduct.description}</Text>
            )}
          </View>

          {/* REVIEWS SECTION */}
          <View style={styles.reviewSection}>
            <TouchableOpacity 
              style={styles.reviewHeader}
              onPress={() => setIsReviewsOpen(!isReviewsOpen)}
            >
              <Text style={styles.sectionTitle}>Reviews</Text>
              <Ionicons 
                name={isReviewsOpen ? "chevron-down" : "chevron-up"} 
                size={20} 
                color="#fff" 
              />
            </TouchableOpacity>

            {isReviewsOpen && (
              <>
                <View style={styles.ratingSummary}>
                  <Text style={styles.ratingBig}>4.9</Text>
                  <Text style={styles.ratingOut}>out of 5</Text>
                </View>

                {[5, 4, 3, 2, 1].map((star, index) => (
                  <View key={star} style={styles.ratingRow}>
                    <Text style={styles.starLabel}>{star}</Text>
                    <View style={styles.ratingBarBg}>
                      <View
                        style={[
                          styles.ratingBarFill,
                          { width: `${[60, 12, 5, 3, 0][index]}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.ratingPercent}>
                      {[60, 12, 5, 3, 0][index]}%
                    </Text>
                  </View>
                ))}

                <Text style={styles.reviewUser}>Jennifer Rose</Text>
                <Text style={styles.reviewText}>
                  I love it. Awesome customer service! Thanks again.
                </Text>
              </>
            )}
          </View>

          {/* SIMILAR PRODUCTS */}
          {similarProducts.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { marginBottom: 12 }]}>Similar Product</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {similarProducts.map(item => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.similarCard}
                    onPress={() => {
                      setSelectedImage(0);
                      dispatch(fetchProductById(item.id));
                    }}
                  >
                    <Image 
                      source={{ uri: item.images?.[0] || 'https://via.placeholder.com/140' }} 
                      style={styles.similarImage} 
                    />
                    <Text style={styles.similarTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.similarPrice}>${item.price}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={24} color="#1a1d29" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1d29',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(42, 45, 58, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(42, 45, 58, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: 400,
    backgroundColor: '#2a2d3a',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3a3d4a',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#6c5ce7',
    width: 24,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  reviewSection: {
    marginTop: 24,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  ratingBig: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
  },
  ratingOut: {
    marginLeft: 8,
    color: '#8e8e93',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  starLabel: {
    width: 20,
    color: '#8e8e93',
  },
  ratingBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#2a2d3a',
    borderRadius: 3,
    marginHorizontal: 8,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: '#6c5ce7',
    borderRadius: 3,
  },
  ratingPercent: {
    width: 40,
    color: '#8e8e93',
    textAlign: 'right',
  },
  reviewUser: {
    marginTop: 12,
    color: '#fff',
    fontWeight: '600',
  },
  reviewText: {
    color: '#8e8e93',
    marginTop: 4,
    lineHeight: 20,
  },
  similarCard: {
    width: 140,
    marginRight: 12,
  },
  similarImage: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    backgroundColor: '#2a2d3a',
  },
  similarTitle: {
    marginTop: 6,
    color: '#fff',
    fontSize: 13,
  },
  similarPrice: {
    color: '#6c5ce7',
    marginTop: 2,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    color: '#8e8e93',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c5ce7',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#fff',
    marginRight: 8,
  },
  reviewCount: {
    fontSize: 14,
    color: '#8e8e93',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    color: '#6c5ce7',
    fontSize: 14,
    fontWeight: '600',
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2d3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sizeButtonActive: {
    borderColor: '#6c5ce7',
  },
  sizeText: {
    fontSize: 16,
    color: '#8e8e93',
    fontWeight: '600',
  },
  sizeTextActive: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2d3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#6c5ce7',
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  description: {
    fontSize: 14,
    color: '#8e8e93',
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#1a1d29',
    borderTopWidth: 1,
    borderTopColor: '#2a2d3a',
  },
  addToCartButton: {
    backgroundColor: '#d4e5d4',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1d29',
  },
});

export default ProductDetailScreen;