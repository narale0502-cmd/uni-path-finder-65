import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Users, Map, Calendar, LogOut, Shield, Eye, Ban, CheckCircle,
  Plus, Pencil, Trash2, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { majors as initialMajorsData } from "@/data/roadmapData";
import type { Major } from "@/data/roadmapData";
import AdminDiagramEditor from "@/components/admin/AdminDiagramEditor";

// ── Mock data ──────────────────────────────────────────────
interface MockUser {
  id: string;
  name: string;
  email: string;
  major: string;
  school: string;
  banned: boolean;
  joinedAt: string;
}

interface MockEvent {
  id: string;
  title: string;
  club: string;
  date: string;
  location: string;
  majors: string[];
  description: string;
}

const initialUsers: MockUser[] = [
  { id: "1", name: "Nguyễn Văn A", email: "a@fpt.edu.vn", major: "Công nghệ phần mềm", school: "ĐH FPT", banned: false, joinedAt: "2025-09-01" },
  { id: "2", name: "Trần Thị B", email: "b@fpt.edu.vn", major: "Thiết kế đồ họa", school: "ĐH FPT", banned: false, joinedAt: "2025-10-12" },
  { id: "3", name: "Lê Văn C", email: "c@fpt.edu.vn", major: "Trí tuệ nhân tạo", school: "ĐH FPT", banned: true, joinedAt: "2025-11-05" },
  { id: "4", name: "Phạm Thị D", email: "d@fpt.edu.vn", major: "Kinh doanh quốc tế", school: "ĐH FPT", banned: false, joinedAt: "2026-01-20" },
];

const initialEvents: MockEvent[] = [
  { id: "1", title: "Tech Talk: AI trong giáo dục", club: "CLB Công nghệ", date: "2026-04-15", location: "Hội trường A", majors: ["AI", "SE"], description: "Sự kiện chia sẻ về AI." },
  { id: "2", title: "Design Sprint Weekend", club: "CLB Thiết kế", date: "2026-04-22", location: "Phòng Lab B3", majors: ["GD"], description: "48 giờ thiết kế sản phẩm." },
  { id: "3", title: "International Business Forum", club: "CLB Kinh doanh", date: "2026-05-10", location: "Trung tâm hội nghị", majors: ["IB"], description: "Diễn đàn kinh doanh quốc tế." },
];

