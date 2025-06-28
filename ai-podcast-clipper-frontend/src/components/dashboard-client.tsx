"use client";
import type { Clip, UploadedFile } from "@prisma/client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";
import { Loader2, UploadCloud } from "lucide-react";
import { Button } from "./ui/button";
import { generateUploadUrl } from "~/actions/s3";
import { toast } from "sonner";
import { processVideo } from "~/actions/generation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DisplayClips from "./display-clips";

const UploadedFilesTable = dynamic(() => import("./uploaded-files-table"), {
  ssr: false,
});

export type Uploaded_file = Pick<
  UploadedFile,
  "id" | "s3Key" | "createdAt" | "status"
> & {
  fileName: string;
  clipsCount: number;
};

type Props = {
  uploadedFiles: Uploaded_file[];
  clips: Clip[];
};

const DashboardClient = ({ uploadedFiles, clips }: Props) => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col space-y-6 px-4 py-8">
      <div>
        <h1 className="font-mono text-xl">
          Upload Your podcast and get AI generated clips
        </h1>
      </div>
      <Tabs defaultValue="upload">
        <TabsList className="px-4 py-6">
          <TabsTrigger className="p-4" value="upload">
            Upload
          </TabsTrigger>
          <TabsTrigger className="p-4" value="my-clips">
            Clips
          </TabsTrigger>
        </TabsList>

        <Upload uploadedFiles={uploadedFiles} />
        <ShowClips clip={clips} />
      </Tabs>
    </div>
  );
};

export default DashboardClient;

const ShowClips = ({ clip }: { clip: Clip[] }) => {
  return (
    <TabsContent value="my-clips">
      <Card>
        <CardHeader>
          <CardTitle>My clips</CardTitle>
          <CardDescription>
            View your generated clips here, clip processing may take time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DisplayClips clips={clip} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const Upload = ({ uploadedFiles }: { uploadedFiles: Uploaded_file[] }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = () => {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 3000);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    console.log("here outside");
    if (files.length === 0) {
      toast.warning("Please upload a file first", {
        position: "top-center",
        duration: 5000,
        description:
          "click to browse or drag and drop your file to upload below",
      });
      return;
    }
    console.log("here inside");
    const file = files[0];
    setUploading(true);

    try {
      const { success, signedUrl, uploadedFileId } = await generateUploadUrl({
        filename: file!.name,
        contentType: file!.type,
      });

      if (!success) {
        throw new Error("Failed to get upload URL");
      }

      console.log("success", success);
      console.log("signedUrl", signedUrl);
      console.log("uploadedFileId", uploadedFileId);
      const uploadedRespose = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file!.type,
        },
      });
      console.log("uploaded respose: ", uploadedRespose);
      if (!uploadedRespose.ok)
        throw new Error(
          `Upload failed with status:  ${uploadedRespose.status}`,
        );

      await processVideo(uploadedFileId);
      setFiles([]);
      toast.success("Video uploaded successfully", {
        description: "Video is scheduled for processing, please wait",
        duration: 5000,
      });
    } catch {
      toast.error("Upload failed", {
        description:
          "Ops! something went wrong while uploading your video, please try again later after some time, or contact us",
        duration: 7000,
      });
    } finally {
      setUploading(false);
    }
  };

  console.log("uploading - ", uploading);
  return (
    <TabsContent value="upload">
      <Card>
        <CardHeader>
          <CardTitle>Upload your podcast</CardTitle>
          <CardDescription>
            Upload your podcast to generate clips
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone
            dropZoneClassName=""
            onDrop={handleDrop}
            accept={{ "video/mp4": [".mp4"] }}
            maxSize={500 * 1024 * 1024}
            disabled={uploading}
            maxFiles={1}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {(dropzone: DropzoneState) => (
              <>
                <div className="flex flex-col items-center justify-center gap-2 space-x-5 p-8">
                  {uploading ? (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Loader2 className="h-8 w-8 animate-spin" />
                      Your video is uploading, please wait, this may take a
                      while
                    </div>
                  ) : (
                    <>
                      <UploadCloud />
                      <p>
                        Drag and drop your file here or click browse (upto 500
                        mb of mp4 file)
                      </p>
                    </>
                  )}
                </div>
              </>
            )}
          </Dropzone>

          <div className="mt-2 mb-2 flex items-start justify-between border-b pb-4">
            <div>
              {files.length > 0 && (
                <div className="space-y-1 text-sm">
                  <p className="font-medium">Selected file:</p>
                  {files.map((file) => (
                    <p key={file.name} className="text-muted-foreground">
                      {file.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <Button disabled={uploading} onClick={handleUpload}>
              {uploading ? (
                <>
                  Uploading, this may take a while{" "}
                  <Loader2 className="animate-spin" />
                </>
              ) : (
                "Upload and generate clips"
              )}
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="pt-10">
              <div className="mb-2 flex items-center justify-between">
                <CardTitle>Queue status</CardTitle>
                <Button
                  variant={"outline"}
                  className=""
                  disabled={refreshing}
                  onClick={handleRefresh}
                >
                  {refreshing ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Refresh"
                  )}
                </Button>
              </div>

              <div className="radius max-h-[300px] overflow-auto">
                <UploadedFilesTable uploadedFiles={uploadedFiles} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};
