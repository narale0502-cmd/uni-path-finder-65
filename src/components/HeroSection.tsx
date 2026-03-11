import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-muted-foreground mb-8">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              Nền tảng học tập cho sinh viên
            </span>
          </motion.div>

          <motion.h1
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Khám phá lộ trình học tập{" "}
            <span className="gradient-text">của bạn</span>{" "}
            một cách trực quan
          </motion.h1>

          <motion.p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            UniPath giúp sinh viên định hướng rõ ràng, kết nối môn học, và mở đường cho bạn để chinh phục tương lai.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="gradient-blue text-primary-foreground border-0 rounded-xl px-8 h-12 text-base shadow-glow hover:opacity-90 transition-opacity"
              onClick={() => navigate("/diagram")}
            >
              Bắt đầu với lộ trình của tôi
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl px-8 h-12 text-base"
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              Tìm hiểu thêm
            </Button>
          </motion.div>

          {/* Testimonial Preview */}
          <motion.div
            className="mt-16 max-w-md mx-auto glass rounded-2xl p-6 text-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              "UniPath đã giúp mình hiểu rõ hơn về lộ trình học tập và kết nối các môn học một cách logic."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-blue flex items-center justify-center text-xs font-bold text-primary-foreground">
                NT
              </div>
              <div>
                <p className="text-sm font-semibold">Nguyễn Thảo</p>
                <p className="text-xs text-muted-foreground">Công nghệ phần mềm</p>
              </div>
            </div>
          </motion.div>

          {/* Billing Teaser */}
          <motion.div
            className="mt-6 max-w-md mx-auto glass rounded-2xl p-5 flex items-center justify-between"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm text-muted-foreground">Nâng cấp ngay để có những ưu đãi hấp dẫn.</p>
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg text-xs shrink-0"
              onClick={() => navigate("/billing")}
            >
              Xem gói của tôi
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
