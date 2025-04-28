import Service from "@/components/custom_components/HomePage/Service";
import { pivoteerServices } from "@/components/custom_components/HomePage/services";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <div className="w-[200px] h-[200px] bg-electricPurple flex justify-center items-center rounded-full">
          Logo placeholder
        </div>
        <p className="font-semibold text-5xl">MY PIVOTEER</p>
        <p>Tranform Your Spreadsheets with Ease</p>
        <Button size="lg">Get started</Button>
      </div>

      <div className="grid grid-cols-3 gap-5 w-[70%] mt-10">
        {pivoteerServices.map((service) => (
          <Service key={service.id} pivoteerService={service} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
