import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, X, MessageSquare, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Subject {
  id: string;
  name: string;
  prereqs: string[];
  semester: number;
  core: boolean;
  description: string;
  careers: string[];
  materials: string[];
}

interface Major {
  id: string;
  name: string;
  icon: string;
  color: string;
  subjects: Subject[];
}

const majors: Major[] = [
  {
    id: "se",
    name: "Công nghệ phần mềm",
    icon: "💻",
    color: "from-blue-500 to-cyan-400",
    subjects: [
      { id: "cs101", name: "Nhập môn lập trình", prereqs: [], semester: 1, core: true, description: "Giới thiệu về lập trình với Python/C.", careers: ["Software Developer", "Data Analyst"], materials: ["Slides tuần 1-15", "Đề thi mẫu"] },
      { id: "cs102", name: "Cấu trúc dữ liệu", prereqs: ["cs101"], semester: 2, core: true, description: "Array, linked list, tree, graph và thuật toán.", careers: ["Backend Developer", "Algorithm Engineer"], materials: ["Bài tập thực hành", "Video bài giảng"] },
      { id: "cs201", name: "Cơ sở dữ liệu", prereqs: ["cs101"], semester: 3, core: true, description: "SQL, thiết kế CSDL, normalization.", careers: ["Database Admin", "Data Engineer"], materials: ["Lab exercises", "Project mẫu"] },
      { id: "cs202", name: "Lập trình Web", prereqs: ["cs102"], semester: 3, core: false, description: "HTML, CSS, JavaScript và frameworks.", careers: ["Frontend Developer", "Full-stack Developer"], materials: ["Code templates", "Tutorial videos"] },
      { id: "cs301", name: "Công nghệ phần mềm", prereqs: ["cs201", "cs202"], semester: 4, core: true, description: "Quy trình phát triển phần mềm, Agile, Scrum.", careers: ["Project Manager", "Tech Lead"], materials: ["Case studies", "Group project guidelines"] },
    ],
  },
  {
    id: "gd",
    name: "Thiết kế đồ họa",
    icon: "🎨",
    color: "from-pink-500 to-rose-400",
    subjects: [
      { id: "gd101", name: "Nguyên lý thiết kế", prereqs: [], semester: 1, core: true, description: "Màu sắc, bố cục, typography cơ bản.", careers: ["Graphic Designer", "UI Designer"], materials: ["Bài tập thiết kế", "Mood board mẫu"] },
      { id: "gd102", name: "Thiết kế UI/UX", prereqs: ["gd101"], semester: 2, core: true, description: "User research, wireframing, prototyping.", careers: ["UX Designer", "Product Designer"], materials: ["Figma templates", "Case studies"] },
      { id: "gd201", name: "Motion Graphics", prereqs: ["gd101"], semester: 3, core: false, description: "Animation cơ bản với After Effects.", careers: ["Motion Designer", "Video Editor"], materials: ["Project files", "Tutorials"] },
    ],
  },
  {
    id: "ib",
    name: "Kinh doanh quốc tế",
    icon: "🌍",
    color: "from-emerald-500 to-teal-400",
    subjects: [
      { id: "ib101", name: "Kinh tế vi mô", prereqs: [], semester: 1, core: true, description: "Cung cầu, thị trường, hành vi người tiêu dùng.", careers: ["Business Analyst", "Economist"], materials: ["Textbook chapters", "Bài tập tình huống"] },
      { id: "ib102", name: "Marketing căn bản", prereqs: [], semester: 1, core: true, description: "4P, segmentation, branding.", careers: ["Marketing Manager", "Brand Strategist"], materials: ["Campaign examples", "Quiz bank"] },
      { id: "ib201", name: "Thương mại quốc tế", prereqs: ["ib101"], semester: 2, core: true, description: "Chính sách thương mại, WTO, FTA.", careers: ["Trade Analyst", "Export Manager"], materials: ["Research papers", "Case studies"] },
    ],
  },
  {
    id: "ai",
    name: "Trí tuệ nhân tạo",
    icon: "🤖",
    color: "from-violet-500 to-purple-400",
    subjects: [
      { id: "ai101", name: "Toán rời rạc", prereqs: [], semester: 1, core: true, description: "Logic, tập hợp, đồ thị, tổ hợp.", careers: ["AI Researcher", "Data Scientist"], materials: ["Problem sets", "Lecture notes"] },
      { id: "ai102", name: "Xác suất thống kê", prereqs: [], semester: 1, core: true, description: "Phân phối, kiểm định, hồi quy.", careers: ["Statistician", "ML Engineer"], materials: ["R exercises", "Datasets"] },
      { id: "ai201", name: "Machine Learning", prereqs: ["ai101", "ai102"], semester: 3, core: true, description: "Supervised, unsupervised learning, neural networks.", careers: ["ML Engineer", "AI Developer"], materials: ["Jupyter notebooks", "Papers"] },
    ],
  },
  {
    id: "lang",
    name: "Ngôn ngữ Anh",
    icon: "📚",
    color: "from-amber-500 to-orange-400",
    subjects: [
      { id: "en101", name: "Ngữ pháp nâng cao", prereqs: [], semester: 1, core: true, description: "Grammar structures for academic writing.", careers: ["Translator", "Content Writer"], materials: ["Grammar exercises", "Writing samples"] },
      { id: "en102", name: "Nghe nói học thuật", prereqs: [], semester: 1, core: true, description: "Academic listening and speaking skills.", careers: ["Interpreter", "Teacher"], materials: ["Audio files", "Discussion topics"] },
    ],
  },
];

