import { motion } from "framer-motion";
import { Eye, Lightbulb, HeartHandshake } from "lucide-react";

const logos = ["FPT University", "HCMUT", "UIT", "RMIT", "Hutech", "VGU"];

const values = [
  {
    icon: Eye,
    title: "Clarity",
    desc: "Giúp sinh viên nhìn thấy bức tranh toàn cảnh của chương trình học.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Lộ trình tương tác và trung tâm tài nguyên hiện đại.",
  },
  {
    icon: HeartHandshake,
    title: "Support",
    desc: "Đánh giá và trải nghiệm được chia sẻ từ cộng đồng sinh viên.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Logos */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-8">
            Được tin tưởng và đóng góp bởi cộng đồng sinh viên và giảng viên
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logos.map((logo) => (
              <span
                key={logo}
                className="text-sm font-heading font-semibold text-muted-foreground/50 hover:text-foreground transition-colors duration-300 cursor-default"
              >
                {logo}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Story */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2
            className="font-heading text-3xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Về <span className="gradient-text">UniPath</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            UniPath được tạo ra để giúp sinh viên điều hướng hành trình học tập của mình. 
            Là người bạn đồng hành suốt quãng đời đại học, UniPath hướng dẫn bạn qua các 
            môn học, kết nối các chủ đề, và chuẩn bị cho sự nghiệp tương lai.
          </motion.p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              className="glass rounded-2xl p-8 hover:shadow-glow transition-all duration-500 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <value.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
