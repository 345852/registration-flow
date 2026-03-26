import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface FolderPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (path: string) => void;
  currentPath: string;
}

export function FolderPicker({ isOpen, onClose, onSelect, currentPath }: FolderPickerProps) {
  const [selectedPath, setSelectedPath] = useState(currentPath);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    "C:\\": true,
    "C:\\Program Files": true
  });

  const mockFileSystem = [
    {
      name: "C:",
      path: "C:\\",
      children: [
        { name: "Program Files", path: "C:\\Program Files", children: [{ name: "y3", path: "C:\\Program Files\\y3" }] },
        { name: "Users", path: "C:\\Users", children: [{ name: "Admin", path: "C:\\Users\\Admin" }] },
        { name: "Windows", path: "C:\\Windows" }
      ]
    },
    {
      name: "D:",
      path: "D:\\",
      children: [
        { name: "Games", path: "D:\\Games" },
        { name: "Software", path: "D:\\Software" },
        { name: "Work", path: "D:\\Work" }
      ]
    }
  ];

  const toggleExpand = (path: string) => {
    setExpandedNodes(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const renderTree = (nodes: any[], depth = 0) => {
    return nodes.map(node => {
      const isExpanded = expandedNodes[node.path];
      const hasChildren = node.children && node.children.length > 0;
      const isSelected = selectedPath === node.path;

      return (
        <div key={node.path} className="select-none">
          <div 
            className={`flex items-center py-1 px-2 cursor-pointer rounded-sm text-sm transition-colors ${
              isSelected ? 'bg-purple-600/40 text-purple-200' : 'text-gray-300 hover:bg-white/5'
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
            onClick={() => setSelectedPath(node.path)}
          >
            <div 
              className="w-4 h-4 mr-1 flex items-center justify-center text-gray-500"
              onClick={(e) => {
                if (hasChildren) {
                  e.stopPropagation();
                  toggleExpand(node.path);
                }
              }}
            >
              {hasChildren ? (
                <span className="text-xs">{isExpanded ? '▼' : '▶'}</span>
              ) : null}
            </div>
            <svg className="w-4 h-4 mr-2 text-yellow-500/80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span>{node.name}</span>
          </div>
          {isExpanded && hasChildren && (
            <div>{renderTree(node.children, depth + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-[500px] h-[380px] bg-gray-900 border border-purple-500/30 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
              <h3 className="text-sm font-medium text-gray-200">选择文件夹</h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
              <div className="text-xs text-gray-400">请选择你要安装到的文件夹：</div>
              
              {/* Tree View */}
              <div className="flex-1 overflow-auto bg-black/40 border border-white/10 rounded p-2 custom-scrollbar">
                <div className="flex items-center py-1 px-2 text-sm text-gray-200">
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  此电脑
                </div>
                {renderTree(mockFileSystem, 1)}
              </div>

              {/* Selected Path */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 whitespace-nowrap">文件夹:</span>
                <input 
                  type="text" 
                  value={selectedPath}
                  readOnly
                  className="flex-1 bg-black/40 border border-white/10 rounded px-3 py-1.5 text-sm text-gray-200 outline-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-4 py-3 border-t border-white/10 bg-black/40">
              <Button 
                onClick={onClose}
                className="h-8 px-6 bg-transparent border border-gray-600 text-gray-300 hover:bg-white/5 hover:text-white"
              >
                取消
              </Button>
              <Button 
                onClick={() => {
                  onSelect(selectedPath);
                  onClose();
                }}
                className="h-8 px-6 bg-purple-600 hover:bg-purple-500 text-white"
              >
                确定
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}