type Tab = "users" | "diagrams" | "events";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("users");
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [events, setEvents] = useState<MockEvent[]>(initialEvents);
  const [majorsData, setMajorsData] = useState<Major[]>(() => JSON.parse(JSON.stringify(initialMajorsData)));

  // Event modal state
  const [editingEvent, setEditingEvent] = useState<MockEvent | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [viewingUser, setViewingUser] = useState<MockUser | null>(null);

  const adminEmail = sessionStorage.getItem("userEmail") || "admin@unipath.edu";

  const handleLogout = () => {
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("isAdmin");
    navigate("/login");
  };

  // ── Filtered data ──
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }, [users, searchQuery]);

  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events;
    const q = searchQuery.toLowerCase();
    return events.filter(e => e.title.toLowerCase().includes(q) || e.club.toLowerCase().includes(q));
  }, [events, searchQuery]);

  // ── User actions ──
  const toggleBan = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
    const user = users.find(u => u.id === id);
    toast.success(user?.banned ? `Đã mở khóa ${user.name}` : `Đã chặn ${user?.name}`);
  };

  // ── Event actions ──
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    toast.success("Đã xóa sự kiện");
  };

  const saveEvent = (ev: MockEvent) => {
    if (editingEvent) {
      setEvents(prev => prev.map(e => e.id === ev.id ? ev : e));
      toast.success("Đã cập nhật sự kiện");
    } else {
      setEvents(prev => [...prev, { ...ev, id: Date.now().toString() }]);
      toast.success("Đã thêm sự kiện");
    }
    setEditingEvent(null);
    setShowEventForm(false);
  };

  const tabs: { id: Tab; icon: typeof Users; label: string }[] = [
    { id: "users", icon: Users, label: "Người dùng" },
    { id: "diagrams", icon: Map, label: "Lộ trình" },
    { id: "events", icon: Calendar, label: "Sự kiện" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="font-heading text-xl font-bold gradient-text flex items-center gap-2">
            <Shield className="w-5 h-5" /> UniPath Admin
          </button>
          <div className="relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm..." className="w-full bg-muted rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-accent transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:block">{adminEmail}</span>
            <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-muted transition-colors"><LogOut className="w-4 h-4 text-muted-foreground" /></button>
          </div>
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        {/* Sidebar */}
        <aside className="w-16 md:w-56 border-r border-border bg-card flex-shrink-0 fixed top-14 bottom-0 left-0 z-40">
          <nav className="flex flex-col gap-1 p-2 md:p-3 mt-2">
            {tabs.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === item.id ? "bg-accent text-accent-foreground shadow-glow" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-16 md:ml-56 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {/* ═══ USERS TAB ═══ */}
            {activeTab === "users" && (
              <motion.div key="users" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">Quản lý người dùng</h1>
                <p className="text-muted-foreground text-sm mb-6">Xem, chặn hoặc mở khóa tài khoản người dùng</p>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="px-5 py-3 font-medium text-muted-foreground">Tên</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground">Email</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Ngành</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Ngày tham gia</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground">Trạng thái</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground text-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="px-5 py-3 font-medium">{user.name}</td>
                            <td className="px-5 py-3 text-muted-foreground">{user.email}</td>
                            <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{user.major}</td>
                            <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{user.joinedAt}</td>
                            <td className="px-5 py-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${user.banned ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent"}`}>
                                {user.banned ? "Bị chặn" : "Hoạt động"}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => setViewingUser(user)} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                                <button onClick={() => toggleBan(user.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                                  {user.banned ? <CheckCircle className="w-4 h-4 text-accent" /> : <Ban className="w-4 h-4 text-destructive" />}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══ DIAGRAMS TAB — Full Editor ═══ */}
            {activeTab === "diagrams" && (
              <motion.div key="diagrams" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AdminDiagramEditor majors={majorsData} onMajorsChange={setMajorsData} />
              </motion.div>
            )}

            {/* ═══ EVENTS TAB ═══ */}
            {activeTab === "events" && (
              <motion.div key="events" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">Quản lý sự kiện</h1>
                    <p className="text-muted-foreground text-sm">Thêm, sửa, xóa các sự kiện</p>
                  </div>
                  <Button onClick={() => { setEditingEvent(null); setShowEventForm(true); }} className="gradient-blue text-primary-foreground border-0 rounded-lg">
                    <Plus className="w-4 h-4 mr-2" /> Thêm sự kiện
                  </Button>
                </div>
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left">
                          <th className="px-5 py-3 font-medium text-muted-foreground">Tên sự kiện</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground">CLB</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Ngày</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground hidden lg:table-cell">Địa điểm</th>
                          <th className="px-5 py-3 font-medium text-muted-foreground text-right">Hành động</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEvents.map((ev) => (
                          <tr key={ev.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                            <td className="px-5 py-3 font-medium">{ev.title}</td>
                            <td className="px-5 py-3 text-muted-foreground">{ev.club}</td>
                            <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">{ev.date}</td>
                            <td className="px-5 py-3 text-muted-foreground hidden lg:table-cell">{ev.location}</td>
                            <td className="px-5 py-3 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => { setEditingEvent(ev); setShowEventForm(true); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
                                <button onClick={() => deleteEvent(ev.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* ═══ MODALS ═══ */}
      <AnimatePresence>
        {viewingUser && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewingUser(null)}>
            <motion.div className="glass rounded-2xl p-8 w-full max-w-md" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold">Hồ sơ người dùng</h2>
                <button onClick={() => setViewingUser(null)} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Tên:</span> <span className="font-medium ml-2">{viewingUser.name}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium ml-2">{viewingUser.email}</span></div>
                <div><span className="text-muted-foreground">Ngành:</span> <span className="font-medium ml-2">{viewingUser.major}</span></div>
                <div><span className="text-muted-foreground">Trường:</span> <span className="font-medium ml-2">{viewingUser.school}</span></div>
                <div><span className="text-muted-foreground">Ngày tham gia:</span> <span className="font-medium ml-2">{viewingUser.joinedAt}</span></div>
                <div>
                  <span className="text-muted-foreground">Trạng thái:</span>
                  <span className={`ml-2 px-2.5 py-1 rounded-full text-xs font-medium ${viewingUser.banned ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent"}`}>
                    {viewingUser.banned ? "Bị chặn" : "Hoạt động"}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" className="flex-1 rounded-lg" onClick={() => setViewingUser(null)}>Đóng</Button>
                <Button className={`flex-1 rounded-lg ${viewingUser.banned ? "gradient-blue text-primary-foreground border-0" : "bg-destructive text-destructive-foreground"}`} onClick={() => { toggleBan(viewingUser.id); setViewingUser(null); }}>
                  {viewingUser.banned ? "Mở khóa" : "Chặn"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEventForm && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => { setShowEventForm(false); setEditingEvent(null); }}>
            <motion.div className="glass rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-lg font-bold">{editingEvent ? "Sửa sự kiện" : "Thêm sự kiện"}</h2>
                <button onClick={() => { setShowEventForm(false); setEditingEvent(null); }} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
              </div>
              <EventForm initial={editingEvent} onSave={saveEvent} onCancel={() => { setShowEventForm(false); setEditingEvent(null); }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Event Form ──
const EventForm = ({ initial, onSave, onCancel }: { initial: MockEvent | null; onSave: (e: MockEvent) => void; onCancel: () => void }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [club, setClub] = useState(initial?.club || "");
  const [date, setDate] = useState(initial?.date || "");
  const [location, setLocation] = useState(initial?.location || "");
  const [description, setDescription] = useState(initial?.description || "");
  const inputClass = "w-full bg-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent transition-all";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !club.trim()) { toast.error("Vui lòng điền đầy đủ thông tin"); return; }
    onSave({ id: initial?.id || "", title, club, date, location, majors: initial?.majors || [], description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="text-xs text-muted-foreground block mb-1">Tên sự kiện</label><input value={title} onChange={e => setTitle(e.target.value)} className={inputClass} /></div>
      <div><label className="text-xs text-muted-foreground block mb-1">CLB tổ chức</label><input value={club} onChange={e => setClub(e.target.value)} className={inputClass} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Ngày</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Địa điểm</label><input value={location} onChange={e => setLocation(e.target.value)} className={inputClass} /></div>
      </div>
      <div><label className="text-xs text-muted-foreground block mb-1">Mô tả</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className={inputClass} /></div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onCancel}>Hủy</Button>
        <Button type="submit" className="flex-1 gradient-blue text-primary-foreground border-0 rounded-lg">Lưu</Button>
      </div>
    </form>
  );
};

export default AdminDashboardPage;
