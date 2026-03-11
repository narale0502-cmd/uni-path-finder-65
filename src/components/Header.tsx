import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Trang chủ", href: "/#hero" },
  { label: "Giới thiệu", href: "/#about" },
  { label: "Lộ trình", href: "/diagram" },
  { label: "Sự kiện", href: "/events" },
  { label: "Bảng giá", href: "/billing" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => handleNav("/#hero")} className="font-heading text-xl font-bold gradient-text">
          UniPath
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4 text-muted-foreground" />
          </button>
          <Link to="/profile">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">
              <User className="w-4 h-4 text-muted-foreground" />
            </button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="gradient-blue text-primary-foreground border-0 rounded-lg">
              Đăng nhập
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-6 py-3">
              <input
                autoFocus
                placeholder="Tìm kiếm môn học, sự kiện..."
                className="w-full bg-muted rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className="text-left px-4 py-3 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 mt-2 px-4">
                <Link to="/login" className="flex-1">
                  <Button className="w-full gradient-blue text-primary-foreground border-0" size="sm">
                    Đăng nhập
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
