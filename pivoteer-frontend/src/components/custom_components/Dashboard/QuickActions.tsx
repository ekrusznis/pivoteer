import { pivoteerServices } from "../HomePage/services";

const QuickActions = () => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-5 flex justify-between gap-3">
      {pivoteerServices.map((service) => (
        <div
          key={service.id}
          className="flex-1 flex flex-col justify-center items-center p-5 gap-2 rounded-sm border border-deepIndigo cursor-pointer transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:border-neonPink/40"
        >
          <service.serviceIcon size={50} className="text-neonPink" />
          <div className="text-center">
            <p className="font-semibold">{service.serviceTitle}</p>
            <p className="text-sm">{service.serviceShortDescription}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
