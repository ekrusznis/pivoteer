import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUploadedFileDto } from "@/services/responses/IUploadedFileDto";
import { formatBytes } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Download, MoreHorizontal, Trash2 } from "lucide-react";
import { ChartColumnDecreasing, Columns3Cog, Grid2x2Check } from "lucide-react";

export const columns: ColumnDef<IUploadedFileDto>[] = [
  {
    accessorKey: "fileName",
    header: "File name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("fileName")}</div>
    ),
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{formatBytes(row.getValue("size"))}</div>,
  },
  {
    accessorKey: "uploaded",
    header: "Uploaded",
    cell: ({ row }) => {
      return <div>{row.getValue("uploaded")}</div>;
    },
  },

  {
    id: "actions",
    header: () => {
      return <div className="text-center">Actions</div>;
    },
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <div className="text-center">
            <DropdownMenuTrigger asChild>
              <Button>
                Generate <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end" className="min-w-[220px]">
            <DropdownMenuLabel>Generate options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Generate Pivot Table{" "}
              <DropdownMenuShortcut>
                <Grid2x2Check size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Generate Macros{" "}
              <DropdownMenuShortcut>
                <Columns3Cog size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Generate Visualization{" "}
              <DropdownMenuShortcut>
                <ChartColumnDecreasing size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <div className="text-right">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete
              <DropdownMenuShortcut>
                <Trash2 size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Download
              <DropdownMenuShortcut>
                <Download size={16} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
