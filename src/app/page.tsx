import type { Metadata } from "next";
import { CreateScreen } from "@/components/create-screen";

export const metadata: Metadata = {
  title: "Create",
  description: "Choose what kind of photo book you’re making",
};

export default function Home() {
  return <CreateScreen />;
}
