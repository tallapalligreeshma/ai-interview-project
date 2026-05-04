import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";


import UserImg1 from "@/assets/images/users/user1.png";
import UserImg2 from "@/assets/images/users/user2.png";
import UserImg3 from "@/assets/images/users/user3.png";
import UserImg4 from "@/assets/images/users/user4.png";
import UserImg5 from "@/assets/images/users/user5.png";

interface TransactionsDataType {
  name: string;
  email: string;
  image: string;
  registered: string;
  plan: string;
  status: "Active" | "Inactive";
  statusVariant:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning"
    | "info"
    | "danger";
}

const users: TransactionsDataType[] = [
  {
    name: "Dianne Russell",
    email: "redaniel@gmail.com",
    image: UserImg1,
    registered: "27 Mar 2024",
    plan: "Free",
    statusVariant: "success",
    status: "Active",
  },
  {
    name: "Wade Warren",
    email: "xterris@gmail.com",
    image: UserImg2,
    registered: "27 Mar 2024",
    plan: "Basic",
    statusVariant: "danger",
    status: "Inactive",
  },
  {
    name: "Albert Flores",
    email: "seannand@mail.ru",
    image: UserImg3,
    registered: "27 Mar 2024",
    plan: "Standard",
    statusVariant: "success",
    status: "Active",
  },
  {
    name: "Bessie Cooper",
    email: "igerrin@gmail.com",
    image: UserImg4,
    registered: "27 Mar 2024",
    plan: "Business",
    statusVariant: "danger",
    status: "Inactive",
  },
  {
    name: "Arlene McCoy",
    email: "fellora@mail.ru",
    image: UserImg5,
    registered: "27 Mar 2024",
    plan: "Enterprise",
    statusVariant: "success",
    status: "Active",
  },
  {
    name: "Bessie Cooper",
    email: "igerrin@gmail.com",
    image: UserImg4,
    registered: "27 Mar 2024",
    plan: "Business",
    statusVariant: "danger",
    status: "Inactive",
  },
  {
    name: "Arlene McCoy",
    email: "fellora@mail.ru",
    image: UserImg5,
    registered: "27 Mar 2024",
    plan: "Enterprise",
    statusVariant: "success",
    status: "Active",
  },
  {
    name: "Albert Flores",
    email: "seannand@mail.ru",
    image: UserImg3,
    registered: "27 Mar 2024",
    plan: "Standard",
    statusVariant: "success",
    status: "Active",
  },
  {
    name: "Bessie Cooper",
    email: "igerrin@gmail.com",
    image: UserImg4,
    registered: "27 Mar 2024",
    plan: "Business",
    statusVariant: "danger",
    status: "Inactive",
  },
  {
    name: "Dianne Russell",
    email: "redaniel@gmail.com",
    image: UserImg1,
    registered: "27 Mar 2024",
    plan: "Free",
    statusVariant: "success",
    status: "Active",
  },
];


const LatestRegisteredTable = () => {
  const slicedUsers = users.slice(0, 5);

  return (
    <div className="w-full overflow-auto">
      <Table className="w-full text-start border-collapse">
        <TableHeader>
          <TableRow className="border-0 bg-white/[0.03] hover:bg-white/[0.05] smooth-transition">
            <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-8 py-5 text-start border-b border-white/5">
              Candidate Sync
            </TableHead>
            <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-8 py-5 text-start border-b border-white/5">
              Intelligence Date
            </TableHead>
            <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-8 py-5 text-start border-b border-white/5">
              Access Tier
            </TableHead>
            <TableHead className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-8 py-5 text-start border-b border-white/5">
              Neural Status
            </TableHead>
          </TableRow>
        </TableHeader>

      <TableBody>
        {slicedUsers.map((user, index) => {
          const isLastRow = index === slicedUsers.length - 1;
            return (
              <TableRow key={index} className="border-0 hover:bg-white/[0.03] transition-colors group">
                <TableCell
                  className={`py-5 px-8 border-b border-white/5 align-middle ${
                    isLastRow ? "border-b-0" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-xl shrink-0 overflow-hidden object-cover border border-white/10 group-hover:scale-110 smooth-transition"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0B0F1A] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    </div>
                    <div>
                      <h6 className="text-[14px] font-bold text-white mb-1 tracking-tight group-hover:text-[#22D3EE] smooth-transition">{user.name}</h6>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block leading-none">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell
                  className={`py-5 px-8 border-b border-white/5 text-[11px] font-black text-slate-400 uppercase tracking-widest align-middle ${
                    isLastRow ? "border-b-0" : ""
                  }`}
                >
                  {user.registered}
                </TableCell>
                <TableCell
                  className={`py-5 px-8 border-b border-white/5 text-[11px] font-black text-[#6366F1] uppercase tracking-widest align-middle ${
                    isLastRow ? "border-b-0" : ""
                  }`}
                >
                  {user.plan}
                </TableCell>
                <TableCell
                  className={`py-5 px-8 border-b border-white/5 align-middle ${
                    isLastRow ? "border-b-0" : ""
                  }`}
                >
                  <Badge variant={user.statusVariant} className="rounded-lg px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] shadow-inner">
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
        })}
      </TableBody>
      </Table>
    </div>
  );
};

export default LatestRegisteredTable;
