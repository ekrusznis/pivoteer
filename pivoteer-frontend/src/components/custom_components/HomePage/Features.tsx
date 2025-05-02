import { WandSparkles, Paintbrush, ShieldCheck, FileUp } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: WandSparkles,
      title: "Easy to Use",
      description: "Intuitive UI that requires no spreadsheet experience.",
    },
    {
      icon: Paintbrush,
      title: "Advanced Formatting",
      description: "Quickly style, organize, and manage data without manual effort.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security",
      description: "We encrypt everything — your files and data stay safe and private.",
    },
    {
      icon: FileUp,
      title: "File Conversion",
      description: "Convert CSV, XLSX, and PDF formats on the fly without losing structure.",
    },
  ];

  return (
    <div className="flex flex-col items-center gap-10 mt-20">
      <h2 className="text-4xl font-bold">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-4/5">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center gap-3 text-center">
            <feature.icon size={50} className="text-neonPink" />
            <p className="font-semibold">{feature.title}</p>
            <p className="text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
          <hr className="my-16 border-t border-pink-500 opacity-20 w-3/4 mx-auto" />
    </div>
  );
};

export default Features;
