"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/actions/login";
import { sepolia } from "thirdweb/chains";

const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  // Ensure login state is checked on component mount
  useEffect(() => {
    const checkLogin = async () => {
      const userLoggedIn = await isLoggedIn();
      setLoggedIn(userLoggedIn);
    };
    checkLogin();
  }, []);

  return (
    <header
      className={`${
        loggedIn ? "sticky headerImage" : "absolute bg-transparent"
      } top-0 left-0 w-full px-5 py-6 z-50 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-row space-x-5">
          <Image src="/Union.png" width={15} height={15} alt="logo" />
          <h2 className="text-xl text-white font-extrabold">HealthSync</h2>
        </div>
        <div>
          <ConnectButton
            connectButton={{
              label: "Sign in",
            }}
            chain={sepolia}
            client={client}
            auth={{
              isLoggedIn: async (address) => {
                console.log("checking if logged in!", { address });
                return await isLoggedIn();
              },
              doLogin: async (params) => {
                console.log("logging in!");
                await login(params);
                setLoggedIn(true); // Update state
                router.push("/dashboard");
              },
              getLoginPayload: async ({ address }) =>
                generatePayload({ address }),
              doLogout: async () => {
                console.log("logging out!");
                await logout();
                setLoggedIn(false);
                router.push("/");
              },
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
