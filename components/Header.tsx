"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "@/actions/login";
import { sepolia } from "thirdweb/chains";
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const pathName = usePathname();
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
        {loggedIn && (
            <div className="flex items-center space-x-6 text-[16px]">
            <Link href="/dashboard" className={`text-sm font-medium transition-colors hover:text-primary ${pathName === '/dashboard' ? 'underline underline-offset-4 ' : ''}`}>
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors hover:text-primary">
                Medical Records
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link href="//history">Medical Records</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/medical-records/vaccinations">Vaccination Records</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
{/* 
            <Link href="/booking" className={`text-sm font-medium transition-colors hover:text-primary ${pathName === '/booking' ? 'underline text-underline-offset-2 ' : ''}`}>
              Appointments
            </Link> */}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors hover:text-primary">
                Tools
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild>
                  <Link href="/tools/insurance">Insurance</Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem asChild>
                  <Link href="/tools/medicine">Medicine</Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem asChild>
                  <Link href="/tools/claims">Insurance Claims</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
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
                localStorage.setItem("userAddress", address);
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
                localStorage.removeItem("userAddress");
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
