import { useState } from "react";

const helpTopics = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Learn the basics to begin using the application effectively.",
    videoPlaceholder: true,
    content: (
      <>
        <p className="mb-4">
          MyPivoteer allows you to upload spreadsheets, build pivot tables, and automate workflows with macros.
        </p>
        <p>
          Watch the walkthrough above to understand how to upload your first file and generate your first pivot table.
        </p>
      </>
    ),
  },
  {
    id: "pivot-tables",
    title: "Creating Pivot Tables",
    description: "Instructions on generating and editing pivot tables.",
    videoPlaceholder: true,
    content: (
      <>
        <p className="mb-4">
          Pivot tables help summarize large data sets quickly. Choose columns, rows, and aggregation logic.
        </p>
        <p>
          You can use our AI assistant to create tables using natural language instructions.
        </p>
      </>
    ),
  },
  {
    id: "macros",
    title: "Using Macros",
    description: "Save time by automating common tasks and formatting.",
    videoPlaceholder: true,
    content: (
      <>
        <p className="mb-4">
          Macros are reusable commands that let you apply logic to files without writing formulas.
        </p>
        <p>
          Learn to build, apply, and manage macros to streamline your workflow.
        </p>
      </>
    ),
  },
  {
    id: "visualization",
    title: "Visualization Options",
    description: "Transform your data into charts, graphs, and reports.",
    videoPlaceholder: true,
    content: (
      <>
        <p>
          Choose from bar, line, pie, and other chart types to visualize your processed data with clarity.
        </p>
      </>
    ),
  },
  {
    id: "exporting",
    title: "File Exporting",
    description: "Download your data as CSV, XLSX, or PDF after processing.",
    videoPlaceholder: true,
    content: (
      <>
        <p>
          Once done editing or transforming, you can export files directly from your dashboard. You retain all formatting and calculations.
        </p>
      </>
    ),
  },
];

const Help = () => {
  const [selectedTopic, setSelectedTopic] = useState(helpTopics[0]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <h3 className="text-lg font-semibold mb-4">Help Topics</h3>
        <ul className="space-y-2">
          {helpTopics.map((topic) => (
            <li
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className={`cursor-pointer px-4 py-2 rounded-md transition-all ${
                selectedTopic.id === topic.id
                  ? "bg-purple-900 text-white"
                  : "text-gray-300 hover:bg-purple-800"
              }`}
            >
              {topic.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 space-y-4">
        <h2 className="text-2xl font-bold">{selectedTopic.title}</h2>
        <p className="text-gray-400">{selectedTopic.description}</p>

        {/* Video/Image Placeholder */}
        <div className="bg-darkIndigo border border-gray-700 rounded-md w-full aspect-video flex items-center justify-center text-gray-500">
          ▶ Video or image preview
        </div>

        <div className="text-sm text-gray-300 leading-relaxed">
          {selectedTopic.content}
        </div>
      </div>
    </div>
  );
};

export default Help;
