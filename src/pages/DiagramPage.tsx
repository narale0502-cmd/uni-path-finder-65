import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RoadmapTree from "@/components/roadmap/RoadmapTree";
import SubjectDetailPanel from "@/components/roadmap/SubjectDetailPanel";
import { majors } from "@/data/roadmapData";
import type { Major, Subject } from "@/data/roadmapData";

const DiagramPage = () => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Khám phá <span className="gradient-text">lộ trình</span> học tập
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chọn ngành học để xem lộ trình các môn học và mối quan hệ giữa chúng.
            </p>
          </motion.div>

          {/* Breadcrumb */}
          {selectedMajor && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button
                onClick={() => { setSelectedMajor(null); setActiveTrack(null); setSelectedSubject(null); }}
                className="hover:text-foreground transition-colors"
              >
                Tất cả ngành
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{selectedMajor.name}</span>
              {activeTrack && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-accent font-medium">
                    {selectedMajor.tracks.find(t => t.id === activeTrack)?.name}
                  </span>
                </>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Level 1: Major selection */}
            {!selectedMajor && (
              <motion.div
                key="majors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {majors.map((major, i) => (
                  <motion.button
                    key={major.id}
                    onClick={() => setSelectedMajor(major)}
                    className="glass rounded-2xl p-8 text-left hover:shadow-glow transition-all duration-500 group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-4xl mb-4 block">{major.icon}</span>
                    <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
                      {major.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {major.subjects.length} môn học • {major.tracks.length} định hướng
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {major.tracks.map(t => (
                        <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {t.icon} {t.name}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Level 2: Roadmap tree */}
            {selectedMajor && (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-6"
                  onClick={() => { setSelectedMajor(null); setActiveTrack(null); }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                </Button>

                {/* Major header & track selector */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{selectedMajor.icon}</span>
                    <h2 className="font-heading text-2xl font-bold">{selectedMajor.name}</h2>
                  </div>

                  {/* Track pills */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTrack(null)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                        !activeTrack
                          ? "bg-accent text-accent-foreground border-accent shadow-glow"
                          : "bg-card border-border text-muted-foreground hover:border-accent/40"
                      }`}
                    >
                      Tất cả
                    </button>
                    {selectedMajor.tracks.map(track => (
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
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-muted-foreground mt-3"
                    >
                      {selectedMajor.tracks.find(t => t.id === activeTrack)?.description}
                    </motion.p>
                  )}
                </div>

                {/* Tree roadmap */}
                <RoadmapTree
                  major={selectedMajor}
                  activeTrack={activeTrack}
                  onSubjectClick={setSelectedSubject}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />

      {/* Subject detail side panel */}
      <AnimatePresence>
        {selectedSubject && selectedMajor && (
          <SubjectDetailPanel
            subject={selectedSubject}
            major={selectedMajor}
            onClose={() => setSelectedSubject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiagramPage;
