import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, List, Portal, Modal, RadioButton, Searchbar, Text } from 'react-native-paper';
import { theme } from '../config/theme';

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

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? `${lang.name} (${lang.nativeName})` : 'English';
  };

  return (
    <>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Language & Region</Title>
          
          <List.Item
            title="Language"
            description={getCurrentLanguageName()}
            onPress={showModal}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={styles.itemTitle}
            descriptionStyle={styles.itemDescription}
          />
        </Card.Content>
      </Card>

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Select Language</Title>
          
          <Searchbar
            placeholder="Search languages..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
          />

          <RadioButton.Group
            onValueChange={value => !isSubmitting && handleLanguageSelect(value)}
            value={currentLanguage}
          >
            {filteredLanguages.map(lang => (
              <List.Item
                key={lang.code}
                title={`${lang.name} (${lang.nativeName})`}
                onPress={() => !isSubmitting && handleLanguageSelect(lang.code)}
                right={() => (
                  <RadioButton
                    value={lang.code}
                    disabled={isSubmitting}
                  />
                )}
                titleStyle={styles.languageItem}
              />
            ))}
          </RadioButton.Group>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: theme.spacing.medium,
    padding: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius * 2,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  sectionTitle: {
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary,
    fontSize: theme.fonts.headlineMedium.fontSize,
    fontFamily: theme.fonts.headlineMedium.fontFamily,
    fontWeight: theme.fonts.headlineMedium.fontWeight,
  },
  itemTitle: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
  itemDescription: {
    ...theme.fonts.bodyMedium,
    color: theme.colors.onSurfaceVariant,
  },
  modalContainer: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.medium,
    margin: theme.spacing.medium,
    borderRadius: theme.shape.borderRadius * 2,
    maxHeight: '80%',
  },
  modalTitle: {
    ...theme.fonts.headlineMedium,
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
  },
  searchbar: {
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.surfaceVariant,
  },
  languageItem: {
    ...theme.fonts.bodyLarge,
    color: theme.colors.onSurface,
  },
});
