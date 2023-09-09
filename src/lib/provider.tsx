"use client";

// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/lib/redux/store";

function Provider({ children, ...props }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    <ReduxProvider store={store}>
      <NextUIProvider>{children}</NextUIProvider>
    </ReduxProvider>
  );
}

export default Provider;
