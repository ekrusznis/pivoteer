const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0/mo",
      features: ["Upload up to 1GB of data", "Pivot tables and sheet editing", "Basic file cleaning"]
    },
    {
      name: "Pro",
      price: "$30/mo",
      features: ["Upload up to 10GB of data", "Full macros, pivots, visualizations", "Priority email support"]
    },
    {
      name: "Enterprise",
      price: "Contact Us",
      features: ["Team accounts", "Custom limits", "All Subscription Add-ons"]
    },
  ];

  return (
<div className="flex flex-col items-center gap-10 mt-20">
  <h2 className="text-4xl font-bold">Pricing</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] max-w-6xl">
    {plans.map((plan, index) => (
      <div
        key={index}
        className="bg-deepIndigo rounded-2xl shadow-lg p-10 flex flex-col items-center gap-6 min-w-[300px] transition-transform hover:scale-105 duration-300"
      >
        <h3 className="text-3xl font-extrabold">{plan.name}</h3>
        <p className="text-neonPink text-4xl">{plan.price}</p>
        <ul className="flex flex-col gap-2 text-center text-base mt-4">
          {plan.features.map((feature, idx) => (
            <li key={idx}>✓ {feature}</li>
          ))}
        </ul>
        <button className="mt-6 px-8 py-3 bg-neonPink hover:bg-pink-500 text-white rounded-lg font-semibold transition-colors duration-300">
          Choose Plan
        </button>
      </div>
    ))}
  </div>
</div>

  );
};
export default Pricing;