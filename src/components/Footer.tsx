import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <button onClick={() => scrollTo("hero")} className="font-heading text-xl font-bold gradient-text">
              UniPath
            </button>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Nền tảng giúp sinh viên định hướng học tập và phát triển sự nghiệp.
            </p>
            <div className="flex gap-3 mt-5">
              {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg bg-muted hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Sản phẩm</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("/diagram")} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">Lộ trình</button>
              <button onClick={() => navigate("/events")} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">Sự kiện</button>
              <button onClick={() => navigate("/billing")} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">Bảng giá</button>
              <button onClick={() => navigate("/diagram")} className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">Cộng đồng</button>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Hỗ trợ</h4>
            <div className="flex flex-col gap-2">
              {["Câu hỏi thường gặp", "Liên hệ", "Điều khoản sử dụng", "Chính sách bảo mật"].map((item) => (
                <span key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{item}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Liên hệ</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contact@unipath.edu.vn</span>
              <span>+84 123 456 789</span>
              <span>TP. Hồ Chí Minh, Việt Nam</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UniPath. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
