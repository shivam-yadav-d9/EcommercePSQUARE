import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchProducts } from '../redux/slices/productSlice';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, categories, loading } = useSelector(state => state.products);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId);

    // OPTIONAL: filter products by category
    if (categoryId) {
      dispatch(fetchProducts({ categoryId }));
    } else {
      dispatch(fetchProducts());
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const renderFeaturedProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }}
        style={styles.featuredImage}
        resizeMode="cover"
      />
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.featuredPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendedProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.recommendedCard}
      onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
    >
      <Image
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/100' }}
        style={styles.recommendedImage}
        resizeMode="cover"
      />
      <View style={styles.recommendedInfo}>
        <Text style={styles.recommendedTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.recommendedPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCollectionCard = ({ item, title, subtitle }) => (
    <TouchableOpacity style={styles.collectionCard}>
      <View style={styles.collectionTextContainer}>
        <Text style={styles.collectionSubtitle}>{subtitle}</Text>
        <Text style={styles.collectionTitle}>{title}</Text>
      </View>
      <Image
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }}
        style={styles.collectionImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

      {/* App Header */}
      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Stylinx</Text>
      </View>

      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleCategoryChange(2)}
        >
          <Ionicons
            name="laptop-outline"
            size={28}
            color={selectedCategoryId === 2 ? '#fff' : '#8e8e93'}
          />
          <Text
            style={[
              styles.navLabel,
              selectedCategoryId === 2 && styles.navLabelActive,
            ]}
          >
            Electronics
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleCategoryChange(1)}
        >
          <Ionicons
            name="shirt-outline"
            size={28}
            color={selectedCategoryId === 1 ? '#fff' : '#8e8e93'}
          />
          <Text
            style={[
              styles.navLabel,
              selectedCategoryId === 1 && styles.navLabelActive,
            ]}
          >
            Clothes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleCategoryChange(3)}
        >
          <Ionicons
            name="bed-outline"
            size={28}
            color={selectedCategoryId === 3 ? '#fff' : '#8e8e93'}
          />
          <Text
            style={[
              styles.navLabel,
              selectedCategoryId === 3 && styles.navLabelActive,
            ]}
          >
            Furniture
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navIcon}
          onPress={() => handleCategoryChange(4)}
        >
          <Ionicons
            name="walk-outline"
            size={28}
            color={selectedCategoryId === 4 ? '#fff' : '#8e8e93'}
          />
          <Text
            style={[
              styles.navLabel,
              selectedCategoryId === 4 && styles.navLabelActive,
            ]}
          >
            Shoes
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#6c5ce7"
          />
        }
      >
        {/* Hero Banner */}
        <TouchableOpacity style={styles.heroBanner}>
          <Image
            source={{ uri: items[0]?.images?.[0] || 'https://via.placeholder.com/400x200' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.heroGradient}
          >
            <Text style={styles.heroSubtitle}>Autumn</Text>
            <Text style={styles.heroTitle}>Collection</Text>
            <Text style={styles.heroYear}>2021</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Feature Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Show all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={items.slice(0, 6)}
            renderItem={renderFeaturedProduct}
            keyExtractor={(item) => `featured-${item.id}`}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* New Collection Banners */}
        <View style={styles.section}>
          <Text style={styles.collectionBadge}>NEW COLLECTION</Text>
          {items[1] && renderCollectionCard({
            item: items[1],
            title: 'HANG OUT\n& PARTY',
            subtitle: ''
          })}
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Show all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={items.slice(6, 12)}
            renderItem={renderRecommendedProduct}
            keyExtractor={(item) => `recommended-${item.id}`}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Top Collection */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Collection</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Show all</Text>
            </TouchableOpacity>
          </View>

          {/* Collection Cards */}
          <View style={styles.collectionGrid}>
            {items[2] && (
              <TouchableOpacity style={styles.largeCollectionCard}>
                <View style={styles.collectionTextContainer}>
                  <Text style={styles.collectionBadgeSmall}>Sale up to 40%</Text>
                  <Text style={styles.collectionTitleLarge}>FOR SLIM</Text>
                  <Text style={styles.collectionTitleLarge}>& BEAUTY</Text>
                </View>
                <Image
                  source={{ uri: items[2].images?.[0] }}
                  style={styles.largeCollectionImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

            {items[3] && (
              <TouchableOpacity style={styles.largeCollectionCard}>
                <View style={styles.collectionTextContainer}>
                  <Text style={styles.collectionBadgeSmall}>Summer Collection 2021</Text>
                  <Text style={styles.collectionTitleLarge}>Most sexy</Text>
                  <Text style={styles.collectionTitleLarge}>& fabulous</Text>
                  <Text style={styles.collectionTitleLarge}>design</Text>
                </View>
                <Image
                  source={{ uri: items[3].images?.[0] }}
                  style={styles.largeCollectionImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            )}

            {/* Small Grid Cards */}
            <View style={styles.smallCardsRow}>
              {items.slice(4, 6).map((item, index) => (
                <TouchableOpacity key={item.id} style={styles.smallCollectionCard}>
                  <Image
                    source={{ uri: item.images?.[0] }}
                    style={styles.smallCollectionImage}
                    resizeMode="cover"
                  />
                  <View style={styles.smallCollectionOverlay}>
                    <Text style={styles.smallCollectionCategory}>
                      {index === 0 ? 'T-Shirts' : 'Dresses'}
                    </Text>
                    <Text style={styles.smallCollectionTitle}>
                      {index === 0 ? 'The\nOffice\nLife' : 'Elegant\nDesign'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appHeader: {
    backgroundColor: '#2c3e50',
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#34495e',
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#34495e',
  },
  navIcon: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 10,
    color: '#8e8e93',
    marginTop: 4,
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#fff',
  },

  heroBanner: {
    margin: 16,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    justifyContent: 'flex-end',
    padding: 20,
  },
  heroSubtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  heroYear: {
    fontSize: 18,
    color: '#fff',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  featuredCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#34495e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredImage: {
    width: 120,
    height: 140,
  },
  featuredInfo: {
    padding: 8,
  },
  featuredTitle: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  collectionBadge: {
    fontSize: 11,
    color: '#8e8e93',
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  collectionCard: {
    marginHorizontal: 16,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#34495e',
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 16,
  },
  collectionTextContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  collectionSubtitle: {
    fontSize: 11,
    color: '#8e8e93',
    marginBottom: 4,
  },
  collectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 26,
  },
  collectionImage: {
    width: 140,
    height: '100%',
  },
  recommendedCard: {
    width: 150,
    marginRight: 12,
    backgroundColor: '#34495e',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recommendedImage: {
    width: 150,
    height: 100,
  },
  recommendedInfo: {
    padding: 10,
  },
  recommendedTitle: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
    height: 32,
  },
  recommendedPrice: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  collectionGrid: {
    paddingHorizontal: 16,
  },
  largeCollectionCard: {
    height: 200,
    borderRadius: 12,
    backgroundColor: '#34495e',
    flexDirection: 'row',
    marginBottom: 12,
    overflow: 'hidden',
  },
  collectionBadgeSmall: {
    fontSize: 10,
    color: '#8e8e93',
    marginBottom: 8,
  },
  collectionTitleLarge: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 28,
  },
  largeCollectionImage: {
    width: 120,
    height: '100%',
  },
  smallCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  smallCollectionCard: {
    flex: 1,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
  },
  smallCollectionImage: {
    width: '100%',
    height: '100%',
  },
  smallCollectionOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
  },
  smallCollectionCategory: {
    fontSize: 10,
    color: '#8e8e93',
    marginBottom: 4,
  },
  smallCollectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 18,
  },
});

export default HomeScreen;