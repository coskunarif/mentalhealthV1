import React from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../config/theme';
import typographyStyles from '../config/typography.styles';
import localStyles from '../config/MoodSelector.styles';

export type SliderCardProps = {
  mood: { label: string; icon: any; key: keyof typeof theme.moodColors; value: number };
  sliderColor: string;
  onSlidingComplete: (value: number, label: string) => void;
  isRelated?: boolean;
};

const SliderCard: React.FC<SliderCardProps> = ({
  mood,
  sliderColor,
  onSlidingComplete,
  isRelated = false,
}) => {
  // Determine state color based on Material Design state layering
  const stateColor = theme.moodColors[mood.key];
  
  // Linear interpolation helper for color based on value
  const getValueColor = () => {
    if (mood.value >= 75) return theme.colors.error;
    if (mood.value >= 50) return theme.colors.secondary;
    if (mood.value >= 25) return theme.colors.primary;
    return theme.colors.onSurfaceVariant;
  };

  return (
    <Card
      style={[
        {
          marginBottom: 16,
          borderRadius: 16, // Material Design M3 card radius
          // Material Design card elevation
          elevation: isRelated ? 1 : 2,
          backgroundColor: isRelated 
            ? theme.colors.surface 
            : theme.withOpacity(stateColor, 0.05), // Subtle background tint
        },
      ]}
      accessibilityLabel={`${isRelated ? 'Related ' : ''}Intensity slider for ${mood.label}`}
    >
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
          
          {/* Material Design chip-like value indicator */}
          <View style={{
            backgroundColor: theme.withOpacity(getValueColor(), 0.08),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.withOpacity(getValueColor(), 0.12),
          }}>
            <Text style={[
              {
                fontWeight: '500', // Medium weight per Material Design
                fontSize: 14,
                color: getValueColor(),
              }
            ]}>
              {mood.value}/100
            </Text>
          </View>
        </View>
        
        <View style={{ paddingHorizontal: 8 }}>
          <Slider
            value={mood.value}
            minimumValue={0}
            maximumValue={100}
            step={1}
            thumbTintColor={stateColor}
            minimumTrackTintColor={stateColor}
            maximumTrackTintColor={theme.withOpacity(theme.colors.onSurfaceVariant, 0.38)}
            onSlidingComplete={(val) => onSlidingComplete(val, mood.label)}
            style={{ height: 40 }} // Increased touch target
          />
          
          {/* Material Design tick marks with proper alignment */}
          <View style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 7, // Align with slider thumb edges
              marginTop: -4,
            }
          ]}>
            {[0, 25, 50, 75, 100].map(tick => (
              <View 
                key={tick} 
                style={{
                  width: 2,
                  height: 8,
                  backgroundColor: tick <= mood.value 
                    ? theme.withOpacity(stateColor, 0.5) // Colored for active range
                    : theme.withOpacity(theme.colors.onSurfaceVariant, 0.38), // Subtle for inactive range
                }} 
              />
            ))}
          </View>
          
          {/* Material Design value labels with proper alignment */}
          <View style={[
            { 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              marginTop: 4 
            }
          ]}>
            {[0, 25, 50, 75, 100].map(tick => (
              <Text 
                key={tick}
                style={[
                  { 
                    fontSize: 12,
                    fontWeight: tick === Math.round(mood.value / 25) * 25 ? '500' : '400',
                    color: tick <= mood.value 
                      ? theme.withOpacity(stateColor, 0.7) // Colored for active range
                      : theme.colors.onSurfaceVariant, // Standard text for inactive
                    width: 24, // Fixed width for better alignment
                    textAlign: 'center',
                  }
                ]}
              >
                {tick}
              </Text>
            ))}
          </View>
          
          {/* Material Design helper text */}
          <View style={[
            { 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              marginTop: 12 
            }
          ]}>
            <Text style={[
              { 
                fontSize: 12,
                color: theme.colors.onSurfaceVariant,
                fontWeight: mood.value <= 25 ? '500' : '400',
              }
            ]}>
              Low Intensity
            </Text>
            <Text style={[
              { 
                fontSize: 12,
                color: theme.colors.onSurfaceVariant,
                fontWeight: mood.value >= 75 ? '500' : '400',
              }
            ]}>
              High Intensity
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default SliderCard;
