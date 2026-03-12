import { motion } from "framer-motion";
import { X, BookOpen, GraduationCap, FileText, MessageSquare, GitBranch } from "lucide-react";
import type { Subject, Major } from "@/data/roadmapData";
import SubjectTopicTree from "./SubjectTopicTree";

interface SubjectDetailPanelProps {
  subject: Subject;
  major: Major;
  onClose: () => void;
}

const SubjectDetailPanel = ({ subject, major, onClose }: SubjectDetailPanelProps) => {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
      />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed right-0 top-0 h-full w-full max-w-2xl bg-card border-l border-border z-50 overflow-y-auto"
      >
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold">{subject.name}</h2>
              <p className="text-muted-foreground text-sm mt-1">{subject.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Topic Tree / Learning Diagram */}
            {subject.topicTree && (
              <div>
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-accent" /> Sơ đồ nội dung học tập
                </h4>
                <div className="glass rounded-xl p-4">
                  <SubjectTopicTree topicTree={subject.topicTree} />
                </div>
              </div>
            )}

            {/* Prerequisites */}
            {subject.prereqs.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-accent" /> Môn tiên quyết
                </h4>
                <div className="flex flex-wrap gap-2">
                  {subject.prereqs.map(p => (
                    <span key={p} className="text-xs px-3 py-1 rounded-full bg-muted">
                      {major.subjects.find(s => s.id === p)?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Careers */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" /> Nghề nghiệp liên quan
              </h4>
              <div className="flex flex-wrap gap-2">
                {subject.careers.map(c => (
                  <span key={c} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{c}</span>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" /> Tài liệu
              </h4>
              <ul className="space-y-1">
                {subject.materials.map(m => (
                  <li key={m} className="text-sm text-muted-foreground">• {m}</li>
                ))}
              </ul>
            </div>

            {/* Community comments */}
            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent" /> Nhận xét từ cộng đồng
              </h4>
              <div className="space-y-3">
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground italic">
                    "Môn này rất hay, nên đi học đầy đủ và làm bài tập sớm."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Sinh viên K18</p>
                </div>
                <div className="bg-muted rounded-xl p-4">
                  <p className="text-sm text-muted-foreground italic">
                    "Đề thi thường ra từ slides, nên ôn kỹ phần lý thuyết."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Sinh viên K17</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SubjectDetailPanel;
