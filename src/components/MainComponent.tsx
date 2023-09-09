"use client";
import { Button, CircularProgress } from "@nextui-org/react";

const MainComponent = () => {
  return (
    <div>
      <Button>Press</Button>
      <div className="rounded p-4 m-2 bg-red-300">
        <CircularProgress
          label="Speed"
          size="lg"
          value={70}
          color="success"
          formatOptions={{ style: "unit", unit: "kilometer" }}
          showValueLabel={true}
          strokeWidth={4}
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-white",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
          }}
        />
      </div>
    </div>
  );
};

export default MainComponent;
