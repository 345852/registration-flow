import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Save,
  Undo,
  Redo,
  Image,
  Type,
  Eye,
  Upload,
  Download,
  Menu,
  Search,
  Plus,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import exampleImage from "figma:asset/8fa6faf01234c43701feb1efe30c0c740068058e.png";
import { useNavigate } from "react-router";

export function EditorMain() {
  const navigate = useNavigate();
  const [selectedLayer, setSelectedLayer] = useState<string | null>("触发文本");
  const [showLifecyclePage, setShowLifecyclePage] = useState(true);

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

  const layers = [
    { id: "game-group", name: "游戏画板组", type: "group", visible: true },
    { id: "text-1", name: "文本", type: "text", visible: true, parent: "game-group" },
    { id: "function-group", name: "技能使用画板组", type: "group", visible: true },
    { id: "image-1", name: "图片", type: "image", visible: true, parent: "function-group" },
    { id: "text-2", name: "文本", type: "text", visible: true, parent: "function-group" },
    { id: "chat-group", name: "聊天画板组", type: "group", visible: true },
    {
      id: "custom-group",
      name: "【用户自定义画板组】",
      type: "group",
      visible: false,
    },
    {
      id: "trigger-text",
      name: "触发文本",
      type: "text",
      visible: true,
      parent: "custom-group",
    },
    {
      id: "lifecycle-page",
      name: "生级页面",
      type: "page",
      visible: true,
      parent: "custom-group",
    },
  ];

  return (
    <div className="h-screen bg-[#1a1a1a] flex flex-col overflow-hidden">
      {/* 顶部工具栏 */}
      <div className="h-14 bg-[#252525] border-b border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-semibold">UI编辑器</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <FileText className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-gray-400 text-sm">F: /财经新闻监控平台.zip</div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Redo className="w-4 h-4" />
          </Button>
          <div className="w-px h-6 bg-gray-700 mx-2"></div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Eye className="w-4 h-4" />
            <span className="ml-1">预览</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Upload className="w-4 h-4" />
            <span className="ml-1">导入</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Download className="w-4 h-4" />
            <span className="ml-1">导出</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧边栏 - 图层面板 */}
        <div className="w-64 bg-[#1f1f1f] border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-white font-semibold mb-3">画布图层</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="搜索图层名称"
                className="pl-9 bg-[#252525] border-gray-700 text-white text-sm"
              />
            </div>
            <Button
              size="sm"
              className="w-full mt-2 bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800"
            >
              <Plus className="w-4 h-4 mr-1" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {layers.map((layer) => {
              const isParent = !layer.parent;
              const isSelected = selectedLayer === layer.id;

              return (
                <div
                  key={layer.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer group ${
                    isParent ? "" : "ml-4"
                  } ${
                    isSelected ? "bg-blue-600/20" : "hover:bg-gray-800"
                  }`}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  <button className="text-gray-500 hover:text-white">
                    {layer.visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  {layer.type === "text" && <Type className="w-4 h-4 text-gray-400" />}
                  {layer.type === "image" && <Image className="w-4 h-4 text-gray-400" />}
                  {layer.type === "page" && <FileText className="w-4 h-4 text-gray-400" />}
                  {layer.type === "group" && <Menu className="w-4 h-4 text-gray-400" />}
                  <span
                    className={`text-sm flex-1 ${
                      isSelected ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {layer.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 中间画布区域 */}
        <div className="flex-1 bg-[#1a1a1a] overflow-auto relative">
          {/* 工具栏 */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-[#252525] rounded-lg border border-gray-800 p-2 flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-purple-500">
              <span className="text-purple-500">●</span>
              <span className="ml-1">背景颜色</span>
            </Button>
            <div className="w-px h-6 bg-gray-700"></div>
            <select className="bg-transparent text-white text-sm border-none outline-none px-2">
              <option>无</option>
              <option>网格</option>
            </select>
            <select className="bg-transparent text-white text-sm border-none outline-none px-2">
              <option>25%</option>
              <option>50%</option>
              <option>75%</option>
              <option>100%</option>
            </select>
            <div className="text-gray-400 text-sm px-2">分辨率: 1920*1080</div>
          </div>

          {/* 画布内容 */}
          <div className="flex items-center justify-center min-h-full p-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-[#2a2a2a] rounded-lg shadow-2xl relative"
              style={{ width: "800px", height: "600px" }}
            >
              {/* 画布内容 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={exampleImage}
                  alt="Canvas content"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 右侧边栏 - 属性面板 */}
        <div className="w-80 bg-[#1f1f1f] border-l border-gray-800 flex flex-col">
          <div className="border-b border-gray-800">
            <div className="flex">
              <button className="flex-1 py-3 text-white border-b-2 border-purple-600">
                属性
              </button>
              <button className="flex-1 py-3 text-gray-400">事件</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-4">
              新建交互
            </Button>

            <div className="bg-[#2a2a2a] rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white">
                    <Menu className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <span className="text-white">单击</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
                <Eye className="w-4 h-4" />
                <span>隐藏 生级页面</span>
              </div>

              <button className="text-blue-500 text-sm mt-3 flex items-center gap-1">
                <Plus className="w-3 h-3" />
                添加交互
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}