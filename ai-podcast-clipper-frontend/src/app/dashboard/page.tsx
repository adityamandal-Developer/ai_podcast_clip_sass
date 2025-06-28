"use server";
import { redirect } from "next/navigation";
import React from "react";
import DashboardClient from "~/components/dashboard-client";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("login");
  }

  const userData = await db.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: {
      uploadedFiles: {
        where: {
          uploaded: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          s3Key: true,
          displayName: true,
          status: true,
          createdAt: true,
          _count: {
            select: {
              clips: true,
            },
          },
        },
      },
      clips: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const formatedFiles = userData?.uploadedFiles.map((file) => ({
    id: file.id,
    s3Key: file.s3Key,
    fileName: file.displayName ?? "unknown filename",
    status: file.status,
    clipsCount: file._count.clips,
    createdAt: file.createdAt,
  }));

  return (
    <DashboardClient uploadedFiles={formatedFiles} clips={userData.clips} />
  );
};

export default DashboardPage;
