
import { default as NotificationImg1, default as NotificationImg2 } from "@/assets/images/notification/profile-4.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Bell, CircleCheck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="rounded-[50%] sm:w-10 sm:h-10 w-8 h-8 focus-visible:ring-0 border-0 cursor-pointer transition-all duration-300 bg-[#6366F1]/20 hover:bg-[#6366F1]/30 text-[#22D3EE] shadow-[0_0_10px_rgba(99,102,241,0.2)]"
        >
          <Bell className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:w-[400px] max-h-[unset] me-6 p-0 rounded-2xl overflow-hidden shadow-2xl block border transition-all duration-300 bg-[#111827]/90 backdrop-blur-2xl border-[#6366F1]/30 text-white">
        <div className="">
          <div className="py-3 px-4 rounded-lg m-4 flex items-center justify-between gap-2 border bg-[#6366F1]/10 border-[#6366F1]/20">
            <h6 className="text-lg font-semibold mb-0 text-white">
              Notifications
            </h6>
            <span className="sm:w-10 sm:h-10 w-8 h-8 font-bold flex justify-center items-center rounded-full shadow-sm bg-[#6366F1]/30 text-[#22D3EE]">
              05
            </span>
          </div>
          <div className="scroll-sm !border-t-0">
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin">
              <Link
                to="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 relative w-11 h-11 bg-green-200 dark:bg-green-600 text-green flex justify-center items-center rounded-full">
                    <CircleCheck />
                  </div>
                  <div>
                    <h6 className="text-sm fw-semibold mb-1">
                      Congratulations
                    </h6>
                    <p className="mb-0 text-sm line-clamp-1">
                      Your profile has been Verified. Your profile has been
                      Verified
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-300">
                    23 Mins ago
                  </span>
                </div>
              </Link>
              <Link
                to="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 relative">
                    <img
                      src={NotificationImg1}
                      className="rounded-[50%]"
                      width={40}
                      height={40}
                      alt="User Image"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm fw-semibold mb-1">Robiul Hasan</h6>
                    <p className="mb-0 text-sm line-clamp-1">
                      You can stitch between art boards
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-300">
                    23 Mins ago
                  </span>
                </div>
              </Link>
              <Link
                to="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 relative w-11 h-11 bg-blue-100 dark:bg-primary/25 text-primary flex justify-center items-center rounded-full">
                    AM
                  </div>
                  <div>
                    <h6 className="text-sm fw-semibold mb-1">Arlene McCoy</h6>
                    <p className="mb-0 text-sm line-clamp-1">
                      Invite you to prototyping
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-300">
                    23 Mins ago
                  </span>
                </div>
              </Link>
              <Link
                to="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 relative">
                    <img
                      src={NotificationImg2}
                      className="rounded-[50%]"
                      width={40}
                      height={40}
                      alt="User Image"
                    />
                  </div>
                  <div>
                    <h6 className="text-sm fw-semibold mb-1">Annette Black</h6>
                    <p className="mb-0 text-sm line-clamp-1">
                      Invite you to prototyping
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-300">
                    23 Mins ago
                  </span>
                </div>
              </Link>
              <Link
                to="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 justify-between gap-1"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 relative w-11 h-11 bg-blue-100 dark:bg-primary/25 text-primary flex justify-center items-center rounded-full">
                    DR
                  </div>
                  <div>
                    <h6 className="text-sm fw-semibold mb-1">
                      Darlene Robertson
                    </h6>
                    <p className="mb-0 text-sm line-clamp-1">
                      Invite you to prototyping
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className="text-sm text-neutral-500 dark:text-neutral-300">
                    23 Mins ago
                  </span>
                </div>
              </Link>
            </div>

            <div className="text-center py-3 px-4">
              <Link
                to="#"
                className="text-primary dark:text-primary font-semibold hover:underline text-center"
              >
                See All Message{" "}
              </Link>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
