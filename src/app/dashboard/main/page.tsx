import { CardAction, CardActionGrid, CardInfoGrid } from "@/app/components";
import { GiReceiveMoney } from "react-icons/gi";

export const metadata = {
  title: "Dashboard",
  description: "Menú principal"
}

export default function MainPage() {
  return (
    <>
      <div className="flex flex-wrap items-center justify-center w-100">
        <CardInfoGrid />
      </div>

      <div className="w-full">
        <CardActionGrid />
      </div>

    </>
  );
}
