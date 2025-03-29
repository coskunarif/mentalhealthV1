import React, { useState, useEffect } from 'react'; // Added useEffect
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  ActivityIndicator, // Added ActivityIndicator
  StyleSheet, // Added StyleSheet
} from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { router } from 'expo-router';
import localStyles from '../config/MoodPyramid.styles';
import { typographyStyles } from '../config';
import { useAppTheme } from '../hooks/useAppTheme';
import EnhancedButton from './EnhancedButton';
import { ScreenLayout } from './ScreenLayout'; // Import ScreenLayout
import MoodService from '../services/mood.service'; // Import MoodService
import { EmotionDefinition } from '../models/mood.model'; // Import EmotionDefinition

// Type for the state used in the pyramid UI
type PyramidEmotion = {
  id: string;
  label: string; // Use label for display consistency
  color: string;
  width: string; // Keep width for pyramid styling
};

// Type for selected emotions
type EmotionSelection = {
  label: string;
  color: string;
};

type BubbleConfig = {
  size: number;
  fontSize: number;
  style: {
    left?: number;
    right?: number;
    top: number;
    zIndex: number;
  };
};

type Props = {
  onPrevious: () => void;
  onFinish: () => void;
};

const screenHeight = Dimensions.get('window').height;

const getBubbleConfig = (screenWidth: number): BubbleConfig[] => {
  const theme = useAppTheme();
  const baseSize = Math.min(screenWidth * 0.4, 160); // Responsive base size
  const fontSize = theme.scaleFont(Math.min(screenWidth * 0.042, 18)); // Responsive font size
  return [
    {
      size: baseSize * 1.05,
      fontSize: fontSize,
      style: {
        left: screenWidth * 0.06,
        top: 20,
        zIndex: 3,
      },
    },
    {
      size: baseSize * 0.95,
      fontSize: theme.scaleFont(fontSize * 0.9),
      style: {
        right: screenWidth * 0.09,
        top: 20,
        zIndex: 2,
      },
    },
    {
      size: baseSize * 0.85,
      fontSize: theme.scaleFont(fontSize * 0.8),
      style: {
        left: screenWidth * 0.32,
        top: baseSize * 1,
        zIndex: 1,
      },
    },
  ];
};

