// src/components/dashboard/CreateDashboard/constants.js
import { LineChart, BarChart3, TrendingUp, PieChart } from 'lucide-react';

export const chartTypes = [
  { id: "line", name: "Line Chart", icon: LineChart, description: "Show trends over time" },
  { id: "bar", name: "Bar Chart", icon: BarChart3, description: "Compare values across categories" },
  { id: "area", name: "Area Chart", icon: TrendingUp, description: "Show cumulative data" },
  { id: "composed", name: "Composed Chart", icon: BarChart3, description: "Combine multiple chart types" },
  { id: "pie", name: "Pie Chart", icon: PieChart, description: "Show proportions" },
  { id: "radar", name: "Radar Chart", icon: TrendingUp, description: "Multi-dimensional data" },
  { id: "radialBar", name: "Radial Bar Chart", icon: PieChart, description: "Circular bar chart" },
  { id: "scatter", name: "Scatter Plot", icon: TrendingUp, description: "Show correlations" },
  { id: "funnel", name: "Funnel Chart", icon: TrendingUp, description: "Show conversion stages" },
  { id: "treemap", name: "Treemap", icon: BarChart3, description: "Hierarchical data visualization" },
  { id: "sankey", name: "Sankey Diagram", icon: TrendingUp, description: "Flow between nodes" },
];

export const mockFriends = [
  { id: 1, name: "Sarah Chen", email: "sarah@company.com", avatar: "/placeholder.svg?height=32&width=32", type: "friend" },
  { id: 2, name: "Mike Johnson", email: "mike@company.com", avatar: "/placeholder.svg?height=32&width=32", type: "friend" },
  { id: 3, name: "Alex Rivera", email: "alex@company.com", avatar: "/placeholder.svg?height=32&width=32", type: "friend" },
];


export const mockTeams = [
  { id: 101, name: "Sales Team", members: 8, avatar: "/placeholder.svg?height=32&width=32", type: "team" },
  { id: 102, name: "Marketing Department", members: 12, avatar: "/placeholder.svg?height=32&width=32", type: "team" },
  { id: 103, name: "Product Analytics", members: 5, avatar: "/placeholder.svg?height=32&width=32", type: "team" },
];


export const sampleDatasets = {
  sales: {
    name: "Sales Performance",
    fields: ["month", "revenue", "units_sold", "conversion_rate", "region", "date"],
    preview: [
      { month: "Jan", revenue: 45000, units_sold: 120, conversion_rate: 3.2, region: "North", date: "2024-01-01" },
      { month: "Feb", revenue: 52000, units_sold: 140, conversion_rate: 3.8, region: "North", date: "2024-02-01" },
      { month: "Mar", revenue: 48000, units_sold: 130, conversion_rate: 3.5, region: "South", date: "2024-03-01" },
    ],
  },
  marketing: {
    name: "Marketing Analytics",
    fields: ["campaign", "impressions", "clicks", "ctr", "cost", "source", "target", "value"],
    preview: [
      { campaign: "Social Media", impressions: 50000, clicks: 1200, ctr: 2.4, cost: 800, source: "Facebook", target: "Website", value: 1200 },
      { campaign: "Email", impressions: 25000, clicks: 800, ctr: 3.2, cost: 400, source: "Email", target: "Landing", value: 800 },
      { campaign: "Search", impressions: 30000, clicks: 1500, ctr: 5.0, cost: 1200, source: "Google", target: "Product", value: 1500 },
    ],
  },
};