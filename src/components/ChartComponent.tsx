import { SolveInfo } from "@/lib/crossword/types";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";

type TradingChartData = {
  time: string | { day: number; month: number; year: number };
  value: number;
};

const reformatData = (solveInfo: SolveInfo[]) => {
  const reformatted = solveInfo.map((info) => {
    return {
      time: info.puzzle_id.date.toString(),
      value: info.seconds_spent_solving,
    };
  });

  reformatted.sort((a, b) => {
    return a.time.localeCompare(b.time);
  });

  return reformatted;
};

function convertToDate(dateObj: { day: number; month: number; year: number }) {
  const { day, month, year } = dateObj;
  return new Date(year, month - 1, day);
}

const setToTimePeriod = (data: TradingChartData[], timePeriod: Date) => {
  return data.filter((d) => {
    if (typeof d.time === "string") {
      const date = new Date(d.time);
      return date > timePeriod;
    }
    const date = convertToDate(d.time as any);
    return date > timePeriod;
  });
};

export const ChartComponent = ({ data }: { data: TradingChartData[] }) => {
  const colors = {
    backgroundColor: "white",
    lineColor: "#1b2952",
    textColor: "black",
    areaTopColor: "#d1ddff",
    areaBottomColor: "rgba(228, 228, 228, 0.28)",
  };

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: colors.backgroundColor },
        textColor: colors.textColor,
      },
      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          color: "rgba(160, 162, 168, 0.5)",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      topColor: "rgba(76, 175, 80, 0.56)",
      bottomColor: "rgba(76, 175, 80, 0.04)",
      lineColor: "rgba(76, 175, 80, 1)",
      lineWidth: 2,
    });
    newSeries.setData(data);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    colors.backgroundColor,
    colors.textColor,
    colors.lineColor,
    colors.areaTopColor,
    colors.areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export const ChartCrosswordStats = ({
  solveInfo,
}: {
  solveInfo: SolveInfo[];
}) => {
  const [data, setData] = useState<TradingChartData[]>([]);

  useEffect(() => {
    const reformatted = reformatData(solveInfo);
    setData(reformatted);
  }, [solveInfo]);

  return (
    <>
      <Heading size="md">Daily performance over time</Heading>
      <Flex>
        <Button
          borderRadius="none"
          onClick={() => {
            const dat = reformatData(solveInfo);
            const oneMonthAgo = new Date().setMonth(new Date().getMonth() - 1);
            setData(setToTimePeriod(dat, new Date(oneMonthAgo)));
          }}
        >
          1 Month
        </Button>
        <Button
          borderRadius="none"
          mx={1}
          onClick={() => {
            const dat = reformatData(solveInfo);
            const oneWeekAgo = new Date().setDate(new Date().getDate() - 7);
            setData(setToTimePeriod(dat, new Date(oneWeekAgo)));
          }}
        >
          1 Week
        </Button>
        <Button
          borderRadius="none"
          onClick={() => {
            setData(reformatData(solveInfo));
          }}
        >
          All time
        </Button>
      </Flex>
      {data && data.length > 0 && <ChartComponent data={data} />}
    </>
  );
};
