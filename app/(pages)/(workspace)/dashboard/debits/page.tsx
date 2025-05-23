"use client"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb"
import { Loader } from "@/app/components/ui/loader"
import { Separator } from "@/app/components/ui/separator"
import {
  SidebarTrigger,
} from "@/app/components/ui/sidebar"
import { Skeleton } from "@/app/components/ui/skeleton"
import WorkspaceSelector from "@/app/components/workspace-selector"
import { useWorkspace } from "@/app/hooks/use-workspace"
import { getDebits } from "@/app/http/debits/get-debits"
import { Debit } from "@/app/types/financial"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { DataTable } from "./data-table"
import { columns } from "./columns"

function LoadPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8 p-4 h-96">
      <div>
          <div
            className="flex flex-col items-center justify-center gap-2 p-4"
          >
            <Loader size="lg" text="Carregando" />
            <span className="text-muted-foreground text-sm">Carregando</span>
          </div>
      </div>
    </div>
  )
}

export default function Page() {
  const { workspaceActive, isLoading: isWorkspaceLoading, error: workspaceError } = useWorkspace()

  const { data: debits, isLoading: isDebitsLoading } = useQuery<Debit[], Error>({
    queryKey: ['debits', workspaceActive?.id],
    queryFn: () => getDebits(workspaceActive!.id),
    staleTime: 1000 * 60 * 5,
    enabled: !!workspaceActive && !isWorkspaceLoading && !workspaceError,
  })

  return (
    <>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {isWorkspaceLoading || !workspaceActive  &&  (
                      <Skeleton className="h-5 w-48" />
                    )}
                    {isWorkspaceLoading &&  (
                      <Skeleton className="h-5 w-48" />
                    )}
                    <WorkspaceSelector />
                  </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <Link href="#">
                    Dashboard
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    Despesas
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min p-4">
            {isWorkspaceLoading || !workspaceActive  &&  (
              <LoadPage />
            )}
            {isWorkspaceLoading &&  (
              <LoadPage />
            )}
            {isDebitsLoading && (
              <LoadPage />
            )}
            {debits && (
              <DataTable columns={columns} data={debits} />
            )}
          </div>
        </div>
    </>
  )
}
