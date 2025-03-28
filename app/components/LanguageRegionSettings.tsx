import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, Title, List, Portal, Modal, RadioButton, Searchbar, Text, useTheme } from 'react-native-paper'; // Import useTheme
// Remove direct theme import
import { miscStyles } from '../config';
import type { AppTheme } from '../types/theme'; // Import AppTheme

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
];

interface LanguageRegionSettingsProps {
  currentLanguage?: string;
  onLanguageChange?: (languageCode: string) => Promise<void>;
}

export const LanguageRegionSettings: React.FC<LanguageRegionSettingsProps> = ({
  currentLanguage = 'en',
  onLanguageChange,
}) => {
  const theme = useTheme<AppTheme>(); // Use hook
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleLanguageSelect = async (languageCode: string) => {
    setIsSubmitting(true);
    try {
      if (onLanguageChange) {
        await onLanguageChange(languageCode);
      }
      hideModal();
    } catch (error) {
      // Handle error if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCurrentLanguageName = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? `${lang.name} (${lang.nativeName})` : 'English';
  };

  return (
    <>
      <Surface style={{
        margin: theme.spacing.medium,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.shape.borderRadius,
      }} elevation={1}>
        <List.Section>
          <List.Item
            title="Language"
            description={getCurrentLanguageName()}
            onPress={showModal}
            right={(props) => <List.Icon {...props} icon="chevron-right" color={theme.colors.onSurfaceVariant} />}
            titleStyle={{
              ...theme.fonts.bodyLarge,
              color: theme.colors.onSurface,
            }}
            descriptionStyle={{
              ...theme.fonts.bodyMedium,
              color: theme.colors.onSurfaceVariant,
            }}
            style={miscStyles.list_item}
            rippleColor={theme.withOpacity(theme.colors.primary, 0.1)}
          />
        </List.Section>
      </Surface>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[
            {
              backgroundColor: theme.colors.surface,
              padding: theme.spacing.medium,
              margin: theme.spacing.medium,
              maxHeight: '80%',
              borderRadius: 28,
              maxWidth: 560,
              width: '90%',
              alignSelf: 'center',
            }
          ]}
        >
          <Title style={[{
            ...theme.fonts.headlineMedium,
            color: theme.colors.primary,
            marginBottom: theme.spacing.medium,
          }, theme.fonts.headlineSmall]}>Select Language</Title>
          <Searchbar
            placeholder="Search languages..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={{
              marginBottom: theme.spacing.medium,
              backgroundColor: theme.colors.surfaceVariant,
            }}
            iconColor={theme.colors.onSurfaceVariant}
          />
          <View style={{ maxHeight: 400 }}>
            <RadioButton.Group
              onValueChange={(value) => !isSubmitting && handleLanguageSelect(value)}
              value={currentLanguage}
            >
              {filteredLanguages.map((lang) => (
                <List.Item
                  key={lang.code}
                  title={`${lang.name}`}
                  description={lang.nativeName}
                  onPress={() => !isSubmitting && handleLanguageSelect(lang.code)}
                  right={() => (
                    <RadioButton
                      value={lang.code}
                      disabled={isSubmitting}
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={{
                    ...theme.fonts.bodyLarge,
                    color: theme.colors.onSurface,
                  }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                  style={{ paddingVertical: 8 }}
                />
              ))}
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>
    </>
  );
};

export default LanguageRegionSettings;
