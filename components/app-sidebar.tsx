"use client"

import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  ChartColumn,
  Building2,
  Users,
  FileText,
  ArrowDownCircle,
  ArrowUpCircle,
  List,
  LayoutList,
  ArrowLeftRight,
  ClipboardMinus
} from "lucide-react"

export function AppSidebar() {
    const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader >
        {state === "expanded" && (
          <>
            <h1 className="text-lg font-semibold">Sistema de Gestão</h1>
            <p className="text-sm font-medium text-muted-foreground">
              Gestão de Imóveis
            </p>
          </>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Visão geral</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Analytics">
                <Link href="/analytics" className="flex items-center gap-2">
                  <ChartColumn />
                  <span>Analytics</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Cadastro</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Imóveis">
                <Link href="/properties" className="flex items-center gap-2">
                  <Building2 />
                  <span>Imóveis</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Inquilinos">
                <Link href="/tenants" className="flex items-center gap-2">
                  <Users />
                  <span>Inquilinos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Contratos">
                <Link href="/contracts" className="flex items-center gap-2">
                  <FileText />
                  <span>Contratos</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Financeiro</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="A receber">
                <Link href="/finance/receivables" className="flex items-center gap-2">
                  <ArrowDownCircle />
                  <span>A receber</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="A pagar">
                <Link href="/finance/payables" className="flex items-center gap-2">
                  <ArrowUpCircle />
                  <span>A pagar</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Extrato">
                <Link href="/finance" className="flex items-center gap-2">
                  <List />
                  <span>Extrato</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Plano de Contas">
                <Link href="/finance/accounts" className="flex items-center gap-2">
                  <LayoutList />
                  <span>Plano de Contas</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Relatórios</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="A receber">
                <Link href="/finance/receivables" className="flex items-center gap-2">
                  <ClipboardMinus />
                  <span>DRE</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="A pagar">
                <Link href="/finance/payables" className="flex items-center gap-2">
                  <ArrowLeftRight />
                  <span>DFC</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}