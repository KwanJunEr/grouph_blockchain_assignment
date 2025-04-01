import React from "react";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/actions/login";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Dashboard = async () => {
  if (!(await isLoggedIn())) {
    redirect("/");
  }
  return (
    <main className="px-5 py-5 min-h-screen">
      <div className="flex flex-row gap-5">
        {/*Left Column*/}
        <div className="min-w-[900px] bg-red-50 px-2 py-2">
            <div className="flex flex-col">
                {/*Introduction*/}
                <div className="flex flex-row justify-between py-2">
                    <h1 className="text-2xl font-extrabold tracking-tighter">Welcome, Kwan</h1>
                    <Button>Edit Profile</Button>
                </div>
                <hr className="my-2 h-3 font-bold"/>
                {/*User Profile*/}
                <div className="flex flex-row">
                    {/*User Picture*/}
                    <div >
                        <Image
                        src={"/userprofilepicture.png"}
                        alt = ""
                        width={300}
                        height={400}
                        className="border border-black rounded-md"
                        />
                    </div>
                    {/*User Details*/}
                    <div className="grid grid-cols-3">
                        {/*Basic Details*/}
                        <div>

                        </div>
                        {/*Medical Details*/}
                        <div>
                        
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/*Left Column*/}
        <div className="min-w-[570px] bg-red-400 px-3 py-3">
          <div className="flex flex-col space-y-6">
                {/*Health Insights Card*/}
                <div>


                </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
