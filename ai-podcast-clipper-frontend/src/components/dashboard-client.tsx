"use client";
import type { Clip, UploadedFile } from "@prisma/client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Uploaded_file = Pick<
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
        <h1>Upload Your podcast and get AI generated clips</h1>
      </div>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">upload</TabsTrigger>
          <TabsTrigger value="my-clips">CLips</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload your podcast</CardTitle>
              <CardDescription>
                Upload your podcast to generate clips
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-clips">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardClient;
