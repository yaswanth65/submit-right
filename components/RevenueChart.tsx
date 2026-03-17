"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const data = [
  { name: "Jan", revenue: 32000 },
  { name: "Feb", revenue: 34000 },
  { name: "Mar", revenue: 45000 },
  { name: "Apr", revenue: 42000 },
  { name: "May", revenue: 38000 },
  { name: "Jun", revenue: 46000 },
  { name: "Jul", revenue: 41000 },
  { name: "Aug", revenue: 43000 },
  { name: "Sep", revenue: 50000 },
  { name: "Oct", revenue: 42000 },
  { name: "Nov", revenue: 40000 },
  { name: "Dec", revenue: 49000 },
];

export function RevenueChart() {
  return (
    <div className="w-full h-full font-dm-sans">
      <ResponsiveContainer width="100%" height="100%" minHeight={250}>
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: 10,
            bottom: 10,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A0E3" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#00A0E3" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={true} stroke="#EAECF0" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#525866', fontSize: 12, fontWeight: 500 }}
            tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}k`}
            dx={-10}
            domain={[0, 60000]}
            ticks={[0, 10000, 20000, 30000, 40000, 50000, 60000]}
            label={{ value: 'Revenue', angle: -90, position: 'insideLeft', fill: '#525866', fontSize: 12, fontWeight: 500, style: { textAnchor: 'middle' }, offset: 0 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #EAECF0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', fontSize: '13px', fontWeight: 500, color: '#171717' }} 
            itemStyle={{ color: '#00A0E3', fontWeight: 600 }}
          />
          <Area
            type="linear"
            dataKey="revenue"
            stroke="#00A0E3"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorRevenue)"
            activeDot={{ r: 6, fill: '#FFFFFF', stroke: '#00A0E3', strokeWidth: 2 }}
            dot={{ r: 3, fill: '#FFFFFF', stroke: '#00A0E3', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
