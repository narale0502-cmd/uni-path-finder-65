import { useState } from "react";
import { motion } from "framer-motion";
import { User, BookOpen, Settings, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<"info" | "progress" | "settings">("info");
  const [name, setName] = useState("Nguyễn Văn A");
  const [phone, setPhone] = useState("0901234567");
  const [email, setEmail] = useState("nguyenvana@email.com");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const tabs = [
    { id: "info" as const, label: "Thông tin", icon: User },
    { id: "progress" as const, label: "Tiến độ", icon: BookOpen },
    { id: "settings" as const, label: "Cài đặt", icon: Settings },
  ];

  const progress = [
    { subject: "Nhập môn lập trình", percent: 100 },
    { subject: "Cấu trúc dữ liệu", percent: 75 },
    { subject: "Cơ sở dữ liệu", percent: 40 },
    { subject: "Lập trình Web", percent: 10 },
  ];

  const applyTheme = (t: "dark" | "light") => {
    setTheme(t);
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Profile Header */}
          <motion.div
            className="glass rounded-2xl p-8 mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full gradient-blue flex items-center justify-center text-2xl font-bold text-primary-foreground mx-auto mb-4">
              NA
            </div>
            <h2 className="font-heading text-xl font-bold">{name}</h2>
            <p className="text-sm text-muted-foreground">Công nghệ phần mềm • FPT University</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id ? "gradient-blue text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activeTab === "info" && (
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-lg font-semibold mb-6">Thông tin cá nhân</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Họ và tên</label>
                    <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Số điện thoại</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-muted rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button className="gradient-blue text-primary-foreground border-0 rounded-xl"><Save className="w-4 h-4 mr-2" /> Lưu</Button>
                    <Button variant="outline" className="rounded-xl">Hủy</Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-lg font-semibold mb-6">Tiến độ lộ trình</h3>
                <div className="space-y-5">
                  {progress.map(p => (
                    <div key={p.subject}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{p.subject}</span>
                        <span className="text-muted-foreground">{p.percent}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full gradient-blue rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${p.percent}%` }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="glass rounded-2xl p-8">
                <h3 className="font-heading text-lg font-semibold mb-6">Cài đặt giao diện</h3>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Chọn giao diện</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => applyTheme("dark")}
                      className={`flex-1 rounded-xl p-4 border-2 transition-all ${theme === "dark" ? "border-accent" : "border-border"}`}
                    >
                      <div className="w-full h-16 rounded-lg bg-[hsl(222,47%,6%)] mb-2" />
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button
                      onClick={() => applyTheme("light")}
                      className={`flex-1 rounded-xl p-4 border-2 transition-all ${theme === "light" ? "border-accent" : "border-border"}`}
                    >
                      <div className="w-full h-16 rounded-lg bg-[hsl(0,0%,98%)] border border-border mb-2" />
                      <p className="text-sm font-medium">Light</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
