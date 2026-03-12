import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error("Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    sessionStorage.setItem("userEmail", email);
    toast.success(isSignUp ? "Đăng ký thành công!" : "Đăng nhập thành công!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <motion.div
        className="glass rounded-2xl p-8 md:p-10 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/" className="font-heading text-xl font-bold gradient-text block text-center mb-8">
          UniPath
        </Link>

        <h1 className="font-heading text-2xl font-bold text-center mb-2">
          {isSignUp ? "Tạo tài khoản mới" : "Welcome back to UniPath"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {isSignUp ? "Đăng ký để bắt đầu hành trình học tập." : "Đăng nhập để tiếp tục hành trình học tập."}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="relative">
              <input
                type="text"
                placeholder="Họ và tên"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-muted rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:ring-2 focus:ring-accent transition-all"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 pl-11 text-sm outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-muted rounded-xl px-4 py-3 pl-11 pr-11 text-sm outline-none focus:ring-2 focus:ring-accent transition-all"
            />
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
            </button>
          </div>

          {!isSignUp && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded accent-accent" />
                <span className="text-muted-foreground">Ghi nhớ đăng nhập</span>
              </label>
              <button type="button" className="text-accent hover:underline">Quên mật khẩu?</button>
            </div>
          )}

          <Button type="submit" className="w-full gradient-blue text-primary-foreground border-0 rounded-xl h-11 mt-2">
            {isSignUp ? "Đăng ký" : "Đăng nhập"}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          {isSignUp ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-accent hover:underline font-medium">
            {isSignUp ? "Đăng nhập" : "Đăng ký"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
