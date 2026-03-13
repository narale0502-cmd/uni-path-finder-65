import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Plus, Pencil, Trash2, X, ChevronRight, Link2, Unlink,
  GripVertical, ChevronDown, ChevronUp, GitBranch
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Major, Subject, Track, SubjectTopic } from "@/data/roadmapData";

// ── Props ──
interface Props {
  majors: Major[];
  onMajorsChange: (majors: Major[]) => void;
}

// ── Main Component ──
const AdminDiagramEditor = ({ majors, onMajorsChange }: Props) => {
  const [selectedMajorId, setSelectedMajorId] = useState<string | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [showTrackForm, setShowTrackForm] = useState(false);
  const [editingMajor, setEditingMajor] = useState<Major | null>(null);
  const [showMajorForm, setShowMajorForm] = useState(false);
  const [editingTopicSubject, setEditingTopicSubject] = useState<Subject | null>(null);

  const selectedMajor = majors.find(m => m.id === selectedMajorId) || null;

  const updateMajor = useCallback((id: string, updater: (m: Major) => Major) => {
    onMajorsChange(majors.map(m => m.id === id ? updater(m) : m));
  }, [majors, onMajorsChange]);

  // ── Major CRUD ──
  const deleteMajor = (id: string) => {
    onMajorsChange(majors.filter(m => m.id !== id));
    if (selectedMajorId === id) setSelectedMajorId(null);
    toast.success("Đã xóa chuyên ngành");
  };

  const saveMajor = (m: Major) => {
    if (editingMajor) {
      onMajorsChange(majors.map(x => x.id === m.id ? m : x));
      toast.success("Đã cập nhật chuyên ngành");
    } else {
      onMajorsChange([...majors, m]);
      toast.success("Đã thêm chuyên ngành");
    }
    setEditingMajor(null);
    setShowMajorForm(false);
  };

  // ── Subject CRUD ──
  const deleteSubject = (subjectId: string) => {
    if (!selectedMajorId) return;
    updateMajor(selectedMajorId, m => ({
      ...m,
      subjects: m.subjects
        .filter(s => s.id !== subjectId)
        .map(s => ({ ...s, prereqs: s.prereqs.filter(p => p !== subjectId) }))
    }));
    toast.success("Đã xóa môn học");
  };

  const saveSubject = (s: Subject) => {
    if (!selectedMajorId) return;
    updateMajor(selectedMajorId, m => {
      const exists = m.subjects.some(x => x.id === s.id);
      return {
        ...m,
        subjects: exists
          ? m.subjects.map(x => x.id === s.id ? s : x)
          : [...m.subjects, s],
      };
    });
    toast.success(editingSubject ? "Đã cập nhật môn học" : "Đã thêm môn học");
    setEditingSubject(null);
    setShowSubjectForm(false);
  };

  // ── Track CRUD ──
  const deleteTrack = (trackId: string) => {
    if (!selectedMajorId) return;
    updateMajor(selectedMajorId, m => ({
      ...m,
      tracks: m.tracks.filter(t => t.id !== trackId),
      subjects: m.subjects.map(s => ({ ...s, tracks: s.tracks?.filter(t => t !== trackId) })),
    }));
    toast.success("Đã xóa định hướng");
  };

  const saveTrack = (t: Track) => {
    if (!selectedMajorId) return;
    updateMajor(selectedMajorId, m => {
      const exists = m.tracks.some(x => x.id === t.id);
      return {
        ...m,
        tracks: exists ? m.tracks.map(x => x.id === t.id ? t : x) : [...m.tracks, t],
      };
    });
    toast.success(editingTrack ? "Đã cập nhật định hướng" : "Đã thêm định hướng");
    setEditingTrack(null);
    setShowTrackForm(false);
  };

  // ── Topic Tree Update ──
  const saveTopicTree = (subjectId: string, topicTree: SubjectTopic) => {
    if (!selectedMajorId) return;
    updateMajor(selectedMajorId, m => ({
      ...m,
      subjects: m.subjects.map(s => s.id === subjectId ? { ...s, topicTree } : s),
    }));
    toast.success("Đã cập nhật cây chủ đề");
    setEditingTopicSubject(null);
  };

  // ═══════════════════════════════════════════════════
  //  RENDER: Major List
  // ═══════════════════════════════════════════════════
  if (!selectedMajorId) {
    return (
      <>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">Quản lý lộ trình</h1>
            <p className="text-muted-foreground text-sm">Chọn chuyên ngành để quản lý môn học, định hướng và cây chủ đề</p>
          </div>
          <Button onClick={() => { setEditingMajor(null); setShowMajorForm(true); }} className="gradient-blue text-primary-foreground border-0 rounded-lg">
            <Plus className="w-4 h-4 mr-2" /> Thêm chuyên ngành
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {majors.map((m, i) => (
            <motion.div
              key={m.id}
              className="glass rounded-2xl p-6 group cursor-pointer hover:shadow-glow transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedMajorId(m.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{m.icon}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                  <button onClick={() => { setEditingMajor(m); setShowMajorForm(true); }} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => deleteMajor(m.id)} className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </div>
              <h3 className="font-heading text-base font-semibold mb-1.5">{m.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{m.subjects.length} môn • {m.tracks.length} định hướng</p>
              <div className="flex flex-wrap gap-1">
                {m.tracks.map(t => (
                  <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t.icon} {t.name}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-accent">
                <span>Quản lý chi tiết</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Major form modal */}
        <AnimatePresence>
          {showMajorForm && (
            <FormModal title={editingMajor ? "Sửa chuyên ngành" : "Thêm chuyên ngành"} onClose={() => { setShowMajorForm(false); setEditingMajor(null); }}>
              <MajorForm initial={editingMajor} onSave={saveMajor} onCancel={() => { setShowMajorForm(false); setEditingMajor(null); }} />
            </FormModal>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ═══════════════════════════════════════════════════
  //  RENDER: Major Detail — Subjects + Tracks + Tree
  // ═══════════════════════════════════════════════════
  const major = selectedMajor!;
  const semesters = [...new Set(major.subjects.map(s => s.semester))].sort((a, b) => a - b);

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <button onClick={() => setSelectedMajorId(null)} className="hover:text-foreground transition-colors">Lộ trình</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{major.icon} {major.name}</span>
      </div>

      <Button variant="ghost" size="sm" className="mb-4" onClick={() => setSelectedMajorId(null)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
      </Button>

      {/* ── Tracks Section ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-accent" /> Định hướng ({major.tracks.length})
          </h2>
          <Button size="sm" variant="outline" className="rounded-lg" onClick={() => { setEditingTrack(null); setShowTrackForm(true); }}>
            <Plus className="w-3.5 h-3.5 mr-1" /> Thêm
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {major.tracks.map(t => (
            <div key={t.id} className="glass rounded-xl px-4 py-3 flex items-center gap-3 group">
              <span className="text-lg">{t.icon}</span>
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.description}</div>
              </div>
              <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingTrack(t); setShowTrackForm(true); }} className="p-1 rounded hover:bg-muted"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                <button onClick={() => deleteTrack(t.id)} className="p-1 rounded hover:bg-muted"><Trash2 className="w-3 h-3 text-destructive" /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Subjects by Semester ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-bold">Môn học ({major.subjects.length})</h2>
          <Button size="sm" className="gradient-blue text-primary-foreground border-0 rounded-lg" onClick={() => { setEditingSubject(null); setShowSubjectForm(true); }}>
            <Plus className="w-3.5 h-3.5 mr-1" /> Thêm môn
          </Button>
        </div>

        {semesters.map(sem => {
          const subjects = major.subjects.filter(s => s.semester === sem);
          return (
            <div key={sem} className="mb-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Học kỳ {sem}</h3>
              <div className="space-y-2">
                {subjects.map(s => (
                  <SubjectNodeRow
                    key={s.id}
                    subject={s}
                    allSubjects={major.subjects}
                    tracks={major.tracks}
                    onEdit={() => { setEditingSubject(s); setShowSubjectForm(true); }}
                    onDelete={() => deleteSubject(s.id)}
                    onEditTopics={() => setEditingTopicSubject(s)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Modals ── */}
      <AnimatePresence>
        {showSubjectForm && (
          <FormModal title={editingSubject ? "Sửa môn học" : "Thêm môn học"} onClose={() => { setShowSubjectForm(false); setEditingSubject(null); }}>
            <SubjectForm
              initial={editingSubject}
              allSubjects={major.subjects}
              tracks={major.tracks}
              onSave={saveSubject}
              onCancel={() => { setShowSubjectForm(false); setEditingSubject(null); }}
            />
          </FormModal>
        )}

        {showTrackForm && (
          <FormModal title={editingTrack ? "Sửa định hướng" : "Thêm định hướng"} onClose={() => { setShowTrackForm(false); setEditingTrack(null); }}>
            <TrackForm initial={editingTrack} onSave={saveTrack} onCancel={() => { setShowTrackForm(false); setEditingTrack(null); }} />
          </FormModal>
        )}

        {editingTopicSubject && (
          <FormModal title={`Cây chủ đề: ${editingTopicSubject.name}`} onClose={() => setEditingTopicSubject(null)} wide>
            <TopicTreeEditor
              topicTree={editingTopicSubject.topicTree || { id: `${editingTopicSubject.id}-root`, name: editingTopicSubject.name }}
              onSave={(tree) => saveTopicTree(editingTopicSubject.id, tree)}
              onCancel={() => setEditingTopicSubject(null)}
            />
          </FormModal>
        )}
      </AnimatePresence>
    </>
  );
};

// ═══════════════════════════════════════════════════════════
//  SubjectNodeRow — a single subject displayed as a node
// ═══════════════════════════════════════════════════════════
const SubjectNodeRow = ({
  subject, allSubjects, tracks, onEdit, onDelete, onEditTopics
}: {
  subject: Subject; allSubjects: Subject[]; tracks: Track[];
  onEdit: () => void; onDelete: () => void; onEditTopics: () => void;
}) => {
  const prereqNames = subject.prereqs.map(pid => allSubjects.find(s => s.id === pid)?.name || pid);
  const trackNames = subject.tracks?.map(tid => tracks.find(t => t.id === tid)?.name || tid) || [];
  const topicCount = countTopics(subject.topicTree);

  return (
    <div className="glass rounded-xl px-5 py-4 flex items-center gap-4 group hover:shadow-glow transition-all">
      {/* Node indicator */}
      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${subject.core ? "bg-accent shadow-glow" : "bg-muted-foreground/40"}`} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-sm">{subject.name}</span>
          {subject.core && <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/20 text-accent font-medium">Core</span>}
          <span className="text-[10px] text-muted-foreground">HK{subject.semester}</span>
        </div>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          {prereqNames.length > 0 && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Link2 className="w-3 h-3" />
              {prereqNames.join(", ")}
            </div>
          )}
          {trackNames.length > 0 && (
            <div className="flex gap-1">
              {trackNames.map(tn => (
                <span key={tn} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{tn}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Topic tree indicator */}
      <button onClick={onEditTopics} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors" title="Quản lý cây chủ đề">
        <GitBranch className="w-3.5 h-3.5" />
        <span>{topicCount}</span>
      </button>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Pencil className="w-3.5 h-3.5 text-muted-foreground" /></button>
        <button onClick={onDelete} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><Trash2 className="w-3.5 h-3.5 text-destructive" /></button>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  TopicTreeEditor — recursive topic node editor
// ═══════════════════════════════════════════════════════════
const TopicTreeEditor = ({ topicTree, onSave, onCancel }: {
  topicTree: SubjectTopic; onSave: (tree: SubjectTopic) => void; onCancel: () => void;
}) => {
  const [tree, setTree] = useState<SubjectTopic>(JSON.parse(JSON.stringify(topicTree)));

  const updateNode = (nodeId: string, name: string) => {
    setTree(prev => updateNodeInTree(prev, nodeId, n => ({ ...n, name })));
  };

  const addChild = (parentId: string) => {
    const newChild: SubjectTopic = { id: `topic-${Date.now()}`, name: "Chủ đề mới" };
    setTree(prev => updateNodeInTree(prev, parentId, n => ({
      ...n, children: [...(n.children || []), newChild]
    })));
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === tree.id) { toast.error("Không thể xóa node gốc"); return; }
    setTree(prev => removeNodeFromTree(prev, nodeId));
  };

  return (
    <div>
      <div className="mb-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground">
        Chỉnh sửa cây chủ đề. Nhấn <Plus className="w-3 h-3 inline" /> để thêm nhánh con, <Trash2 className="w-3 h-3 inline" /> để xóa.
      </div>
      <div className="max-h-[50vh] overflow-y-auto pr-2">
        <TopicNodeEditor node={tree} onUpdate={updateNode} onAddChild={addChild} onDelete={deleteNode} depth={0} isRoot />
      </div>
      <div className="flex gap-2 pt-4 mt-4 border-t border-border">
        <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onCancel}>Hủy</Button>
        <Button className="flex-1 gradient-blue text-primary-foreground border-0 rounded-lg" onClick={() => onSave(tree)}>Lưu cây chủ đề</Button>
      </div>
    </div>
  );
};

const TopicNodeEditor = ({ node, onUpdate, onAddChild, onDelete, depth, isRoot }: {
  node: SubjectTopic; onUpdate: (id: string, name: string) => void;
  onAddChild: (parentId: string) => void; onDelete: (id: string) => void;
  depth: number; isRoot?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-border pl-4" : ""}>
      <div className="flex items-center gap-2 py-1.5 group">
        {hasChildren ? (
          <button onClick={() => setCollapsed(!collapsed)} className="p-0.5 rounded hover:bg-muted">
            {collapsed ? <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
          </button>
        ) : (
          <div className="w-4.5" />
        )}
        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isRoot ? "bg-accent" : "bg-muted-foreground/50"}`} />
        <input
          value={node.name}
          onChange={e => onUpdate(node.id, e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none border-b border-transparent focus:border-accent transition-colors py-0.5"
        />
        <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onAddChild(node.id)} className="p-1 rounded hover:bg-muted" title="Thêm nhánh con">
            <Plus className="w-3 h-3 text-accent" />
          </button>
          {!isRoot && (
            <button onClick={() => onDelete(node.id)} className="p-1 rounded hover:bg-muted" title="Xóa">
              <Trash2 className="w-3 h-3 text-destructive" />
            </button>
          )}
        </div>
      </div>
      {!collapsed && hasChildren && (
        <div>
          {node.children!.map(child => (
            <TopicNodeEditor key={child.id} node={child} onUpdate={onUpdate} onAddChild={onAddChild} onDelete={onDelete} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
//  Forms
// ═══════════════════════════════════════════════════════════
const inputClass = "w-full bg-muted rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-accent transition-all";

const MajorForm = ({ initial, onSave, onCancel }: { initial: Major | null; onSave: (m: Major) => void; onCancel: () => void }) => {
  const [name, setName] = useState(initial?.name || "");
  const [icon, setIcon] = useState(initial?.icon || "📚");
  const [color, setColor] = useState(initial?.color || "from-blue-500 to-cyan-400");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Vui lòng nhập tên"); return; }
    onSave({
      id: initial?.id || `major-${Date.now()}`,
      name, icon, color,
      tracks: initial?.tracks || [],
      subjects: initial?.subjects || [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-[1fr_80px] gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Tên chuyên ngành</label><input value={name} onChange={e => setName(e.target.value)} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Icon</label><input value={icon} onChange={e => setIcon(e.target.value)} className={inputClass} /></div>
      </div>
      <div><label className="text-xs text-muted-foreground block mb-1">Gradient color class</label><input value={color} onChange={e => setColor(e.target.value)} className={inputClass} placeholder="from-blue-500 to-cyan-400" /></div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onCancel}>Hủy</Button>
        <Button type="submit" className="flex-1 gradient-blue text-primary-foreground border-0 rounded-lg">Lưu</Button>
      </div>
    </form>
  );
};

const TrackForm = ({ initial, onSave, onCancel }: { initial: Track | null; onSave: (t: Track) => void; onCancel: () => void }) => {
  const [name, setName] = useState(initial?.name || "");
  const [icon, setIcon] = useState(initial?.icon || "📌");
  const [description, setDescription] = useState(initial?.description || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Vui lòng nhập tên"); return; }
    onSave({ id: initial?.id || `track-${Date.now()}`, name, icon, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-[1fr_80px] gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Tên định hướng</label><input value={name} onChange={e => setName(e.target.value)} className={inputClass} /></div>
        <div><label className="text-xs text-muted-foreground block mb-1">Icon</label><input value={icon} onChange={e => setIcon(e.target.value)} className={inputClass} /></div>
      </div>
      <div><label className="text-xs text-muted-foreground block mb-1">Mô tả</label><input value={description} onChange={e => setDescription(e.target.value)} className={inputClass} /></div>
      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onCancel}>Hủy</Button>
        <Button type="submit" className="flex-1 gradient-blue text-primary-foreground border-0 rounded-lg">Lưu</Button>
      </div>
    </form>
  );
};

const SubjectForm = ({ initial, allSubjects, tracks, onSave, onCancel }: {
  initial: Subject | null; allSubjects: Subject[]; tracks: Track[];
  onSave: (s: Subject) => void; onCancel: () => void;
}) => {
  const [name, setName] = useState(initial?.name || "");
  const [semester, setSemester] = useState(initial?.semester?.toString() || "1");
  const [core, setCore] = useState(initial?.core ?? false);
  const [description, setDescription] = useState(initial?.description || "");
  const [careers, setCareers] = useState(initial?.careers?.join(", ") || "");
  const [materials, setMaterials] = useState(initial?.materials?.join(", ") || "");
  const [selectedPrereqs, setSelectedPrereqs] = useState<string[]>(initial?.prereqs || []);
  const [selectedTracks, setSelectedTracks] = useState<string[]>(initial?.tracks || []);

  const otherSubjects = allSubjects.filter(s => s.id !== initial?.id);

  const togglePrereq = (id: string) => {
    setSelectedPrereqs(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleTrack = (id: string) => {
    setSelectedTracks(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { toast.error("Vui lòng nhập tên môn"); return; }
    onSave({
      id: initial?.id || `subj-${Date.now()}`,
      name,
      semester: parseInt(semester) || 1,
      core,
      description,
      prereqs: selectedPrereqs,
      careers: careers.split(",").map(c => c.trim()).filter(Boolean),
      materials: materials.split(",").map(m => m.trim()).filter(Boolean),
      tracks: selectedTracks,
      topicTree: initial?.topicTree,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><label className="text-xs text-muted-foreground block mb-1">Tên môn học</label><input value={name} onChange={e => setName(e.target.value)} className={inputClass} /></div>

      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-xs text-muted-foreground block mb-1">Học kỳ</label><input type="number" min={1} max={8} value={semester} onChange={e => setSemester(e.target.value)} className={inputClass} /></div>
        <div className="flex items-end gap-2 pb-1">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" checked={core} onChange={e => setCore(e.target.checked)} className="rounded accent-[hsl(var(--accent))]" />
            Môn bắt buộc (Core)
          </label>
        </div>
      </div>

      <div><label className="text-xs text-muted-foreground block mb-1">Mô tả</label><textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className={inputClass} /></div>

      {/* Prereqs */}
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Môn tiên quyết (nhấn để chọn/bỏ)</label>
        <div className="flex flex-wrap gap-1.5 p-3 bg-muted rounded-lg max-h-28 overflow-y-auto">
          {otherSubjects.length === 0 && <span className="text-xs text-muted-foreground">Chưa có môn nào</span>}
          {otherSubjects.map(s => (
            <button
              key={s.id} type="button"
              onClick={() => togglePrereq(s.id)}
              className={`text-xs px-2.5 py-1 rounded-full transition-all ${
                selectedPrereqs.includes(s.id)
                  ? "bg-accent text-accent-foreground"
                  : "bg-background text-muted-foreground hover:bg-accent/20"
              }`}
            >
              {selectedPrereqs.includes(s.id) ? <Link2 className="w-3 h-3 inline mr-1" /> : <Unlink className="w-3 h-3 inline mr-1" />}
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tracks */}
      <div>
        <label className="text-xs text-muted-foreground block mb-1">Thuộc định hướng</label>
        <div className="flex flex-wrap gap-1.5">
          {tracks.map(t => (
            <button
              key={t.id} type="button"
              onClick={() => toggleTrack(t.id)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all border ${
                selectedTracks.includes(t.id)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card border-border text-muted-foreground hover:border-accent/40"
              }`}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>
      </div>

      <div><label className="text-xs text-muted-foreground block mb-1">Nghề nghiệp liên quan (phân cách bằng dấu phẩy)</label><input value={careers} onChange={e => setCareers(e.target.value)} className={inputClass} /></div>
      <div><label className="text-xs text-muted-foreground block mb-1">Tài liệu (phân cách bằng dấu phẩy)</label><input value={materials} onChange={e => setMaterials(e.target.value)} className={inputClass} /></div>

      <div className="flex gap-2 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-lg" onClick={onCancel}>Hủy</Button>
        <Button type="submit" className="flex-1 gradient-blue text-primary-foreground border-0 rounded-lg">Lưu</Button>
      </div>
    </form>
  );
};

// ═══════════════════════════════════════════════════════════
//  Reusable Modal Wrapper
// ═══════════════════════════════════════════════════════════
const FormModal = ({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) => (
  <motion.div
    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className={`glass rounded-2xl p-8 w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto`}
      initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-lg font-bold">{title}</h2>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted"><X className="w-4 h-4" /></button>
      </div>
      {children}
    </motion.div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════════
//  Helpers
// ═══════════════════════════════════════════════════════════
function countTopics(tree?: SubjectTopic): number {
  if (!tree) return 0;
  let count = 1;
  if (tree.children) tree.children.forEach(c => { count += countTopics(c); });
  return count;
}

function updateNodeInTree(tree: SubjectTopic, nodeId: string, updater: (n: SubjectTopic) => SubjectTopic): SubjectTopic {
  if (tree.id === nodeId) return updater(tree);
  if (!tree.children) return tree;
  return { ...tree, children: tree.children.map(c => updateNodeInTree(c, nodeId, updater)) };
}

function removeNodeFromTree(tree: SubjectTopic, nodeId: string): SubjectTopic {
  if (!tree.children) return tree;
  return {
    ...tree,
    children: tree.children
      .filter(c => c.id !== nodeId)
      .map(c => removeNodeFromTree(c, nodeId)),
  };
}

export default AdminDiagramEditor;
