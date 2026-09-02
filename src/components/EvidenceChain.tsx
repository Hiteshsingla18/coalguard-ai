import React, { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Send, 
  Download, 
  Layers, 
  Satellite, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  ChevronRight,
  TrendingDown,
  FileText,
  Eye,
  Info
} from 'lucide-react';
import { MineRecord, ViolationStatus } from '../types';

interface EvidenceChainProps {
  mine: MineRecord;
  violationStatus: ViolationStatus;
  onIssueShowCauseNotice: () => void;
  onOpenDossierModal: () => void;
  onBackToOverview: () => void;
}

export default function EvidenceChain({
  mine,
  violationStatus,
  onIssueShowCauseNotice,
  onOpenDossierModal,
  onBackToOverview
}: EvidenceChainProps) {
  const [activeTab, setActiveTab] = useState<'comparison' | 'ndvi' | 'telemetry'>('comparison');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [overlayLease, setOverlayLease] = useState<boolean>(true);
  const [overlayBuffer, setOverlayBuffer] = useState<boolean>(true);

  return (
    <div className="space-y-6 pb-20">
      {/* Evidence Investigation Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                Critical Boundary Violation
              </span>
              <span className="font-mono text-xs text-slate-500 font-semibold">Incident Ref: ENV-082</span>
              <span className="text-slate-300">|</span>
              <span className="font-mono text-xs text-slate-500">Notice ID: SCN-2026-082</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {mine.name}: Statutory Lease Line Encroachment
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Operator: <strong className="text-slate-800">{mine.operator}</strong> &bull; Region: {mine.region}, {mine.state} &bull; Clearance Standard: MoEFCC Rule 14(b)
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={onOpenDossierModal}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Inspection Dossier (PDF)</span>
            </button>
            <button
              id="btn-issue-show-cause-top"
              onClick={onIssueShowCauseNotice}
              className="px-4 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-md text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-white" />
              <span>Issue Show-Cause Notice</span>
            </button>
          </div>
        </div>

        {/* Status Indicator Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Investigation State:</span>
            {violationStatus === 'pending_review' && (
              <span className="text-red-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                Official Review Pending (Awaiting Directorate Notice)
              </span>
            )}
            {violationStatus === 'awaiting_mine_response' && (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Notice Dispatched - Awaiting Mine Response (48h Clock)
              </span>
            )}
            {violationStatus === 'response_submitted_awaiting_verification' && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Operator Response Submitted - Awaiting Official Verification
              </span>
            )}
          </div>

          <div className="text-slate-500 text-[11px] font-mono">
            Breach Area: <strong className="text-red-600 text-xs">{mine.unauthorizedAreaHa || 28} Hectares</strong> Outside Gazetted Boundary
          </div>
        </div>
      </div>

      {/* Primary Satellite Comparison Chamber */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        {/* Chamber Subheader & Controls */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'comparison' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Satellite Multi-Temporal Delta
            </button>
            <button
              onClick={() => setActiveTab('ndvi')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'ndvi' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              NDVI Vegetation Depletion
            </button>
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'telemetry' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200/70'
              }`}
            >
              Corroborating Citizen Reports (14)
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={overlayLease}
                onChange={(e) => setOverlayLease(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-medium">Gazetted Lease Line</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={overlayBuffer}
                onChange={(e) => setOverlayBuffer(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="font-medium">500m Eco-Buffer Zone</span>
            </label>
          </div>
        </div>

        {/* Chamber Content Body */}
        {activeTab === 'comparison' && (
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Baseline Imagery */}
              <div className="border border-slate-300 rounded-lg overflow-hidden bg-slate-950 flex flex-col">
                <div className="p-2.5 bg-slate-900 border-b border-slate-800 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold flex items-center gap-1.5">
                    <Satellite className="w-3.5 h-3.5 text-blue-400" />
                    Baseline Satellite Pass (Dec 2024)
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Cartosat-3 High-Res</span>
                </div>
                <div className="relative h-72 bg-[#121c2b] flex items-center justify-center overflow-hidden">
                  {/* Visual cartographic rendering of permitted mine */}
                  <svg viewBox="0 0 500 300" className="w-full h-full">
                    <rect width="500" height="300" fill="#152132" />
                    {/* Natural forest green surrounding */}
                    <path d="M 300 40 Q 420 80 460 220 T 360 290" fill="#1e3a29" opacity="0.6" />
                    {/* Approved Pit */}
                    <ellipse cx="220" cy="150" rx="140" ry="90" fill="#2d3748" stroke="#4a5568" strokeWidth="2" />
                    <ellipse cx="220" cy="150" rx="100" ry="60" fill="#1a202c" />
                    <ellipse cx="220" cy="150" rx="60" ry="30" fill="#0f172a" />
                    {/* Approved Lease Line (Green) */}
                    {overlayLease && (
                      <polygon points="60,40 380,45 390,260 70,250" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" />
                    )}
                  </svg>
                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    Permitted Active Area: 1,248 Hectares
                  </div>
                </div>
                <div className="p-2.5 bg-slate-900/90 text-slate-300 text-[11px] flex justify-between">
                  <span>Vegetation Cover Index: 0.64 (Intact)</span>
                  <span className="text-emerald-400 font-semibold">&bull; Compliant</span>
                </div>
              </div>

              {/* Current Imagery with Encroachment */}
              <div className="border-2 border-red-500 rounded-lg overflow-hidden bg-slate-950 flex flex-col relative shadow-md">
                <div className="p-2.5 bg-red-950 border-b border-red-900 flex justify-between items-center text-xs text-white">
                  <span className="font-semibold flex items-center gap-1.5 text-red-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    Current Surveillance Scan (26 Aug 2026)
                  </span>
                  <span className="text-[10px] font-mono text-red-300 bg-red-900/60 px-2 py-0.5 rounded">
                    Sentinel-2 MSI Delta Breach
                  </span>
                </div>
                <div className="relative h-72 bg-[#121c2b] flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 500 300" className="w-full h-full">
                    <rect width="500" height="300" fill="#152132" />
                    {/* Deforested surrounding */}
                    <path d="M 300 40 Q 420 80 460 220 T 360 290" fill="#2d3748" opacity="0.8" />
                    {/* Expanded Pit */}
                    <ellipse cx="235" cy="150" rx="160" ry="100" fill="#2d3748" stroke="#4a5568" strokeWidth="2" />
                    <ellipse cx="240" cy="150" rx="120" ry="70" fill="#1a202c" />
                    
                    {/* Approved Boundary Line (Green) */}
                    {overlayLease && (
                      <polygon points="60,40 380,45 390,260 70,250" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" />
                    )}

                    {/* Encroached 28 Hectare Zone (Red Hatching) */}
                    <polygon points="380,45 470,60 480,240 390,260" fill="#ef4444" fillOpacity="0.45" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 2" />
                    
                    {/* Citizen Geotags */}
                    <circle cx="430" cy="90" r="5" fill="#facc15" stroke="#000" strokeWidth="1" />
                    <circle cx="445" cy="140" r="5" fill="#facc15" stroke="#000" strokeWidth="1" />
                    <circle cx="435" cy="195" r="5" fill="#facc15" stroke="#000" strokeWidth="1" />
                  </svg>
                  
                  <div className="absolute top-3 right-3 bg-red-600 text-white font-mono text-xs font-bold px-2.5 py-1 rounded shadow-lg flex items-center gap-1.5 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>+28 Ha Outside Lease Line</span>
                  </div>

                  <div className="absolute bottom-2 left-2 bg-black/75 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    Detected Footprint: 1,276 Hectares
                  </div>
                </div>
                <div className="p-2.5 bg-red-950/90 text-red-200 text-[11px] flex justify-between">
                  <span>Vegetation Cover Index: 0.18 (Severe Drop)</span>
                  <span className="text-red-400 font-bold">&bull; 3 Yellow Pins: Citizen Geotags</span>
                </div>
              </div>
            </div>

            {/* Analytical Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-500">Total Encroached Area</div>
                <div className="text-xl font-bold text-red-600 mt-0.5">28.42 Hectares</div>
                <div className="text-[10px] text-slate-500">Coordinates: 25°01'18"N, 87°23'42"E</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-500">Deforestation Biomass Loss</div>
                <div className="text-xl font-bold text-amber-600 mt-0.5">-71.8% NDVI</div>
                <div className="text-[10px] text-slate-500">18.2 hectares dense Sal forest cleared</div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div className="text-[10px] uppercase font-bold text-slate-500">Corroborating Evidence</div>
                <div className="text-xl font-bold text-slate-900 mt-0.5">14 Citizen Reports</div>
                <div className="text-[10px] text-emerald-600 font-medium">100% Geotag spatial correlation</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: NDVI Vegetation Depletion Curve */}
        {activeTab === 'ndvi' && (
          <div className="p-5 space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900 text-sm">NDVI (Normalized Difference Vegetation Index) Time Series</h3>
                <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-0.5 rounded">
                  Significant Anomaly Detected (p &lt; 0.001)
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Automated spectral analysis demonstrates sharp loss of green biomass along the eastern ridge between February 2026 and August 2026, consistent with heavy machinery earthmoving and tree felling rather than seasonal dry variation.
              </p>

              {/* Simplified high-precision SVG Chart */}
              <div className="h-56 w-full relative bg-white border border-slate-200 rounded p-3">
                <svg viewBox="0 0 600 180" className="w-full h-full">
                  {/* Grid lines */}
                  <line x1="50" y1="20" x2="570" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="60" x2="570" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="100" x2="570" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="140" x2="570" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                  {/* Baseline Permitted Range Threshold (0.5 - 0.7) */}
                  <rect x="50" y="40" width="520" height="45" fill="#10b981" fillOpacity="0.1" />
                  <text x="55" y="55" fill="#059669" fontSize="10" fontWeight="bold">Healthy Baseline Canopy Range</text>

                  {/* NDVI Trend Polyline */}
                  <polyline
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    points="60,45 140,48 220,52 300,65 380,115 460,145 540,152"
                  />

                  {/* Points */}
                  <circle cx="60" cy="45" r="4" fill="#10b981" />
                  <circle cx="140" cy="48" r="4" fill="#10b981" />
                  <circle cx="220" cy="52" r="4" fill="#10b981" />
                  <circle cx="300" cy="65" r="4" fill="#d97706" />
                  <circle cx="380" cy="115" r="4" fill="#dc2626" />
                  <circle cx="460" cy="145" r="4" fill="#dc2626" />
                  <circle cx="540" cy="152" r="5" fill="#dc2626" />

                  {/* Time Labels */}
                  <text x="50" y="170" fill="#64748b" fontSize="10">Jan '25</text>
                  <text x="130" y="170" fill="#64748b" fontSize="10">May '25</text>
                  <text x="210" y="170" fill="#64748b" fontSize="10">Sep '25</text>
                  <text x="290" y="170" fill="#64748b" fontSize="10">Jan '26</text>
                  <text x="370" y="170" fill="#64748b" fontSize="10">Apr '26</text>
                  <text x="450" y="170" fill="#64748b" fontSize="10">Jun '26</text>
                  <text x="520" y="170" fill="#dc2626" fontSize="10" fontWeight="bold">Aug '26</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Corroborating Citizen Reports */}
        {activeTab === 'telemetry' && (
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-slate-700">14 Verified Community Grievances (Simlong & Taljhari)</span>
              <span className="text-xs text-slate-500 font-mono">Geotag Spatial Correlation: 98.4%</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                <div className="p-1.5 bg-red-100 text-red-700 rounded mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Report #CIT-2026-882 &bull; Simlong Village Ward 3</span>
                    <span className="text-[10px] text-slate-400 font-mono">24 Aug 2026, 16:40 IST</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Heavy earthmovers and dumpers began stripping trees beyond boundary milestone 14 yesterday morning. High dust plume drifted directly onto primary school.
                  </p>
                  <div className="mt-1.5 text-[10px] text-blue-700 font-mono">GPS: 25.021°N, 87.398°E (120m from violation boundary)</div>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
                <div className="p-1.5 bg-amber-100 text-amber-800 rounded mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Report #CIT-2026-914 &bull; Taljhari Panchayat</span>
                    <span className="text-[10px] text-slate-400 font-mono">25 Aug 2026, 19:15 IST</span>
                  </div>
                  <p className="text-slate-600 mt-1">
                    Unscheduled blasting vibration exceeded safe limit; cracks noticed in roadside masonry water tank.
                  </p>
                  <div className="mt-1.5 text-[10px] text-blue-700 font-mono">GPS: 25.034°N, 87.412°E (Verified)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Regulatory Dispatch Action Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Statutory Notice Action</div>
          <div className="text-sm font-bold text-slate-900">
            Dispatch Formal Show-Cause Notice SCN-2026-082 to ECL Operator Desk
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Transitions status to <strong className="text-amber-700">"Awaiting Mine Response"</strong> with mandatory 48-hour compliance window.
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onBackToOverview}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-md text-xs font-semibold transition-colors cursor-pointer"
          >
            Back to Overview
          </button>
          <button
            id="btn-issue-show-cause-bottom"
            onClick={onIssueShowCauseNotice}
            className="px-5 py-2.5 bg-[#1E40AF] hover:bg-blue-800 text-white rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Issue Show-Cause Notice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
