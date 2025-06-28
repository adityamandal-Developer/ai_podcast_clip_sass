import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import type { Uploaded_file } from "./dashboard-client";
import { cn } from "~/lib/utils";

type props = {
  uploadedFiles: Uploaded_file[];
};
const UploadedFilesTable = ({ uploadedFiles }: props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">File name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Clips generated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uploadedFiles.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">{file.fileName}</TableCell>
            <TableCell
              className={cn(file.status === "failed" ? "text-destructive" : "")}
            >
              {file.status}
            </TableCell>
            <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
            <TableCell className="text-right">
              {file.clipsCount > 0 ? file.clipsCount : "No clips yet"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UploadedFilesTable;
