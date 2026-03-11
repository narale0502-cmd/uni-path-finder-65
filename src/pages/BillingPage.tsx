import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    price: "Miễn phí",
    period: "",
    description: "Dành cho sinh viên mới khám phá lộ trình",
    features: [
      "Xem tổng quan môn học (mô tả, tiên quyết)",
      "Theo dõi tiến độ với thanh tiến trình",
      "Truy cập sự kiện công khai",
    ],
    cta: "Bắt đầu miễn phí",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "29k",
    period: "/tháng",
    description: "Dành cho sinh viên muốn đào sâu và phát triển",
    features: [
      "Tất cả tính năng Starter",
      "Xem toàn bộ lộ trình ngành và môn học",
      "Truy cập đánh giá và mẹo từ cộng đồng",
      "Kho tài liệu: đề thi mẫu, slides",
      "Gợi ý lộ trình cá nhân hóa",
      "Hỗ trợ ưu tiên",
    ],
    cta: "Nâng cấp Professional",
    highlighted: true,
  },
];

const BillingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Chọn gói <span className="gradient-text">phù hợp</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Bắt đầu miễn phí, nâng cấp khi bạn cần nhiều hơn.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`rounded-2xl p-8 relative ${
                  plan.highlighted
                    ? "gradient-blue text-primary-foreground shadow-glow"
                    : "glass"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background text-foreground text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Phổ biến nhất
                  </span>
                )}

                <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-4 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className={`text-sm ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-primary-foreground" : "text-accent"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl h-11 ${
                    plan.highlighted
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "gradient-blue text-primary-foreground border-0"
                  }`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BillingPage;
