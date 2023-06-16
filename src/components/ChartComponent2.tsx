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

  const days: {
    name: string;
    data: TradingChartData[];
  }[] = [
    { name: "Sunday", data: [] },
    { name: "Monday", data: [] },
    { name: "Tuesday", data: [] },
    { name: "Wednesday", data: [] },
    { name: "Thursday", data: [] },
    { name: "Friday", data: [] },
    { name: "Saturday", data: [] },
  ];

  reformatted.forEach((item) => {
    const date = new Date(item.time);
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const dayIndex = days.findIndex((day) => day.name === dayOfWeek);
    days[dayIndex].data.push(item);
  });

  return days;
};

function getColorForDay(day: string) {
  switch (day) {
    case "Sunday":
      return "#ff0000";
    case "Monday":
      return "#ff8000";
    case "Tuesday":
      return "#ffff00";
    case "Wednesday":
      return "#00ff00";
    case "Thursday":
      return "#00ffff";
    case "Friday":
      return "#0000ff";
    case "Saturday":
      return "#ff00ff";
    default:
      return "#000000";
  }
}

function convertToDate(dateObj: { day: number; month: number; year: number }) {
  const { day, month, year } = dateObj;
  return new Date(year, month - 1, day);
}

export const ChartComponent = ({
  data,
}: {
  data: {
    name: string;
    data: TradingChartData[];
  }[];
}) => {
  const colors = {
    lineColor: "#1b2952",
  };

  const chartContainerRef = useRef<any>();

  useEffect(() => {
    const handleResize = () => {
      if (!chartContainerRef.current) return;
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
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

    // Create series for each day of the week
    data.forEach((day) => {
      const newSeries = chart.addAreaSeries({
        lineColor: getColorForDay(day.name),
        lineWidth: 2,
        topColor: "rgba(38, 198, 218, 0.05)",
      });
      const filtered = day.data.filter((d) => {
        return d.value !== null;
      });
      newSeries.setData(filtered);
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, colors.lineColor]);

  return <div ref={chartContainerRef} />;
};

export const ChartCrosswordStats2 = ({
  solveInfo,
}: {
  solveInfo: SolveInfo[];
}) => {
  const [data, setData] = useState<
    {
      name: string;
      data: TradingChartData[];
    }[]
  >([]);

  useEffect(() => {
    const reformatted = reformatData(solveInfo);
    setData(reformatted);
  }, [solveInfo]);

  return (
    <Box my={5} py={5}>
      <Heading size="md">Weekly performance over time</Heading>

      {data && data.length > 0 && <ChartComponent data={data} />}
      <Flex wrap="wrap" my={1}>
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => {
          return (
            <Text
              mx={1}
              p={2}
              key={day}
              borderRadius="full"
              bgColor={getColorForDay(day)}
            >
              {day}
            </Text>
          );
        })}
      </Flex>
    </Box>
  );
};
