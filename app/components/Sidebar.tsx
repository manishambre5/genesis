import { BookPlus, ChartCandlestick, LibraryBig, Settings, UserPlus, Users } from "lucide-react";
import Link from "next/link";

export default function Sidebar({currentPath = '/dashboard'}: {currentPath: string}){
    const navigation = [
        {name: "Dashboard", href: "/dashboard", icon: <ChartCandlestick />},
        {name: "Shelf", href: "/shelf", icon: <LibraryBig />},
        {name: "Club", href: "/club", icon: <Users />},
        {name: "Add Book", href: "/add-book", icon: <BookPlus />},
        {name: "Add Member", href: "/add-member", icon: <UserPlus />},
        {name: "Settings", href: "/settings", icon: <Settings />},
    ]

    return <div className="sticky left-0 top-16 bg-white box-border border-r border-stone-300 min-h-full h-[calc(100vh-4rem)] py-4 pl-4 pr-0 z-10 min-w-56">
        <nav className="space-y-2">
            <div className="text-sm font-semibold text-stone-600 uppercase">
                Quick Actions
            </div>
            {navigation.map((item,key) => {
                const isActive = currentPath === item.href;
                return (
                    <Link href={item.href} key={key} className={`flex items-center rounded-l-sm space-x-3 p-2 border border-stone-300 -mr-px transition-all hover:text-stone-900 ${isActive ? "text-stone-900 bg-white border-r-white" : "text-stone-600 border-r-stone-300 bg-stone-50"}`}>
                        {item.icon}
                        <span>{item.name}</span>
                    </Link>
                );
            })}
        </nav>

        <section className="absolute bottom-0 left-0 p-2 border-t border-stone-300 w-full">
            <div className="flex items-center justify-center w-full">
                sidebar footer
            </div>
        </section>
    </div>
}