const DiagramPage = () => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

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

          {/* Breadcrumb */}
          {selectedMajor && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button onClick={() => { setSelectedMajor(null); setSelectedSubject(null); }} className="hover:text-foreground transition-colors">
                Tất cả ngành
              </button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => setSelectedSubject(null)} className="hover:text-foreground transition-colors">
                {selectedMajor.name}
              </button>
              {selectedSubject && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-foreground">{selectedSubject.name}</span>
                </>
              )}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Level 1: Majors */}
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
                    <p className="text-sm text-muted-foreground">{major.subjects.length} môn học</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Level 2: Subjects Roadmap */}
            {selectedMajor && !selectedSubject && (
              <motion.div
                key="subjects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => setSelectedMajor(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                </Button>

                <div className="flex items-center gap-3 mb-8">
                  <span className="text-3xl">{selectedMajor.icon}</span>
                  <h2 className="font-heading text-2xl font-bold">{selectedMajor.name}</h2>
                </div>

                {/* Roadmap tree */}
                <div className="space-y-4">
                  {Array.from(new Set(selectedMajor.subjects.map(s => s.semester))).sort().map(sem => (
                    <div key={sem}>
                      <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Học kỳ {sem}</p>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {selectedMajor.subjects.filter(s => s.semester === sem).map(subject => (
                          <button
                            key={subject.id}
                            onClick={() => setSelectedSubject(subject)}
                            className={`glass rounded-xl px-5 py-4 text-left hover:shadow-glow transition-all duration-300 group ${subject.core ? "border-accent/50 border-2" : ""}`}
                          >
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-accent" />
                              <span className="font-medium text-sm">{subject.name}</span>
                            </div>
                            {subject.prereqs.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Yêu cầu: {subject.prereqs.map(p => selectedMajor.subjects.find(s => s.id === p)?.name).join(", ")}
                              </p>
                            )}
                            {subject.core && (
                              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">Bắt buộc</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Level 3: Subject Detail */}
            {selectedSubject && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="max-w-2xl"
              >
                <Button variant="ghost" size="sm" className="mb-6" onClick={() => setSelectedSubject(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại lộ trình
                </Button>

                <div className="glass rounded-2xl p-8">
                  <h2 className="font-heading text-2xl font-bold mb-2">{selectedSubject.name}</h2>
                  <p className="text-muted-foreground mb-6">{selectedSubject.description}</p>

                  <div className="space-y-6">
                    {selectedSubject.prereqs.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-accent" /> Môn tiên quyết
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubject.prereqs.map(p => (
                            <span key={p} className="text-xs px-3 py-1 rounded-full bg-muted">{selectedMajor!.subjects.find(s => s.id === p)?.name}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-accent" /> Nghề nghiệp liên quan
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSubject.careers.map(c => (
                          <span key={c} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{c}</span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-accent" /> Tài liệu
                      </h4>
                      <ul className="space-y-1">
                        {selectedSubject.materials.map(m => (
                          <li key={m} className="text-sm text-muted-foreground">• {m}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Community comments placeholder */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-accent" /> Nhận xét từ cộng đồng
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-muted rounded-xl p-4">
                          <p className="text-sm text-muted-foreground italic">"Môn này rất hay, nên đi học đầy đủ và làm bài tập sớm."</p>
                          <p className="text-xs text-muted-foreground mt-2">— Sinh viên K18</p>
                        </div>
                        <div className="bg-muted rounded-xl p-4">
                          <p className="text-sm text-muted-foreground italic">"Đề thi thường ra từ slides, nên ôn kỹ phần lý thuyết."</p>
                          <p className="text-xs text-muted-foreground mt-2">— Sinh viên K17</p>
                        </div>
                      </div>
                    </div>
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
