import Service from "@/components/custom_components/HomePage/Service";
import { pivoteerServices } from "@/components/custom_components/HomePage/services";
import Features from "@/components/custom_components/HomePage/Features";
import Pricing from "@/components/custom_components/HomePage/Pricing";
import ContactForm from "@/components/custom_components/HomePage/ContactForm";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 mt-10">
        <img
          src="logo_500.png"
          alt="My Pivoteer Logo"
          className="w-[200px] h-[200px] rounded-full object-cover"
        />
        <p className="font-semibold text-5xl">MY PIVOTEER</p>
        <p>Transform Your Spreadsheets with Ease</p>
        <Button size="lg">Get started</Button>
      </div>
        <hr className="my-16 border-t border-pink-500 opacity-20 w-3/4 mx-auto" />

      {/* Services */}
      <div className="grid grid-cols-3 gap-5 w-[70%] mt-10">
        {pivoteerServices.map((service) => (
          <Service key={service.id} pivoteerService={service} />
        ))}
      </div>
        <hr className="my-16 border-t border-pink-500 opacity-20 w-3/4 mx-auto" />
      {/* Features */}
      <Features />

      {/* Pricing */}
      <Pricing />

      {/* Contact Us */}
      <ContactForm />
    </div>
  );
};

export default HomePage;
