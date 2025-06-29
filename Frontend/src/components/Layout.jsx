import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import TopNavbar from "@/components/TopNavbar";

const Layout = ({ children, showSidebar = true }) => {
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted dark:bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopNavbar />
          <main className="flex-1 p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Layout;