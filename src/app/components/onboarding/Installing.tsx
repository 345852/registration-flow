import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function Installing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("热血编辑器正在安装中.....");
  const [subStep, setSubStep] = useState("热血编辑器下载中.....");

  useEffect(() => {
    // 检查是否有导航权限
    const hasAccess = sessionStorage.getItem("pageAccessAllowed");
    if (!hasAccess) {
      navigate("/", { replace: true });
      return;
    }
    // 消费掉这个标记
    sessionStorage.removeItem("pageAccessAllowed");

    // 模拟安装进度
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem("pageAccessAllowed", "true");
            navigate("/complete");
          }, 500);
          return 100;
        }
        
        // 根据进度更新状态文本
        if (prev < 30) {
          setCurrentStep("正在下载安装包.....");
          setSubStep("热血编辑器下载中.....");
        } else if (prev < 60) {
          setCurrentStep("正在解压文件.....");
          setSubStep("解压核心组件中.....");
        } else if (prev < 90) {
          setCurrentStep("正在安装组件.....");
          setSubStep("配置环境变量.....");
        } else {
          setCurrentStep("即将完成.....");
          setSubStep("正在创建快捷方式.....");
        }
        
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

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
                src="https://images.unsplash.com/photo-1616093700899-dddbfc0fe7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Installing"
                className="w-full h-full object-cover"
              />
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              {/* 紫色光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20"></div>
              
              {/* 动态粒子效果 */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    initial={{
                      x: Math.random() * 920,
                      y: Math.random() * 400,
                      opacity: 0,
                    }}
                    animate={{
                      y: [null, Math.random() * 400 - 200],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* 下半部分 - 进度区域 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm py-6 px-10 border-t border-purple-500/30"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="space-y-3">
              {/* 安装状态文本 */}
              <div className="text-purple-300 text-sm font-medium">{currentStep}</div>
              <div className="text-gray-400 text-xs">{subStep}</div>

              {/* 游戏化进度条 */}
              <div className="relative w-full h-8 bg-gray-900/80 rounded-lg overflow-hidden border border-purple-500/30">
                {/* 背景网格效果 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(139, 92, 246, 0.1) 10px, rgba(139, 92, 246, 0.1) 11px)',
                  }}></div>
                </div>
                
                {/* 进度条主体 */}
                <motion.div
                  className="h-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 渐变背景 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600"></div>
                  
                  {/* 动画光效 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  ></motion.div>
                  
                  {/* 顶部高光 */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent"></div>
                </motion.div>
                
                {/* 进度百分比 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-bold drop-shadow-lg z-10">
                    {progress.toFixed(0)} %
                  </span>
                </div>
                
                {/* 边框发光效果 */}
                <div className="absolute inset-0 rounded-lg shadow-inner shadow-purple-500/50 pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}