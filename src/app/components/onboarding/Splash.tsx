import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Splash() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 检查是否有导航权限
    const hasAccess = sessionStorage.getItem("pageAccessAllowed");
    if (!hasAccess) {
      navigate("/", { replace: true });
      return;
    }
    // 消费掉这个标记
    sessionStorage.removeItem("pageAccessAllowed");

    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            window.open("https://surf-salon-01386318.figma.site", "_blank");
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
      <div className="w-[920px] h-[580px] bg-gradient-to-b from-gray-900 to-black relative shadow-2xl border border-purple-500/30 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="h-full flex flex-col"
        >
          {/* 上半部分 - 铺满图片 */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686749115547-897913fe1b61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Splash"
                className="w-full h-full object-cover"
              />
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              {/* 紫色光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30"></div>
              
              {/* 动态光环效果 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-64 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                ></motion.div>
              </div>
              
              {/* Logo/图标居中 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-center"
                >
                  {/* LOGO占位符 */}
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-8 mx-auto shadow-2xl border-4 border-white/10">
                    <svg
                      className="w-20 h-20 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="14" rx="2" />
                      <circle cx="8" cy="9" r="2" />
                      <path d="M3 13l4-4 4 4 6-6 4 4" />
                    </svg>
                  </div>
                  
                  {/* 产品名称 */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 mb-4"
                  >
                    热血编辑器
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 下半部分 - 版本信息 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm py-8 px-12 border-t border-purple-500/30"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="text-center space-y-4">
              {/* 版本信息 */}
              <div className="text-purple-300 text-xl font-medium">
                Version 2.3.13
              </div>

              {/* 加载进度文字 */}
              <div className="text-gray-400 text-sm">
                loading......{progress.toFixed(0)}%
              </div>
              
              {/* 进度条 */}
              <div className="max-w-md mx-auto">
                <div className="relative w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* 光效动画 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    ></motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}