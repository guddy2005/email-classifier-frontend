import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import allEmails from "../data.json"; // Import local data
import LoadingSpinner from "../components/common/LoadingSpinner";
import { BarChart2 } from "lucide-react";

// --- Chart.js Imports ---
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
} from "chart.js";

// --- Register Chart.js components ---
ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartTitle
);

const AnalyticsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  margin-bottom: ${({ theme }) => theme.spacing[6]};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[6]};
  text-align: center;
`;

const StatValue = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: ${({ theme }) => theme.spacing[2]};
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing[6]};
  margin-top: ${({ theme }) => theme.spacing[6]};
`;

const ChartContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    // Process the data from the imported JSON file
    const calculateAnalytics = () => {
      if (!allEmails || allEmails.length === 0) {
        setAnalyticsData({ totalEmails: 0, categoryCounts: {} });
        return;
      }

      const totalEmails = allEmails.length;
      const categoryCounts = allEmails.reduce((acc, email) => {
        acc[email.category] = (acc[email.category] || 0) + 1;
        return acc;
      }, {});

      setAnalyticsData({ totalEmails, categoryCounts });
    };

    calculateAnalytics();
  }, []);

  if (!analyticsData) {
    return <LoadingSpinner text="Calculating analytics..." />;
  }

  // --- Chart Data and Options ---
  const chartLabels = Object.keys(analyticsData.categoryCounts);
  const chartValues = Object.values(analyticsData.categoryCounts);

  const chartColors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.success,
    theme.colors.warning,
    theme.colors.error,
    theme.colors.info,
  ];

  const doughnutData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Emails by Category",
        data: chartValues,
        backgroundColor: chartColors,
        borderColor: theme.colors.surface,
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Email Count',
        data: chartValues,
        backgroundColor: chartColors,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: theme.colors.textSecondary,
        },
      },
      title: {
        display: true,
        text: 'Email Category Distribution',
        color: theme.colors.textPrimary,
        font: { size: 16 },
      },
    },
  };

  return (
    <AnalyticsContainer>
      <Title><BarChart2 size={32} /> Analytics</Title>
      {analyticsData && (
        <>
          <StatsGrid>
            <StatCard>
              <StatValue>{analyticsData.totalEmails}</StatValue>
              <StatLabel>Total Emails</StatLabel>
            </StatCard>
            {Object.entries(analyticsData.categoryCounts).map(
              ([category, count]) => (
                <StatCard key={category}>
                  <StatValue>{count}</StatValue>
                  <StatLabel>{category}</StatLabel>
                </StatCard>
              )
            )}
          </StatsGrid>

          <ChartsGrid>
            <ChartContainer>
              <Doughnut data={doughnutData} options={chartOptions} />
            </ChartContainer>
            <ChartContainer>
              <Bar data={barData} options={chartOptions} />
            </ChartContainer>
          </ChartsGrid>
        </>
      )}
    </AnalyticsContainer>
  );
};

export default Analytics;