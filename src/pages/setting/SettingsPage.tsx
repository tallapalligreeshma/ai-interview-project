import { 
    User, 
    Bell, 
    Shield, 
    Moon, 
    Trash2, 
    Save, 
    Camera, 
    ChevronRight,
    MapPin,
    Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";

const SettingsPage = () => {
    return (
        <div className="flex flex-col gap-10 p-4 lg:p-8 max-w-[1600px] mx-auto w-full animate-in fade-in duration-500 pb-20">
            <div className="space-y-2">
                <h2 className="text-4xl font-black text-neutral-900 dark:text-white tracking-tight">System <span className="text-primary">Settings</span></h2>
                <p className="text-neutral-500 font-medium font-medium">Manage your professional profile and application preferences.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* Left Side: Profile & Preferences */}
                <div className="xl:col-span-8 space-y-8">
                    
                    {/* PROFILE MANAGEMENT */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-neutral-50 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-800/20">
                             <h3 className="text-lg font-black text-neutral-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <User size={20} className="text-primary" /> Personal Profile
                             </h3>
                        </div>
                        <CardContent className="p-10 space-y-10">
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="relative group">
                                    <Avatar className="h-40 w-40 border-4 border-neutral-100 dark:border-slate-800 shadow-2xl">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>RT</AvatarFallback>
                                    </Avatar>
                                    <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                                        <Camera size={18} />
                                    </button>
                                </div>
                                <div className="flex-1 space-y-6 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Full Name</label>
                                            <Input defaultValue="Rohit Tallapalli" className="h-12 rounded-2xl bg-neutral-50 dark:bg-slate-800 border-none shadow-inner" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Email Address</label>
                                            <Input defaultValue="rohit@example.com" className="h-12 rounded-2xl bg-neutral-50 dark:bg-slate-800 border-none shadow-inner" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Location</label>
                                            <div className="relative">
                                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                                <Input defaultValue="Hyderabad, India" className="h-12 pl-12 rounded-2xl bg-neutral-50 dark:bg-slate-800 border-none shadow-inner" />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest px-1">Experience Level</label>
                                            <Select defaultValue="senior">
                                                <SelectTrigger className="h-12 rounded-2xl bg-neutral-50 dark:bg-slate-800 border-none shadow-inner">
                                                    <SelectValue placeholder="Select level" />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-2xl border-neutral-100 dark:border-slate-800 shadow-2xl">
                                                    <SelectItem value="fresher">Fresher (Student)</SelectItem>
                                                    <SelectItem value="junior">Junior (1-2 Years)</SelectItem>
                                                    <SelectItem value="mid">Mid-Level (3-5 Years)</SelectItem>
                                                    <SelectItem value="senior">Senior (6+ Years)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ROLE PREFERENCES */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-neutral-50 dark:border-slate-800">
                             <h3 className="text-lg font-black text-neutral-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <Briefcase size={20} className="text-primary" /> Target Roles
                             </h3>
                        </div>
                        <CardContent className="p-10 space-y-6">
                            <p className="text-xs font-bold text-neutral-400 leading-relaxed uppercase tracking-widest">Select the roles you are primarily targeting for tailored interview questions.</p>
                            <div className="flex flex-wrap gap-3">
                                {["Java Developer", "Frontend Expert", "DevOps Engineer", "QA Tester", "Data Analyst"].map((role) => (
                                    <Badge key={role} className="h-12 px-6 rounded-2xl bg-primary/10 text-primary border-0 font-black uppercase tracking-widest text-[10px] cursor-pointer hover:bg-primary hover:text-white transition-all">
                                        {role}
                                    </Badge>
                                ))}
                                <Button variant="outline" className="h-12 px-6 rounded-2xl border-dashed border-2 border-neutral-200 dark:border-slate-700 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
                                    + Add New Role
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Security & Toggles */}
                <div className="xl:col-span-4 space-y-8">
                    
                    {/* APP PREFERENCES */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-neutral-50 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-800/20">
                             <h3 className="text-lg font-black text-neutral-800 dark:text-white uppercase tracking-widest">Interface</h3>
                        </div>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500"><Moon size={20} /></div>
                                    <span className="text-sm font-black text-neutral-700 dark:text-slate-300 uppercase tracking-widest">Dark Mode</span>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500"><Bell size={20} /></div>
                                    <span className="text-sm font-black text-neutral-700 dark:text-slate-300 uppercase tracking-widest">Notifications</span>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>

                    {/* SECURITY & DATA */}
                    <Card className="bg-white dark:bg-slate-900 border-neutral-100 dark:border-slate-800 rounded-[3rem] shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-neutral-50 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-800/20">
                             <h3 className="text-lg font-black text-neutral-800 dark:text-white uppercase tracking-widest">Privacy</h3>
                        </div>
                        <CardContent className="p-8 space-y-4">
                            <Button variant="ghost" className="w-full h-14 justify-between rounded-2xl bg-neutral-50 dark:bg-slate-800 hover:bg-neutral-100 font-black uppercase tracking-widest text-[10px] text-neutral-600 px-6 group transition-all">
                                <div className="flex items-center gap-4">
                                    <Shield size={18} className="text-neutral-400 group-hover:text-primary" />
                                    Change Password
                                </div>
                                <ChevronRight size={16} />
                            </Button>
                            
                            <Button variant="ghost" className="w-full h-14 justify-between rounded-2xl bg-rose-500/5 hover:bg-rose-500/10 font-black uppercase tracking-widest text-[10px] text-rose-500 px-6 group transition-all">
                                <div className="flex items-center gap-4">
                                    <Trash2 size={18} />
                                    Clear History
                                </div>
                            </Button>
                        </CardContent>
                    </Card>

                    <Button className="w-full h-20 rounded-[2.5rem] bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-sm gap-3 shadow-2xl shadow-primary/30">
                        <Save size={24} /> Save Transitions
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;
