import React, { useState } from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Check, 
  Layers, 
  Cpu, 
  Smartphone, 
  ShoppingBag, 
  Plus, 
  Minus, 
  RefreshCw,
  CreditCard,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // State for Mobile Inventory Shop interactive simulation
  const [stockItems, setStockItems] = useState([
    { id: 'SKU-891', name: 'OLED Display Panel 6.7"', stock: 42, threshold: 15, category: 'Screens' },
    { id: 'SKU-442', name: 'Lithium Polymer 4500mAh', stock: 12, threshold: 20, category: 'Batteries' },
    { id: 'SKU-109', name: 'USB-C Fast Charging Flex', stock: 88, threshold: 25, category: 'Connectors' },
  ]);

  // State for Clothing E-Commerce interactive simulation
  const [cartCount, setCartCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(138);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // State for Throughput simulation
  const [throughputBenchmark, setThroughputBenchmark] = useState<number | null>(null);

  const updateStock = (id: string, delta: number) => {
    setStockItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  const runThroughputTest = () => {
    setThroughputBenchmark(null);
    setTimeout(() => {
      setThroughputBenchmark(Math.floor(Math.random() * 80) + 1420);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        className="relative w-full max-w-4xl bg-[#0b0f19] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              {project.badge}
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            id="modal-close-btn"
            className="p-2 rounded-xl bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          
          {/* Summary & Tags */}
          <div className="space-y-4">
            <p className="text-base text-slate-300 leading-relaxed">
              {project.longDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Live Demo Sandbox */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Interactive Live Simulator
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {project.id === 'mobile-inventory-shop' ? 'Mobile Stock Admin' : project.id === 'clothing-ecommerce-store' ? 'E-Commerce Storefront' : 'Latency Engine'}
              </span>
            </div>

            {/* Mobile Inventory Shop Simulation */}
            {project.id === 'mobile-inventory-shop' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-400">
                  Try adjusting inventory count in real-time. Notice instant status alert on low threshold:
                </div>
                <div className="space-y-2.5">
                  {stockItems.map((item) => {
                    const isLow = item.stock <= item.threshold;
                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{item.id}</span>
                            <span>•</span>
                            <span className={isLow ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                              {isLow ? `Low Stock Alert (${item.stock} left)` : `In Stock (${item.stock} units)`}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateStock(item.id, -1)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-sm font-bold text-white">
                            {item.stock}
                          </span>
                          <button
                            onClick={() => updateStock(item.id, 1)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clothing E-Commerce Store Simulation */}
            {project.id === 'clothing-ecommerce-store' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-white">Minimalist Wool Knit Crewneck</div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Size: M / Charcoal</span>
                      <span className="font-mono text-cyan-400 font-bold">$78.00</span>
                    </div>
                    <button
                      onClick={() => {
                        setCartCount((c) => c + 1);
                        setCartTotal((t) => t + 78);
                      }}
                      className="w-full py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
                    >
                      + Add to Cart
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="text-xs font-semibold text-white">Tailored Linen Blend Trouser</div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Size: 32 / Black</span>
                      <span className="font-mono text-cyan-400 font-bold">$60.00</span>
                    </div>
                    <button
                      onClick={() => {
                        setCartCount((c) => c + 1);
                        setCartTotal((t) => t + 60);
                      }}
                      className="w-full py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-colors"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>

                {/* Checkout Bar */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-300">
                    <span className="font-mono font-bold text-white">{cartCount} items</span> in Cart • Total: <span className="font-mono font-bold text-emerald-400">${cartTotal}.00</span>
                  </div>

                  <button
                    onClick={() => {
                      setPaymentSuccess(true);
                      setTimeout(() => setPaymentSuccess(false), 3000);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{paymentSuccess ? 'Stripe Verified!' : 'Simulate Stripe Checkout'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Throughput Engine Simulation */}
            {project.id === 'django-throughput-pipeline' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Load Concurrency Benchmark:</span>
                  <button
                    onClick={runThroughputTest}
                    className="px-3 py-1 rounded bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
                  >
                    Run Concurrent Test
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-around text-center">
                  <div>
                    <div className="text-[11px] text-slate-400">Throughput</div>
                    <div className="text-lg font-mono font-bold text-cyan-400">
                      {throughputBenchmark ? `${throughputBenchmark} req/sec` : '1,450 req/sec'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Average P99 Latency</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">38 ms</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Zero Error Rate</div>
                    <div className="text-lg font-mono font-bold text-white">100.0%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Features & Architecture Checklist */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
                System Highlights
              </h4>
              <div className="space-y-2">
                {project.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Measurable Outcomes
              </h4>
              <div className="space-y-2">
                {project.metrics.map((met, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{met}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer Links */}
        <div className="px-6 py-5 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
