// import * as Plot from "@observablehq/plot";
// import * as d3 from "d3";
// import { useEffect, useRef, useState } from "react";

// export const Boxplot = ({data} : any) => {
//   const containerRef = useRef();

//   useEffect(() => {
//     const plot = Plot.plot({
//       y: { grid: true },
//       color: { scheme: "burd" },
//       marks: [
//         Plot.ruleY([0]),
//         Plot.dot(data, { x: "Date", y: "Anomaly", stroke: "Anomaly" }),
//       ],
//     });
//     if (containerRef.current) containerRef.current.append(plot);
//     return () => plot.remove();
//   }, []);

//   return <div ref={containerRef} />;
// }