export function MoodPyramid({ onPrevious, onFinish }: Props) {
  const theme = useAppTheme();
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionSelection[]>([]);
  const [pyramidEmotions, setPyramidEmotions] = useState<PyramidEmotion[]>([]); // State for fetched emotions
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const screenWidth = Dimensions.get('window').width;
  const bubbleConfig = getBubbleConfig(screenWidth);

  // Hardcoded widths based on order - ideally fetch this too if it varies
  const pyramidWidths = ['40%', '55%', '70%', '85%', '100%'];

  // Fetch Emotion Definitions
  useEffect(() => {
    const fetchEmotions = async () => {
      setLoading(true);
      setError(null);
      try {
        const definitions = await MoodService.getEmotionDefinitions();
        const mappedEmotions = definitions.map((def, index) => ({
          id: def.id,
          label: def.name,
          color: theme.moodColors[def.moodKey],
          width: pyramidWidths[index % pyramidWidths.length] || '100%', // Assign width based on order
        }));
        setPyramidEmotions(mappedEmotions);
      } catch (err: any) {
        console.error('[MoodPyramid] Error fetching emotion definitions:', err);
        setError(err.message || 'Failed to load emotion options.');
      } finally {
        setLoading(false);
      }
    };
    fetchEmotions();
  }, [theme]); // Depend on theme as it's used for colors

  const handleEmotionSelect = (emotion: PyramidEmotion) => {
    // Use 'label' for selection logic as it's unique in this context
    if (selectedEmotions.some(e => e.label === emotion.label)) {
      setSelectedEmotions(prev => prev.filter(e => e.label !== emotion.label));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions(prev => [...prev, { label: emotion.label, color: emotion.color }]);
    }
  };

  const handleBubbleClick = (index: number) => {
    if (selectedEmotions[index]) {
      setSelectedEmotions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleBack = () => {
    router.back();
  };

  // Handle Loading / Error states
  if (loading) {
    return (
      <ScreenLayout title="Focus Emotions" onBackPress={handleBack} elevation={0}>
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading emotions...</Text>
        </View>
      </ScreenLayout>
    );
  }

  if (error) {
    return (
      <ScreenLayout title="Focus Emotions" onBackPress={handleBack} elevation={0}>
        <View style={styles.centeredContainer}>
          <Text style={{ color: theme.colors.error }}>{error}</Text>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout
      title="Focus Emotions"
      onBackPress={handleBack}
      elevation={0}
      scrollable={true}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: 120,
        paddingHorizontal: 16
      }}
      bottomContent={
        <View style={[
          localStyles.mood_buttonContainer,
          {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            padding: 16,
            backgroundColor: theme.colors.background,
            borderTopWidth: 1,
            borderTopColor: theme.withOpacity(theme.colors.outline, 0.08),
          }
        ]}>
          <View style={{
            flex: 1,
            marginRight: theme.spacing.small,
          }}>
            <EnhancedButton
              mode="contained"
              onPress={onPrevious}
              accessibilityLabel="Return to previous screen"
              fullWidth
              icon="arrow-left"
            >
              PREVIOUS
            </EnhancedButton>
          </View>
          <View style={{
            flex: 1,
            marginLeft: theme.spacing.small
          }}>
            <EnhancedButton
              mode="contained"
              onPress={onFinish}
              accessibilityLabel="Complete emotion selection"
              fullWidth
              icon="check"
            >
              FINISH
            </EnhancedButton>
          </View>
        </View>
      }
    >
      <Text
        style={[
          typographyStyles.text_heading2,
          {
            textAlign: 'center',
            color: theme.colors.onSurface,
            marginTop: theme.spacing.large,
            marginBottom: theme.spacing.large,
            fontWeight: '500',
            letterSpacing: 0,
          },
        ]}
      >
        Identify the emotions to focus on
      </Text>

      <View style={[localStyles.pyramid_container, { marginBottom: 24 }]}>
        {/* Use fetched pyramidEmotions */}
        {pyramidEmotions.map(emotion => (
          <TouchableOpacity
            key={emotion.id} // Use unique ID from Firestore
            onPress={() => handleEmotionSelect(emotion)}
            accessibilityLabel={`Select emotion ${emotion.label}`}
            accessibilityRole="button"
            style={[
              localStyles.pyramid_item,
              {
                backgroundColor: emotion.color,
                width: emotion.width,
                ...(selectedEmotions.some(e => e.label === emotion.label) && {
                  borderWidth: 2,
                  borderColor: theme.colors.outline,
                }),
              } as ViewStyle,
            ]}
          >
            <Text style={localStyles.pyramid_text}>{emotion.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text
        style={[
          theme.fonts.bodySmall,
          {
            textAlign: 'center',
            marginTop: theme.spacing.small,
            color: theme.colors.onSurfaceVariant,
          },
        ]}
      >
        Tap up to 3 emotions to focus on your mindfulness journey.
      </Text>
      <Text
        style={[
          typographyStyles.text_heading3,
          {
            color: theme.colors.primary,
            marginTop: theme.spacing.medium,
            marginBottom: 16
          },
        ]}
      >
        Focus Emotions
      </Text>
      <View style={[
        localStyles.pyramid_bubbleContainer,
        {
          position: 'relative',
          minHeight: 400,
          marginBottom: 24
        }
      ]}>
        {bubbleConfig.map((config, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleBubbleClick(index)}
            accessibilityLabel={
              selectedEmotions[index]
                ? `Remove ${selectedEmotions[index].label}`
                : `Select focus emotion ${index + 1}`
            }
            accessibilityRole="button"
            style={[
              localStyles.pyramid_bubble,
              {
                position: 'absolute',
                width: config.size,
                height: config.size,
                backgroundColor: selectedEmotions[index]?.color || theme.colors.background,
                borderWidth: 2,
                borderColor: theme.colors.outline,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
              },
              config.style
            ]}
          >
            {selectedEmotions[index] ? (
              <Text
            style={[
              localStyles.pyramid_bubbleText,
              { fontSize: config.fontSize },
            ]}
          >
            {selectedEmotions[index].label}
          </Text>
        ) : (
          <Text
            style={[
              typographyStyles.text_heading3,
              {
                fontSize: config.fontSize * 0.8,
                color: theme.colors.primary,
                textAlign: 'center',
                fontWeight: 'bold', // Added for emphasis
              },
            ]}
          >
            Focus{'\n'}Emotions
          </Text>
        )}
      </TouchableOpacity>
    ))}
  </View>
</ScreenLayout>
);
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});


export default MoodPyramid;
