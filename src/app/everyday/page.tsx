import type { Metadata } from "next";
import { EverydayPdpScreen } from "@/components/everyday-pdp-screen";

export const metadata: Metadata = {
  title: "Everyday Photo Books",
  description: "Configure your Everyday photo book subscription",
};

export default function EverydayPage() {
  return <EverydayPdpScreen />;
}
