"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, User, Code, Mail, Users, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/skills", label: "Skills", icon: User },
  { href: "/projects", label: "Projects", icon: Code },
  { href: "/leadership", label: "Leadership", icon: Users },
];

export function MobileNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href} className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
        
        <Button variant="outline" asChild className="ml-2">
          <Link href="mailto:daao165@gmail.com">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Link>
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/40">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button 
                  key={item.href} 
                  variant="ghost" 
                  asChild 
                  className="w-full justify-start"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link href={item.href} className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
            
            <Button 
              variant="outline" 
              asChild 
              className="w-full justify-start mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link href="mailto:daao165@gmail.com" className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
} 