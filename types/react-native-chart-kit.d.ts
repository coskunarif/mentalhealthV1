declare module 'react-native-chart-kit' {
  import { ViewStyle } from 'react-native';
  
  interface ChartConfig {
    backgroundColor?: string;
    backgroundGradientFrom?: string;
    backgroundGradientTo?: string;
    decimalPlaces?: number;
    color?: (opacity: number) => string;
    labelColor?: (opacity: number) => string;
    style?: ViewStyle;
    propsForDots?: ViewStyle;
    propsForLabels?: object;
    propsForBackgroundLines?: object;
  }

  interface LineChartData {
    labels: string[];
    datasets: {
      data: number[];
      color?: (opacity: number) => string;
      strokeWidth?: number;
    }[];
    legend?: string[];
  }

  interface LineChartProps {
    data: LineChartData;
    width: number;
    height: number;
    chartConfig: ChartConfig;
    bezier?: boolean;
    style?: ViewStyle;
    withDots?: boolean;
    withShadow?: boolean;
    withInnerLines?: boolean;
    withOuterLines?: boolean;
    withHorizontalLabels?: boolean;
    withVerticalLabels?: boolean;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    yAxisInterval?: number;
    formatYLabel?: (value: string) => string;
    segments?: number;
    formatXLabel?: (value: string) => string;
    getDotColor?: (dataPoint: number, index: number) => string;
    hidePointsAtIndex?: number[];
    onDataPointClick?: (data: { value: number; dataset: any; getColor: any }) => void;
  }

  export class LineChart extends React.Component<LineChartProps> {}
}
