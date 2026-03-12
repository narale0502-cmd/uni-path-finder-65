import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, CreditCard, Map, ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RoadmapTree from "@/components/roadmap/RoadmapTree";
import SubjectDetailPanel from "@/components/roadmap/SubjectDetailPanel";
import { majors } from "@/data/roadmapData";
import type { Major, Subject } from "@/data/roadmapData";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"roadmap" | "profile">("roadmap");
  const [searchQuery, setSearchQuery] = useState("");

  // Roadmap state
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  // Get user info from sessionStorage
  const userEmail = sessionStorage.getItem("userEmail") || "user@unipath.edu";

  const filteredMajors = useMemo(() => {
    if (!searchQuery.trim()) return majors;
    const q = searchQuery.toLowerCase();
    return majors.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.tracks.some((t) => t.name.toLowerCase().includes(q)) ||
        m.subjects.some((s) => s.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredSubjects = useMemo(() => {
    if (!selectedMajor || !searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return selectedMajor.subjects.filter((s) => s.name.toLowerCase().includes(q));
  }, [selectedMajor, searchQuery]);

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading text-xl font-bold gradient-text">
            UniPath
          </button>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm ngành, môn học..."
              className="w-full bg-muted rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">{userEmail}</span>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted transition-colors">
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        {/* Sidebar */}
        <aside className="w-16 md:w-56 border-r border-border bg-card flex-shrink-0 fixed top-14 bottom-0 left-0 z-40">
          <nav className="flex flex-col gap-1 p-2 md:p-3 mt-2">
            {[
              { id: "roadmap" as const, icon: Map, label: "Lộ trình" },
              { id: "profile" as const, icon: User, label: "Hồ sơ & Billing" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === "roadmap") {
                    setSelectedMajor(null);
                    setActiveTrack(null);
                    setSelectedSubject(null);
                  }
                }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-16 md:ml-56 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "roadmap" && (
              <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {!selectedMajor ? (
                  <>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">Chọn lộ trình</h1>
                    <p className="text-muted-foreground text-sm mb-8">Chọn chuyên ngành để khám phá lộ trình học tập</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {filteredMajors.map((major, i) => (
                        <motion.button
                          key={major.id}
                          onClick={() => setSelectedMajor(major)}
                          className="glass rounded-2xl p-6 text-left hover:shadow-glow transition-all duration-500 group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <span className="text-3xl mb-3 block">{major.icon}</span>
                          <h3 className="font-heading text-base font-semibold mb-1.5 group-hover:text-accent transition-colors">
                            {major.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {major.subjects.length} môn • {major.tracks.length} định hướng
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {major.tracks.map((t) => (
                              <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                {t.icon} {t.name}
                              </span>
                            ))}
                          </div>
                        </motion.button>
                      ))}
                      {filteredMajors.length === 0 && (
                        <p className="text-muted-foreground col-span-full text-center py-12">
                          Không tìm thấy kết quả cho "{searchQuery}"
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <button onClick={() => { setSelectedMajor(null); setActiveTrack(null); setSelectedSubject(null); }} className="hover:text-foreground transition-colors">
                        Lộ trình
                      </button>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-foreground">{selectedMajor.name}</span>
                      {activeTrack && (
                        <>
                          <ChevronRight className="w-3 h-3" />
                          <span className="text-accent font-medium">
                            {selectedMajor.tracks.find((t) => t.id === activeTrack)?.name}
                          </span>
                        </>
                      )}
                    </div>

                    <Button variant="ghost" size="sm" className="mb-4" onClick={() => { setSelectedMajor(null); setActiveTrack(null); }}>
                      <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                    </Button>

                    {/* Major header + track pills */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">{selectedMajor.icon}</span>
                        <h2 className="font-heading text-xl font-bold">{selectedMajor.name}</h2>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setActiveTrack(null)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                            !activeTrack ? "bg-accent text-accent-foreground border-accent shadow-glow" : "bg-card border-border text-muted-foreground hover:border-accent/40"
                          }`}
                        >
                          Tất cả
                        </button>
                        {selectedMajor.tracks.map((track) => (
                          <button
                            key={track.id}
                            onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                              activeTrack === track.id
                                ? "bg-accent text-accent-foreground border-accent shadow-glow"
                                : "bg-card border-border text-muted-foreground hover:border-accent/40"
                            }`}
                          >
                            {track.icon} {track.name}
                          </button>
                        ))}
                      </div>
                      {activeTrack && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-muted-foreground mt-2">
                          {selectedMajor.tracks.find((t) => t.id === activeTrack)?.description}
                        </motion.p>
                      )}
                    </div>

                    {/* Search results within major */}
                    {filteredSubjects && filteredSubjects.length > 0 && searchQuery.trim() && (
                      <div className="mb-4 p-3 glass rounded-xl">
                        <p className="text-xs text-muted-foreground mb-2">Kết quả tìm kiếm:</p>
                        <div className="flex flex-wrap gap-2">
                          {filteredSubjects.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setSelectedSubject(s)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <RoadmapTree major={selectedMajor} activeTrack={activeTrack} onSubjectClick={setSelectedSubject} />
                  </>
                )}
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">Hồ sơ của tôi</h1>
                <p className="text-muted-foreground text-sm mb-8">Quản lý thông tin cá nhân và gói đăng ký</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* User Info */}
                  <div className="glass rounded-2xl p-6">
                    <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-accent" /> Thông tin cá nhân
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Email</label>
                        <div className="bg-muted rounded-lg px-4 py-2.5 text-sm">{userEmail}</div>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Họ tên</label>
                        <input defaultValue="Sinh viên UniPath" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Ngành học</label>
                        <input defaultValue="Công nghệ phần mềm" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground block mb-1">Trường</label>
                        <input defaultValue="Đại học FPT" className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent" />
                      </div>
                      <Button className="gradient-blue text-primary-foreground border-0 rounded-lg">Lưu thay đổi</Button>
                    </div>
                  </div>

                  {/* Subscription & Billing */}
                  <div className="space-y-6">
                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-accent" /> Gói đăng ký
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-sm font-medium">Gói hiện tại:</span>
                          <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent">Starter (Miễn phí)</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Nâng cấp lên Professional để mở khóa toàn bộ tài liệu, đánh giá cộng đồng và lộ trình cá nhân hóa.
                      </p>
                      <Button onClick={() => navigate("/billing")} className="gradient-blue text-primary-foreground border-0 rounded-lg w-full">
                        Xem gói nâng cấp
                      </Button>
                    </div>

                    <div className="glass rounded-2xl p-6">
                      <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-accent" /> Lịch sử thanh toán
                      </h3>
                      <div className="text-sm text-muted-foreground text-center py-6">
                        Chưa có giao dịch nào
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Subject detail panel */}
      <AnimatePresence>
        {selectedSubject && selectedMajor && (
          <SubjectDetailPanel subject={selectedSubject} major={selectedMajor} onClose={() => setSelectedSubject(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
