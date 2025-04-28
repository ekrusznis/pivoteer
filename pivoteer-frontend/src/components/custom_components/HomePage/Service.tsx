import { LucideProps } from "lucide-react";

type ServiceType = {
  id: number;
  serviceIcon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  serviceTitle: string;
  serviceDescription: string;
};

const Service = ({ pivoteerService }: { pivoteerService: ServiceType }) => {
  return (
    <div className="flex flex-col items-center gap-5 rounded-xl p-5 shadow-md bg-deepIndigo">
      <pivoteerService.serviceIcon size={86} className="text-neonPink" />
      <p className="text-2xl font-bold">{pivoteerService.serviceTitle}</p>
      <p className="text-center text-sm">
        {pivoteerService.serviceDescription}
      </p>
    </div>
  );
};

export default Service;
