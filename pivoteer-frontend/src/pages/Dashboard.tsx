import QuickActions from "@/components/custom_components/Dashboard/QuickActions";
import UploadedFilesTable from "@/components/custom_components/Dashboard/UploadedFilesTable/UploadedFilesTable";
import FileUploadSection from "@/components/custom_components/Dashboard/UploadFileSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      <FileUploadSection />
      <QuickActions />
      <div className="flex-1 overflow-hidden mt-10">
        <UploadedFilesTable />
      </div>
    </div>
  );
};

export default Dashboard;
