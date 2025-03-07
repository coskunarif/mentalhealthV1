import React from 'react';
import { View, PanResponder, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import typographyStyles from '../config/typography.styles';
import localStyles from '../config/MoodSelector.styles';
import Animated, { FadeIn } from 'react-native-reanimated';

export type SliderCardProps = {
  mood: { label: string; icon: any; key: keyof typeof theme.moodColors; value: number };
  sliderColor: string;
  onSlidingComplete: (value: number, label?: string) => void;
  isRelated?: boolean;
};

// Add this type at the top of your file with other imports
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const SliderCard: React.FC<SliderCardProps> = ({
  mood,
  sliderColor,
  onSlidingComplete,
  isRelated = false,
}) => {
  // Determine state color based on Material Design state layering
  const stateColor = theme.moodColors[mood.key];
  
  // Emoji icons based on value - sıralamayı değiştirdik (pozitiften negatife)
  const getEmoji = (position: number): MaterialCommunityIconName => {
    const icons: MaterialCommunityIconName[] = [
      'emoticon-excited-outline',  // 0 - Çok pozitif
      'emoticon-happy-outline',    // 25 - Pozitif
      'emoticon-neutral-outline',  // 50 - Nötr
      'emoticon-frown-outline',    // 75 - Negatif
      'emoticon-sad-outline',      // 100 - Çok negatif
    ];
    
    return icons[position];
  };

  // PanResponder to prevent screen navigation when sliding
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only capture horizontal movements
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {
      // Prevent parent scroll view from scrolling
    },
    onPanResponderMove: () => {
      // Handle slider movement
    },
    onPanResponderRelease: () => {
      // Release the gesture
    },
  });

  return (
    <Card
      style={{
        marginBottom: 8,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.colors.background,
        borderWidth: 0,
        // Shadow ekleyelim
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
      }}
      accessibilityLabel={`Intensity slider for ${mood.label}`}
    >
      <Animated.View entering={FadeIn.duration(300)}>
        <Card.Content style={{ padding: 16 }}>
          <View style={[{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 16 
          }]}>
            <MaterialCommunityIcons 
              name={mood.icon} 
              size={24} 
              color={stateColor} 
            />
            
            <Text style={[
              typographyStyles.text_body, 
              { 
                marginLeft: 12,
                color: theme.colors.onSurface,
                fontWeight: '500', // Medium weight per Material Design
                flex: 1,
              }
            ]}>
              {mood.label}
            </Text>
          </View>
          
          <View 
            style={{ paddingHorizontal: 8 }}
            {...panResponder.panHandlers} // Slider hareketlerini yakala
          >
            <Slider
              value={mood.value}
              minimumValue={0}
              maximumValue={100}
              step={1}
              thumbTintColor={stateColor}
              minimumTrackTintColor={stateColor}
              maximumTrackTintColor={theme.withOpacity(theme.colors.onSurfaceVariant, 0.2)}
              onSlidingComplete={(val) => onSlidingComplete(val, mood.label)}
              style={{ height: 40 }}
              // Slider'ı daha kolay yakalanabilir yap
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
            
            {/* Emoji indicators instead of numbers */}
            <View style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 4,
                marginTop: 8,
              }
            ]}>
              {[0, 1, 2, 3, 4].map(position => {
                // Emoji'nin aktif olup olmadığını belirle
                const isActive = position * 25 <= mood.value;
                // Aktif emoji'ler için mood rengini, pasif olanlar için soluk gri kullan
                const emojiColor = isActive 
                  ? stateColor 
                  : theme.withOpacity(theme.colors.onSurfaceVariant, 0.5);
                  
                return (
                  <TouchableOpacity 
                    key={position}
                    onPress={() => onSlidingComplete(position * 25)}
                    style={{ padding: 8 }}
                    activeOpacity={0.7}
                  >
                    <MaterialCommunityIcons
                      name={getEmoji(position)}
                      size={20}
                      color={emojiColor}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            
            {/* Simple Low/High labels */}
            <View style={[
              { 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                marginTop: 4 
              }
            ]}>
              <Text style={[
                { 
                  fontSize: 12,
                  color: theme.colors.onSurfaceVariant,
                }
              ]}>
                {mood.key === 'anger' ? 'Calm' : 'Low'}
              </Text>
              <Text style={[
                { 
                  fontSize: 12,
                  color: theme.colors.onSurfaceVariant,
                }
              ]}>
                {mood.key === 'anger' ? 'Intense' : 'High'}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Animated.View>
    </Card>
  );
};

export default SliderCard;
