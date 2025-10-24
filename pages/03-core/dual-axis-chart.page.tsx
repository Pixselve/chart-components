// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import Highcharts from "highcharts";
import { omit } from "lodash";

import CoreChart from "../../lib/components/internal-do-not-use/core-chart";
import { dateFormatter, numberFormatter } from "../common/formatters";
import { PageSettingsForm, useChartSettings } from "../common/page-settings";
import { Page } from "../common/templates";

const baseline = [
  { x: 1600984800000, y1: 58020, y2: 45 },
  { x: 1600985700000, y1: 102402, y2: 52 },
  { x: 1600986600000, y1: 104920, y2: 48 },
  { x: 1600987500000, y1: 94031, y2: 55 },
  { x: 1600988400000, y1: 125021, y2: 62 },
  { x: 1600989300000, y1: 159219, y2: 58 },
  { x: 1600990200000, y1: 193082, y2: 71 },
  { x: 1600991100000, y1: 162592, y2: 65 },
  { x: 1600992000000, y1: 274021, y2: 78 },
  { x: 1600992900000, y1: 264286, y2: 82 },
  { x: 1600993800000, y1: 289210, y2: 75 },
  { x: 1600994700000, y1: 256362, y2: 68 },
  { x: 1600995600000, y1: 257306, y2: 72 },
  { x: 1600996500000, y1: 186776, y2: 58 },
  { x: 1600997400000, y1: 294020, y2: 85 },
  { x: 1600998300000, y1: 385975, y2: 92 },
  { x: 1600999200000, y1: 486039, y2: 88 },
  { x: 1601000100000, y1: 490447, y2: 95 },
  { x: 1601001000000, y1: 361845, y2: 78 },
  { x: 1601001900000, y1: 339058, y2: 72 },
  { x: 1601002800000, y1: 298028, y2: 65 },
  { x: 1601003400000, y1: 255555, y2: 58 },
  { x: 1601003700000, y1: 231902, y2: 52 },
  { x: 1601004600000, y1: 224558, y2: 48 },
  { x: 1601005500000, y1: 253901, y2: 55 },
  { x: 1601006400000, y1: 102839, y2: 42 },
  { x: 1601007300000, y1: 234943, y2: 62 },
  { x: 1601008200000, y1: 204405, y2: 58 },
  { x: 1601009100000, y1: 190391, y2: 52 },
  { x: 1601010000000, y1: 183570, y2: 48 },
  { x: 1601010900000, y1: 162592, y2: 45 },
  { x: 1601011800000, y1: 148910, y2: 38 },
  { x: 1601012700000, y1: null, y2: null },
  { x: 1601013600000, y1: 293910, y2: 72 },
];

const series: Highcharts.SeriesOptionsType[] = [
  {
    name: "Network Traffic",
    type: "line",
    data: baseline.map(({ x, y1 }) => ({ x, y: y1 })),
    yAxis: "events",
  },
  {
    name: "Request Count",
    type: "line",
    data: baseline.map(({ x, y1 }) => ({ x, y: y1 === null ? null : y1 * 0.8 })),
    yAxis: "events",
  },
  {
    name: "CPU Usage",
    type: "line",
    data: baseline.map(({ x, y2 }) => ({ x, y: y2 })),
    yAxis: "percentage",
  },
  {
    name: "Memory Usage",
    type: "line",
    data: baseline.map(({ x, y2 }) => ({ x, y: y2 === null ? null : y2 * 0.9 })),
    yAxis: "percentage",
  },
];

export default function () {
  const { chartProps } = useChartSettings();
  return (
    <Page
      title="Dual axis chart demo"
      subtitle="Chart with multiple legends and two y-axes."
      settings={
        <PageSettingsForm
          selectedSettings={[
            "showLegend",
            "legendPosition",
            "legendHorizontalAlign",
            "showLegendTitle",
            "showLegendActions",
            "useFallback",
          ]}
        />
      }
    >
      <CoreChart
        {...omit(chartProps.cartesian, "ref")}
        highcharts={Highcharts}
        options={{
          lang: {
            accessibility: {
              chartContainerLabel: "Dual axis line chart",
            },
          },
          series: series,
          xAxis: [
            {
              type: "datetime",
              title: { text: "Time (UTC)" },
              valueFormatter: dateFormatter,
            },
          ],
          yAxis: [
            {
              title: { text: "Events" },
              id: "events",
            },
            {
              title: { text: "Percentage (%)" },
              opposite: true,
              id: "percentage",
            },
          ],
          chart: {
            zooming: {
              type: "x",
            },
          },
        }}
        chartHeight={400}
        tooltip={{ placement: "outside" }}
        getTooltipContent={() => ({
          point({ item }) {
            const value = item ? (item.point.y ?? null) : null;
            return {
              value: <div>{numberFormatter(value)}</div>,
            };
          },
        })}
      />
    </Page>
  );
}
