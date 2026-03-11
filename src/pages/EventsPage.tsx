import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Event {
  id: string;
  title: string;
  club: string;
  date: string;
  location: string;
  majors: string[];
  image: string;
  description: string;
  activities: string[];
}

const events: Event[] = [
  {
    id: "1",
    title: "Tech Talk: AI trong giáo dục",
    club: "CLB Công nghệ",
    date: "2026-04-15",
    location: "Hội trường A",
    majors: ["Trí tuệ nhân tạo", "Công nghệ phần mềm"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
    description: "Sự kiện chia sẻ về ứng dụng AI trong giáo dục hiện đại, với các diễn giả từ Google và Microsoft.",
    activities: ["Keynote speech", "Panel discussion", "Networking", "Demo showcase"],
  },
  {
    id: "2",
    title: "Design Sprint Weekend",
    club: "CLB Thiết kế",
    date: "2026-04-22",
    location: "Phòng Lab B3",
    majors: ["Thiết kế đồ họa"],
    image: "https://images.unsplash.com/photo-1558403194-611308249627?w=600&h=400&fit=crop",
    description: "48 giờ thiết kế sản phẩm thực tế với mentors từ các công ty hàng đầu.",
    activities: ["Workshop", "Team collaboration", "Mentoring sessions", "Final presentation"],
  },
  {
    id: "3",
    title: "International Business Forum",
    club: "CLB Kinh doanh",
    date: "2026-05-10",
    location: "Trung tâm hội nghị",
    majors: ["Kinh doanh quốc tế"],
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop",
    description: "Diễn đàn kết nối sinh viên với doanh nghiệp, cơ hội thực tập và việc làm.",
    activities: ["Company booths", "Interview practice", "Career talks", "Networking dinner"],
  },
  {
    id: "4",
    title: "Hackathon 2026",
    club: "CLB Lập trình",
    date: "2026-05-25",
    location: "Campus chính",
    majors: ["Công nghệ phần mềm", "Trí tuệ nhân tạo"],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
    description: "Cuộc thi lập trình 24 giờ với giải thưởng hấp dẫn và cơ hội được tuyển dụng.",
    activities: ["Coding challenge", "Mentor support", "Pizza party", "Prize ceremony"],
  },
];

const EventsPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Sự kiện <span className="gradient-text">sắp tới</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tham gia các sự kiện để kết nối, học hỏi và phát triển bản thân.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                className="glass rounded-2xl overflow-hidden group cursor-pointer hover:shadow-glow transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative overflow-hidden h-48">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.club}</p>
                  </div>
                </div>
                <div className="p-5 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              className="glass rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-heading text-2xl font-bold">{selectedEvent.title}</h2>
                <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-lg hover:bg-muted"><X className="w-5 h-5" /></button>
              </div>

              <p className="text-muted-foreground mb-6">{selectedEvent.description}</p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-accent" /> {selectedEvent.date}</div>
                <div className="flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-accent" /> {selectedEvent.location}</div>
                <div className="flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-accent" /> {selectedEvent.club}</div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Hoạt động</h4>
                <ul className="space-y-1">
                  {selectedEvent.activities.map(a => <li key={a} className="text-sm text-muted-foreground">• {a}</li>)}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">Ngành liên quan</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEvent.majors.map(m => <span key={m} className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">{m}</span>)}
                </div>
              </div>

              <Button className="w-full gradient-blue text-primary-foreground border-0 rounded-xl">
                Tham gia sự kiện
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default EventsPage;
