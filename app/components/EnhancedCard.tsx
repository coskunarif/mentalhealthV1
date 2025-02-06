import React from 'react';
import { Card } from 'react-native-paper';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from '../config/styles';

type CardStyle = StyleProp<ViewStyle>;

interface BaseCardProps {
  mode?: 'elevated' | 'outlined';
  style?: CardStyle;
  onPress?: () => void;
  selected?: boolean;
}

interface EnhancedCardProps extends BaseCardProps {
  contentStyle?: CardStyle;
  children?: React.ReactNode;
}

interface CardContentProps {
  style?: CardStyle;
  children?: React.ReactNode;
}

const CardContent = ({ style, children }: CardContentProps): JSX.Element => (
  <Card.Content style={style}>{children}</Card.Content>
);

const EnhancedCardComponent = ({ 
  style, 
  mode = 'elevated',
  onPress,
  selected,
  children,
  contentStyle,
  ...props 
}: EnhancedCardProps): JSX.Element => {
  const baseStyle: CardStyle = mode === 'elevated' 
    ? styles.component.card.elevated 
    : styles.component.card.listItem;

  const selectedStyle: CardStyle = selected 
    ? styles.component.card.selected 
    : undefined;

  const cardStyle: CardStyle = [
    baseStyle,
    selectedStyle,
    style,
  ].filter(Boolean);

  return (
    <Card
      mode={mode}
      style={cardStyle}
      onPress={onPress}
      {...props}
    >
      <CardContent style={contentStyle}>
        {children}
      </CardContent>
    </Card>
  );
};

type EnhancedCardType = typeof EnhancedCardComponent & {
  Content: typeof CardContent;
};

const EnhancedCard = EnhancedCardComponent as EnhancedCardType;
EnhancedCard.Content = CardContent;

export default EnhancedCard;
