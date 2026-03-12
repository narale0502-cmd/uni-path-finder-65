import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import type { Major, Subject } from "@/data/roadmapData";

interface RoadmapTreeProps {
  major: Major;
  activeTrack: string | null;
  onSubjectClick: (subject: Subject) => void;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const RoadmapTree = ({ major, activeTrack, onSubjectClick }: RoadmapTreeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodePositions, setNodePositions] = useState<NodePosition[]>([]);

  const semesters = Array.from(new Set(major.subjects.map(s => s.semester))).sort();

  const filteredSubjects = activeTrack
    ? major.subjects.filter(s => s.tracks?.includes(activeTrack))
    : major.subjects;

  const isInTrack = useCallback((subjectId: string) => {
    if (!activeTrack) return true;
    return filteredSubjects.some(s => s.id === subjectId);
  }, [activeTrack, filteredSubjects]);

  // Recalculate positions after render
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const positions: NodePosition[] = [];
      const nodes = containerRef.current.querySelectorAll("[data-subject-id]");
      const containerRect = containerRef.current.getBoundingClientRect();
      nodes.forEach(node => {
        const rect = node.getBoundingClientRect();
        positions.push({
          id: node.getAttribute("data-subject-id")!,
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
          width: rect.width,
          height: rect.height,
        });
      });
      setNodePositions(positions);
    }, 400);
    return () => clearTimeout(timer);
  }, [major, activeTrack]);

  const getNodePos = (id: string) => nodePositions.find(n => n.id === id);

  // Build connection lines
  const lines: { from: string; to: string; active: boolean }[] = [];
  major.subjects.forEach(subject => {
    subject.prereqs.forEach(prereqId => {
      const bothInTrack = isInTrack(subject.id) && isInTrack(prereqId);
      lines.push({ from: prereqId, to: subject.id, active: bothInTrack });
    });
  });

  return (
    <div ref={containerRef} className="relative">
      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: "visible" }}>
        {lines.map(line => {
          const fromPos = getNodePos(line.from);
          const toPos = getNodePos(line.to);
          if (!fromPos || !toPos) return null;

          const x1 = fromPos.x;
          const y1 = fromPos.y + fromPos.height / 2;
          const x2 = toPos.x;
          const y2 = toPos.y - toPos.height / 2;
          const midY = (y1 + y2) / 2;

          return (
            <path
              key={`${line.from}-${line.to}`}
              d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
              fill="none"
              stroke={line.active ? "hsl(var(--accent))" : "hsl(var(--border))"}
              strokeWidth={line.active ? 2.5 : 1.5}
              strokeDasharray={line.active ? "none" : "6 4"}
              opacity={line.active ? 1 : 0.3}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Semester rows */}
      <div className="space-y-12">
        {semesters.map((sem, semIdx) => {
          const semSubjects = major.subjects.filter(s => s.semester === sem);
          return (
            <div key={sem} className="relative">
              {/* Semester label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                  <span>Học kỳ {sem}</span>
                </div>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              {/* Subject nodes */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10">
                {semSubjects.map((subject, i) => {
                  const inTrack = isInTrack(subject.id);
                  const dimmed = activeTrack && !inTrack;

                  return (
                    <motion.button
                      key={subject.id}
                      data-subject-id={subject.id}
                      onClick={() => onSubjectClick(subject)}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{
                        opacity: dimmed ? 0.25 : 1,
                        y: 0,
                        scale: dimmed ? 0.95 : 1,
                      }}
                      transition={{ delay: semIdx * 0.05 + i * 0.03, duration: 0.3 }}
                      className={`
                        relative px-5 py-3.5 rounded-xl text-left transition-all duration-300
                        border bg-card shadow-sm
                        hover:shadow-glow hover:border-accent/60
                        ${subject.core && inTrack ? "border-accent/50 ring-1 ring-accent/20" : "border-border/60"}
                        ${dimmed ? "pointer-events-none" : "cursor-pointer"}
                        min-w-[140px] max-w-[200px]
                      `}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span className="font-medium text-sm leading-tight">{subject.name}</span>
                      </div>

                      <p className="text-[10px] text-muted-foreground leading-snug line-clamp-2 mt-1">
                        {subject.description}
                      </p>

                      {subject.core && inTrack && (
                        <span className="inline-block mt-2 text-[9px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-semibold">
                          Bắt buộc
                        </span>
                      )}

                      {/* Track badges */}
                      {subject.tracks && subject.tracks.length > 0 && !activeTrack && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {subject.tracks.map(t => {
                            const track = major.tracks.find(tr => tr.id === t);
                            return track ? (
                              <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                {track.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTree;
