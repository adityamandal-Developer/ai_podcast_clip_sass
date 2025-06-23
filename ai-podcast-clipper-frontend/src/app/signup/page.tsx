"use server";

import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

const page = async () => {
  const session = await auth();

  if (session) {
    redirect("/dashoard");
  }
  return <div>SignUp</div>;
};

export default page;
