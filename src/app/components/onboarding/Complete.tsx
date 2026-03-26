import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Complete() {
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否有导航权限
    const hasAccess = sessionStorage.getItem("pageAccessAllowed");
    if (!hasAccess) {
      navigate("/", { replace: true });
      return;
    }
    // 消费掉这个标记
    sessionStorage.removeItem("pageAccessAllowed");
  }, [navigate]);

  const handleLaunch = () => {
    sessionStorage.setItem("pageAccessAllowed", "true");
    navigate("/splash");
  };

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center overflow-hidden">
      <div className="w-[920px] h-[580px] bg-gradient-to-b from-gray-900 to-black relative shadow-2xl border border-purple-500/30 overflow-hidden">
        {/* 窗口控制按钮 */}
        <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-purple-500/20 transition-colors group">
            <div className="w-4 h-0.5 bg-purple-400/60 group-hover:bg-purple-300 transition-colors"></div>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-500/20 transition-colors group">
            <div className="text-purple-400/60 group-hover:text-red-400 text-2xl leading-none transition-colors">
              ×
            </div>
          </button>
        </div>

        <div className="h-full flex flex-col">
          {/* 上半部分 - 铺满图片 */}
          <div className="relative flex-1 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1767016452826-815c7b4765ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Complete"
                className="w-full h-full object-cover"
              />
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              {/* 紫色光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-transparent to-pink-600/30"></div>
              
              {/* 成功图标覆盖层 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.3,
                  }}
                  className="relative"
                >
                  {/* 外圈发光 */}
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-xl opacity-60"></div>
                  
                  {/* 主圆圈 */}
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center border-4 border-white/20 shadow-2xl">
                    {/* 内部高光 */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    
                    {/* 对勾图标 */}
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="w-16 h-16 text-white relative z-10"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <motion.path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  </div>
                  
                  {/* 粒子爆炸效果 */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                      }}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i / 12) * Math.PI * 2) * 80,
                        y: Math.sin((i / 12) * Math.PI * 2) * 80,
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              {/* 成功文字 */}
              <div className="absolute inset-0 flex items-end justify-center pb-24">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 mb-2">
                    安装成功
                  </div>
                  <div className="text-sm text-gray-400">
                    热血编辑器已准备就绪
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 下半部分 - 按钮区域 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm py-8 px-12 border-t border-purple-500/30"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="flex justify-center">
              <Button
                onClick={handleLaunch}
                className="px-16 py-6 text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                ></motion.div>
                <span className="relative">立即体验</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}