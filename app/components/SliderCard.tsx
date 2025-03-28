import React from 'react';
import { View, PanResponder, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '../hooks/useAppTheme'; // Import hook
import typographyStyles from '../config/typography.styles';
import Animated, { FadeIn } from 'react-native-reanimated';
import type { AppTheme } from '../types/theme';
import { lightTheme } from '../config/theme'; // Import lightTheme for type derivation

type BaseSliderProps = {
  icon: string;
  label: string;
  value: number;
  onSlidingComplete: (value: number) => void;
  color?: string;
};

type EmotionSliderProps = BaseSliderProps & {
  variant: 'emotion';
  moodKey: keyof typeof lightTheme.moodColors; // Use lightTheme here for type
};

type DurationSliderProps = BaseSliderProps & {
  variant: 'duration';
  labels: string[];
  steps?: number;
};

type SliderCardProps = EmotionSliderProps | DurationSliderProps;

// Add this type at the top of your file with other imports
type MaterialCommunityIconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const SliderCard: React.FC<SliderCardProps> = (props) => {
  const theme = useAppTheme(); // Use hook
  // Determine state color based on Material Design state layering
  const sliderColor = props.variant === 'emotion' 
    ? theme.moodColors[props.moodKey] // Revert: Expect specific MoodKey type
    : theme.colors.primary;
  
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
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderGrant: () => {},
    onPanResponderMove: () => {},
    onPanResponderRelease: () => {},
  });

  const renderEmotionSlider = () => (
    <>
      <Slider
        value={props.value}
        minimumValue={0}
        maximumValue={100}
        step={1}
        thumbTintColor={sliderColor}
        minimumTrackTintColor={sliderColor}
        maximumTrackTintColor={theme.withOpacity(theme.colors.onSurfaceVariant, 0.2)}
        onSlidingComplete={props.onSlidingComplete}
        style={{ height: 40 }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      />
      
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginTop: 8,
      }}>
        {[0, 1, 2, 3, 4].map(position => {
          const isActive = position * 25 <= props.value;
          const emojiColor = isActive 
            ? sliderColor 
            : theme.withOpacity(theme.colors.onSurfaceVariant, 0.5);
            
          return (
            <TouchableOpacity 
              key={position}
              onPress={() => props.onSlidingComplete(position * 25)}
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
      
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 4 
      }}>
        <Text style={{ 
          fontSize: 12,
          color: theme.colors.onSurfaceVariant,
        }}>
          Low
        </Text>
        <Text style={{ 
          fontSize: 12,
          color: theme.colors.onSurfaceVariant,
        }}>
          High
        </Text>
      </View>
    </>
  );

  const renderDurationSlider = () => {
    const durationProps = props as DurationSliderProps;
    return (
      <>
        <Slider
          value={props.value}
          minimumValue={0}
          maximumValue={100}
          step={durationProps.steps || 33}
          thumbTintColor={sliderColor}
          minimumTrackTintColor={sliderColor}
          maximumTrackTintColor={theme.withOpacity(theme.colors.onSurfaceVariant, 0.2)}
          onSlidingComplete={props.onSlidingComplete}
          style={{ height: 40 }}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
        
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
          {durationProps.labels.map((label, index) => (
            <Text key={index} style={{
              fontSize: 12,
              color: theme.colors.onSurfaceVariant,
            }}>
              {label}
            </Text>
          ))}
        </View>
      </>
    );
  };

  return (
    <Card
      style={{
        marginBottom: 8,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.colors.background,
        borderWidth: 0,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <Animated.View entering={FadeIn.duration(300)}>
        <Card.Content style={{ padding: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 16 
          }}>
            <MaterialCommunityIcons 
              name={props.icon as MaterialCommunityIconName} 
              size={24} 
              color={sliderColor} 
            />
            
            <Text style={[
              typographyStyles.text_body, 
              { 
                marginLeft: 12,
                color: theme.colors.onSurface,
                fontWeight: '500',
                flex: 1,
              }
            ]}>
              {props.label}
            </Text>
          </View>
          
          <View style={{ paddingHorizontal: 8 }} {...panResponder.panHandlers}>
            {props.variant === 'emotion' ? renderEmotionSlider() : renderDurationSlider()}
          </View>
        </Card.Content>
      </Animated.View>
    </Card>
  );
};

export default SliderCard;
