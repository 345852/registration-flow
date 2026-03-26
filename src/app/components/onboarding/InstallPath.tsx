import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function InstallPath() {
  const navigate = useNavigate();
  const [installPath, setInstallPath] = useState("C:\\Program Files\\y3");
  const [addDesktopShortcut, setAddDesktopShortcut] = useState(true);
  const [pathJustChanged, setPathJustChanged] = useState(false);
  const prevPathRef = useRef(installPath);
  const folderInputRef = useRef<HTMLInputElement>(null);

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

  const handleInstall = () => {
    sessionStorage.setItem("pageAccessAllowed", "true");
    navigate("/installing");
  };

  const handleBack = () => {
    navigate("/");
  };

  const applyNewPath = (folderName: string) => {
    const newPath = `C:\\${folderName}\\y3`;
    if (newPath !== prevPathRef.current) {
      setPathJustChanged(true);
      setTimeout(() => setPathJustChanged(false), 1200);
      prevPathRef.current = newPath;
    }
    setInstallPath(newPath);
  };

  const handleChangePath = async () => {
    // 优先尝试原生 File System Access API（桌面客户端中无权限弹窗）
    if ('showDirectoryPicker' in window) {
      try {
        // @ts-ignore
        const directoryHandle = await window.showDirectoryPicker();
        applyNewPath(directoryHandle.name);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        // 降级到 input 方案
      }
    }
    // 降级：通过隐藏的 input 调起系统文件管理器，仅获取文件夹名称
    folderInputRef.current?.click();
  };

  const handleFolderInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const relativePath = files[0].webkitRelativePath;
      const folderName = relativePath.split("/")[0];
      applyNewPath(folderName);
    }
    e.target.value = "";
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
                src="https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Install Path"
                className="w-full h-full object-cover"
              />
              {/* 渐变覆盖层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              {/* 紫色光晕效果 */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20"></div>
            </motion.div>
          </div>

          {/* 下半部分 - 配置区域 */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-sm py-6 px-10 border-t border-purple-500/30"
          >
            {/* 顶部装饰线 */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            
            <div className="space-y-4">
              {/* 安装路径 */}
              <div>
                <div className="text-purple-300 text-sm mb-2 font-medium flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500"></div>
                  安装路径
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span>所需空间: <strong className="text-purple-400">1.6GB</strong></span>
                  <span className="ml-4">可用空间: <strong className="text-green-400">12.7GB</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex-1 flex items-center gap-2.5 bg-gray-800/60 border rounded-md h-10 px-3 transition-all duration-500 ${
                    pathJustChanged 
                      ? 'border-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.35)]' 
                      : 'border-purple-500/30'
                  }`}>
                    <svg className="w-4 h-4 text-purple-400/70 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                    </svg>
                    <span className="text-gray-200 text-sm truncate select-all" title={installPath}>{installPath}</span>
                  </div>
                  <Button 
                    onClick={handleChangePath}
                    className="bg-gray-800/50 border border-purple-500/50 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 px-6 h-10 transition-all duration-300 shrink-0"
                  >
                    更改地址
                  </Button>
                </div>
              </div>

              {/* 安装选项 */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setAddDesktopShortcut(!addDesktopShortcut)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                    addDesktopShortcut
                      ? "bg-gradient-to-br from-purple-600 to-pink-600 border-purple-500 shadow-lg shadow-purple-500/50"
                      : "bg-gray-800/50 border-purple-500/50 hover:border-purple-400"
                  }`}
                >
                  {addDesktopShortcut && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </button>
                <span className="text-gray-300 text-sm">添加桌面快捷方式</span>
              </div>

              {/* 按钮组 */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  onClick={handleBack}
                  className="bg-gray-800/50 border border-purple-500/50 text-purple-300 hover:bg-purple-900/30 hover:border-purple-400 px-10 h-10 transition-all duration-300"
                >
                  上一步
                </Button>
                <Button
                  onClick={handleInstall}
                  className="px-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <span className="relative">立即安装</span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 隐藏的文件夹选择 input，仅用于获取文件夹名称，不读取任何文件内容 */}
      <input
        ref={folderInputRef}
        type="file"
        // @ts-ignore - webkitdirectory 是非标准属性但主流浏览器均支持
        webkitdirectory=""
        className="hidden"
        onChange={handleFolderInputChange}
      />
    </div>
  );
}