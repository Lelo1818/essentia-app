import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { AppLogo } from "@/components/ui/app-logo";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  badge?: string | number;
  external?: boolean;
}

export function NavLink({ href, children, icon: Icon, badge, external = false }: NavLinkProps) {
  const [location] = useLocation();
  const isActive = location === href;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-gray-100 hover:shadow-md transform hover:scale-105",
          "text-gray-700 hover:text-gray-900"
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
        {badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </a>
    );
  }

  return (
    <Link href={href}>
      <a
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-gray-100 hover:shadow-md transform hover:scale-105",
          isActive 
            ? "bg-blue-100 text-blue-700 shadow-md" 
            : "text-gray-700 hover:text-gray-900"
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
        {badge && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </a>
    </Link>
  );
}

export function AppNavLink({ 
  app, 
  href, 
  children, 
  description 
}: { 
  app: "flow" | "edu" | "purpose";
  href: string;
  children: React.ReactNode;
  description?: string;
}) {
  const [location] = useLocation();
  const isActive = location.startsWith(href);

  return (
    <Link href={href}>
      <a
        className={cn(
          "flex items-center space-x-3 p-4 rounded-lg transition-all duration-200",
          "hover:shadow-lg transform hover:scale-105 border",
          isActive 
            ? "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-md" 
            : "bg-white hover:bg-gray-50 border-gray-200"
        )}
      >
        <AppLogo app={app} size="md" />
        <div className="flex-1">
          <div className="font-medium text-gray-900">{children}</div>
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}
        </div>
      </a>
    </Link>
  );
}

export function BreadcrumbNav({ 
  items 
}: { 
  items: Array<{ label: string; href?: string }> 
}) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && <span>/</span>}
          {item.href ? (
            <Link href={item.href}>
              <a className="hover:text-blue-600 transition-colors duration-200 hover:underline">
                {item.label}
              </a>
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}