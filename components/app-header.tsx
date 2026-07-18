"use cliente"

import {SidebarTrigger} from "@/components/ui/sidebar"

interface AppHeaderProps{
    title: string
    subtitle?: string
    actions?: React.ReactNode
}

export default function AppHeader({title, subtitle, actions}: AppHeaderProps){
    return (
        <header className="flex h-16 w-full items-center border-b px-4 gap-3">
            <SidebarTrigger />
            <div className="flex items-center justify-between flex-1">
                <div>
                    <h1 className="font-semibold text-sm">{title}</h1>
                    {subtitle && ( <p className="text-sm text-muted-foreground">{subtitle}</p> )}
                </div>

                {actions && (
                    <div className="flex items-center gap-2">
                        {actions}
                    </div>
                )}
            </div>
        </header>
    )
}