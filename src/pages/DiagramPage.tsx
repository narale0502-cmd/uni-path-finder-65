import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { majors } from "@/data/roadmapData";
import type { Major } from "@/data/roadmapData";
import { useNavigate } from "react-router-dom";

const DiagramPage = () => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const navigate = useNavigate();

  const handleTrackClick = (_trackId: string) => {
    // Redirect to login, which then goes to dashboard
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Khám phá <span className="gradient-text">lộ trình</span> học tập
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Chọn ngành học để xem lộ trình các môn học và mối quan hệ giữa chúng.
            </p>
          </motion.div>

          {selectedMajor && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button onClick={() => setSelectedMajor(null)} className="hover:text-foreground transition-colors">
                Tất cả ngành
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{selectedMajor.name}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
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
                      {major.tracks.map((t) => (
                        <span key={t.id} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {t.icon} {t.name}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {selectedMajor && (
              <motion.div key="tracks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => setSelectedMajor(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                </Button>

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{selectedMajor.icon}</span>
                    <h2 className="font-heading text-2xl font-bold">{selectedMajor.name}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">Chọn định hướng để đăng nhập và xem lộ trình chi tiết</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedMajor.tracks.map((track, i) => (
                      <motion.button
                        key={track.id}
                        onClick={() => handleTrackClick(track.id)}
                        className="glass rounded-xl p-6 text-left hover:shadow-glow transition-all duration-300 group"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <span className="text-2xl mb-3 block">{track.icon}</span>
                        <h3 className="font-heading text-base font-semibold mb-1 group-hover:text-accent transition-colors">
                          {track.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{track.description}</p>
                        <div className="mt-3 text-xs text-accent font-medium">Đăng nhập để xem →</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DiagramPage;
