import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartOptions,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const customTextPlugin = {
  id: 'customText',
  beforeDraw: (chart: any) => {
    const { datasets } = chart.data;
    const hasData = datasets.some((dataset: any) =>
      dataset.data.some((value: number) => value !== 0)
    );
    if (!hasData) {
      const ctx = chart.ctx;
      const width = chart.width;
      const height = chart.height;
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '16px Arial';
      ctx.fillText('준비중입니다', width / 2, height / 2);
      ctx.restore();
    }
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  customTextPlugin
);
