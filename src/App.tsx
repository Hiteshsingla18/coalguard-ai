import React, { useState } from 'react';
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Download, 
  X, 
  Filter, 
  ArrowRight, 
  ExternalLink,
  Users,
  Building2,
  FileText,
  Layers,
  ChevronRight,
  Sparkles,
  Activity,
  Settings,
  HelpCircle,
  Radio,
  Search,
  Scale,
  LogOut,
  ArrowLeftRight
} from 'lucide-react';

import { MineRecord, ViolationStatus, GovNavType, AuthUser } from './types';
import { MINES_DATA } from './data/mines';
import SurveillanceMap from './components/SurveillanceMap';
import MineExplorer from './components/MineExplorer';
import EvidenceChain from './components/EvidenceChain';
import OperatorDesk from './components/OperatorDesk';
import CitizenVigilance from './components/CitizenVigilance';
import RiskPrediction from './components/RiskPrediction';
import RegulatoryCopilot from './components/RegulatoryCopilot';
import AuthGateway from './components/AuthGateway';

export default function App() {
  // Current authenticated user (null shows AuthGateway view)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Navigation: Overview (active by default), Explorer, Evidence, Citizen, Risk, Operator
  const [activeNav, setActiveNav] = useState<GovNavType | 'operator'>('overview');

  // Mine selection and investigation state
  const [mines, setMines] = useState<MineRecord[]>(MINES_DATA);
  const [selectedMine, setSelectedMine] = useState<MineRecord | null>(MINES_DATA[0]); // Default to Rajmahal OCP
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

  // Filters for Overview Map
  const [filterState, setFilterState] = useState<string>('All States');
  const [filterRisk, setFilterRisk] = useState<string>('All Risks');

  // Violation status workflow across government and operator
  const [violationStatus, setViolationStatus] = useState<ViolationStatus>('pending_review');
  
  // Modals & Drawers
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4500);
  };

  const handleSelectMine = (mine: MineRecord) => {
    setSelectedMine(mine);
    setDrawerOpen(true);
    triggerToast(`Active surveillance focused on: ${mine.name}`);
  };

  const handleInvestigateEvidence = (mine?: MineRecord) => {
    if (mine) {
      setSelectedMine(mine);
    }
    setActiveNav('evidence');
    triggerToast(`Evidence investigation loaded for ${mine?.name || selectedMine?.name || 'Rajmahal OCP'}`);
  };

  const handleIssueShowCauseNotice = () => {
    setViolationStatus('awaiting_mine_response');
    triggerToast('Statutory Show-Cause Notice SCN-2026-082 dispatched to ECL Operator Desk (48h countdown active).');
    setActiveNav('operator');
  };

  const handleSubmitFormalResponse = () => {
    setViolationStatus('response_submitted_awaiting_verification');
    triggerToast('Formal clarification received from ECL Operator Desk. Government vigilance notified.');
    setActiveNav('overview');
  };

  // If no user is authenticated, display the interactive Role-Based Login Gateway
  if (!currentUser) {
    return (
      <>
        {/* Toast Notification for Gateway View */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#0A192F] text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-blue-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 max-w-md">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0"></div>
            <p className="flex-1 font-medium">{toastMessage}</p>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <AuthGateway
          onSelectRole={(user) => {
            setCurrentUser(user);
            if (user.role === 'gov') {
              setActiveNav('overview');
              triggerToast(`Authenticated as ${user.name}. Overview Command Center loaded.`);
            } else if (user.role === 'operator') {
              setActiveNav('operator');
              triggerToast(`Authenticated as ${user.name}. Colliery Operator Response Desk loaded.`);
            } else if (user.role === 'citizen') {
              setActiveNav('citizen');
              triggerToast(`Authenticated as ${user.name}. Citizen Environmental Vigilance Desk loaded.`);
            }
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#0A192F] text-white text-xs px-4 py-3 rounded-lg shadow-xl border border-blue-500/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 max-w-md">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0"></div>
          <p className="flex-1 font-medium">{toastMessage}</p>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. RESTORED LEFT SIDEBAR (Width: 260px, Background: #0A192F)             */}
      {/* ========================================================================= */}
      <aside 
        id="command-sidebar"
        className="w-[260px] bg-[#0A192F] text-white flex flex-col shrink-0 min-h-screen border-r border-slate-800 sticky top-0 h-screen z-30 select-none shadow-xl"
      >
        {/* Branding & Active Role Profile at Top */}
        <div className="p-4 border-b border-slate-800/80 shrink-0 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md font-black text-sm shrink-0 ${
              currentUser.role === 'gov' ? 'bg-[#1E40AF]' :
              currentUser.role === 'operator' ? 'bg-amber-600' : 'bg-emerald-600'
            }`}>
              {currentUser.role === 'gov' ? <Shield className="w-5 h-5 text-white" /> :
               currentUser.role === 'operator' ? <Building2 className="w-5 h-5 text-white" /> :
               <Users className="w-5 h-5 text-white" />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white truncate">CoalGuard AI</span>
                <span className="bg-blue-600/30 text-blue-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-500/30 font-mono">
                  v3.4
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-tight truncate mt-0.5">
                {currentUser.role === 'gov' && 'Ministry of Coal • Surveillance Command'}
                {currentUser.role === 'operator' && 'Colliery Operator Desk • ECL'}
                {currentUser.role === 'citizen' && 'Public Environmental Vigilance'}
              </div>
            </div>
          </div>

          {/* Active Role Identity Card with Quick Switch */}
          <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-xs flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider truncate">
                {currentUser.badgeText}
              </div>
              <div className="font-semibold text-white truncate text-[11px] mt-0.5">
                {currentUser.name}
              </div>
            </div>
            <button
              id="btn-sidebar-switch-role"
              onClick={() => {
                setCurrentUser(null);
                triggerToast('Session closed. Returned to Role-Based Login Gateway.');
              }}
              className="text-[10px] text-blue-300 hover:text-white bg-blue-900/40 hover:bg-blue-800/80 px-2 py-1 rounded border border-blue-500/30 transition-colors flex items-center gap-1 cursor-pointer shrink-0 font-medium"
              title="Switch role in Authentication Gateway"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Switch</span>
            </button>
          </div>
        </div>

        {/* Navigation Items (Active state: #1E40AF highlight) */}
        <div className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {currentUser.role === 'gov' && 'Surveillance Command'}
            {currentUser.role === 'operator' && 'Operator Navigation'}
            {currentUser.role === 'citizen' && 'Citizen Portal'}
          </div>

          {/* 1. Overview & Radar */}
          <button
            id="sidebar-nav-overview"
            onClick={() => setActiveNav('overview')}
            className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${
              activeNav === 'overview'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <TrendingUp className={`w-4 h-4 ${activeNav === 'overview' ? 'text-white' : 'text-slate-400'}`} />
            <span className="truncate">
              {currentUser.role === 'operator' ? 'Lease Radar & Satellite Map' : 
               currentUser.role === 'citizen' ? 'Public Mine Map & Boundaries' : 
               'Overview & Radar'}
            </span>
          </button>

          {/* 2. Mine Explorer (Shown for Gov & Operator) */}
          {currentUser.role !== 'citizen' && (
            <button
              id="sidebar-nav-explorer"
              onClick={() => setActiveNav('explorer')}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-3 transition-all cursor-pointer ${
                activeNav === 'explorer'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <MapPin className={`w-4 h-4 ${activeNav === 'explorer' ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">Mine Explorer</span>
            </button>
          )}

          {/* 3. Evidence Center (Shown for Gov & Operator) */}
          {currentUser.role !== 'citizen' && (
            <button
              id="sidebar-nav-evidence"
              onClick={() => setActiveNav('evidence')}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                activeNav === 'evidence'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <AlertTriangle className={`w-4 h-4 ${activeNav === 'evidence' ? 'text-white' : 'text-red-400'}`} />
                <span className="truncate">Evidence Center</span>
              </div>
              <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded font-mono animate-pulse shrink-0">
                1 Active
              </span>
            </button>
          )}

          {/* 4. Citizen Reports (Primary for Citizen, available for Gov) */}
          <button
            id="sidebar-nav-citizen"
            onClick={() => setActiveNav('citizen')}
            className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeNav === 'citizen'
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Users className={`w-4 h-4 ${activeNav === 'citizen' ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">
                {currentUser.role === 'citizen' ? 'Grievance & Violation Desk' : 'Citizen Reports'}
              </span>
            </div>
            <span className="text-[10px] font-bold bg-blue-900/90 text-blue-200 px-1.5 py-0.5 rounded font-mono border border-blue-700/50 shrink-0">
              43
            </span>
          </button>

          {/* 5. Risk & Prediction (Available for Gov & Citizen) */}
          {currentUser.role !== 'operator' && (
            <button
              id="sidebar-nav-risk"
              onClick={() => setActiveNav('risk')}
              className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                activeNav === 'risk'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Activity className={`w-4 h-4 ${activeNav === 'risk' ? 'text-white' : 'text-purple-400'}`} />
                <span className="truncate">Risk &amp; Prediction</span>
              </div>
              <span className="text-[10px] font-bold bg-purple-900/60 text-purple-200 px-1.5 py-0.5 rounded font-mono border border-purple-600/40 shrink-0">
                AI Q4
              </span>
            </button>
          )}

          {/* Operator Desk (Primary for Operator, available for Gov) */}
          {currentUser.role !== 'citizen' && (
            <>
              {currentUser.role === 'gov' && (
                <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  External Operations
                </div>
              )}
              <button
                id="sidebar-nav-operator"
                onClick={() => setActiveNav('operator')}
                className={`w-full px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  activeNav === 'operator'
                    ? 'bg-[#1E40AF] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Building2 className={`w-4 h-4 ${activeNav === 'operator' ? 'text-white' : 'text-slate-400'}`} />
                  <span className="truncate">
                    {currentUser.role === 'operator' ? 'Colliery Response Desk (SCN-082)' : 'Mine Operator Desk'}
                  </span>
                </div>
                {violationStatus === 'awaiting_mine_response' && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                )}
              </button>
            </>
          )}
        </div>

        {/* Bottom of Sidebar */}
        <div className="p-3 space-y-2.5 border-t border-slate-800 bg-[#071324] shrink-0">
          {/* [AI Regulatory Copilot] Button (For Gov & Operator) */}
          {currentUser.role !== 'citizen' && (
            <button
              id="btn-sidebar-copilot"
              onClick={() => setIsCopilotOpen(true)}
              className="w-full bg-gradient-to-r from-blue-900/60 to-indigo-950/80 hover:from-blue-800/80 hover:to-indigo-900/95 border border-blue-500/40 text-white rounded-lg p-2.5 flex items-center justify-between shadow-xs transition-all text-xs font-semibold cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-[#1E40AF] flex items-center justify-center text-blue-200 group-hover:scale-105 transition-transform shadow-2xs">
                  <Sparkles className="w-4 h-4 text-blue-300" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold leading-none text-white">AI Regulatory Copilot</div>
                  <div className="text-[10px] text-blue-300/80 mt-0.5">MoEFCC &amp; DGMS Rules</div>
                </div>
              </div>
              <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded border border-blue-400/30 font-mono">
                Ask &rarr;
              </span>
            </button>
          )}

          {/* System Status Pill */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-slate-200 text-[11px]">
                {currentUser.role === 'operator' ? 'ECL Node Synced' : 'Sentinel-2 Active'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              {currentUser.role === 'operator' ? 'T-48h Active' : '10m Multispectral'}
            </span>
          </div>

          {/* Small Settings and Help Links */}
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <button 
              id="btn-sidebar-settings"
              onClick={() => setShowSettingsModal(true)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
            <span className="text-slate-600">&bull;</span>
            <button 
              id="btn-sidebar-help"
              onClick={() => setShowHelpModal(true)}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help &amp; Protocols</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE CONTAINER (Positioned to the right of the sidebar)      */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP STATUS & COMMAND HEADER */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shrink-0 shadow-2xs">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
            {/* View Breadcrumb / Title */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider truncate">
                {currentUser.role === 'gov' ? 'Surveillance Command' : 
                 currentUser.role === 'operator' ? 'Colliery Operator Desk' : 
                 'Citizen Vigilance'}
              </span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-sm text-slate-900 capitalize truncate">
                {activeNav === 'overview' && 'Overview & Real-Time Radar'}
                {activeNav === 'explorer' && 'National Mine Explorer Table'}
                {activeNav === 'evidence' && 'Evidence Chain Investigation (ENV-082)'}
                {activeNav === 'citizen' && 'Citizen Environmental Vigilance Feed'}
                {activeNav === 'risk' && 'Q4 Breach Risk Analytics Forecast'}
                {activeNav === 'operator' && 'Colliery Operator Clarification Desk (ECL)'}
              </span>
            </div>

            {/* Quick Actions, Identity & Role Switch */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs shrink-0">
              {/* Active User Identity Pill */}
              <div className="flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                  currentUser.role === 'gov' ? 'bg-[#1E40AF]' :
                  currentUser.role === 'operator' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {currentUser.avatarInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <span className="font-semibold text-slate-800 block text-[11px] leading-tight truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] text-slate-500 block leading-tight truncate max-w-[130px]">
                    {currentUser.badgeText}
                  </span>
                </div>
              </div>

              {/* Satellite Sync Indicator (Gov role) */}
              {currentUser.role === 'gov' && (
                <div className="hidden xl:flex items-center gap-2 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-slate-600 font-mono text-[11px]">
                    Satellite Sync: <strong className="text-slate-900">Sentinel-2 (T-2h)</strong>
                  </span>
                </div>
              )}

              {/* Legal Dossier button */}
              <button
                id="btn-top-view-dossier"
                onClick={() => setShowDossierModal(true)}
                className="hidden md:flex text-xs text-[#1E40AF] hover:bg-blue-50 px-2.5 py-1.5 rounded border border-blue-200 font-semibold items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Legal Dossier</span>
              </button>

              {/* Role specific quick toggles */}
              {currentUser.role === 'gov' && (
                activeNav === 'operator' ? (
                  <button
                    onClick={() => setActiveNav('overview')}
                    className="text-xs bg-[#0A192F] hover:bg-slate-800 text-white px-2.5 py-1.5 rounded font-semibold transition-colors cursor-pointer"
                  >
                    Overview Map
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveNav('operator')}
                    className="hidden lg:flex text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded font-semibold items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-600" />
                    <span>Operator Desk</span>
                    {violationStatus === 'awaiting_mine_response' && (
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    )}
                  </button>
                )
              )}

              {/* PROMINENT SWITCH ROLE / SIGN OUT BUTTON */}
              <button
                id="btn-switch-role"
                onClick={() => {
                  setCurrentUser(null);
                  triggerToast('Signed out. Returned to Role-Based Login Gateway.');
                }}
                className="text-xs bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer border border-slate-700 hover:border-blue-400 group"
                title="Switch Role or Sign Out to return to Login Gateway"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-400 transition-colors" />
                <span className="font-medium whitespace-nowrap">Switch Role / Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* MAIN DYNAMIC WORKSPACE ROUTER */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
          {/* ===================================================================== */}
          {/* VIEW 1: OVERVIEW & RADAR (Leaflet Satellite Map + KPI Cards + Drawer)   */}
          {/* ===================================================================== */}
          {activeNav === 'overview' && (
            <div className="space-y-6">
              {/* Telemetry Response Alert Banner (triggers when operator responds) */}
              {violationStatus === 'response_submitted_awaiting_verification' && (
                <div className="bg-emerald-50 border-l-4 border-emerald-600 border-y border-r border-emerald-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-full text-emerald-800 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-emerald-950 text-sm">
                        ECL Operator Response Submitted - Awaiting Official Verification
                      </h3>
                      <p className="text-xs text-emerald-800">
                        Technical clarification and DGPS storm-water diversion embankment annexures received for Rajmahal OCP (Notice SCN-2026-082).
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleInvestigateEvidence()}
                    className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded transition-colors shrink-0 cursor-pointer shadow-xs"
                  >
                    Verify Evidence Chain
                  </button>
                </div>
              )}

              {/* KPI Telemetry Header */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Mines Under Surveillance</div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">1,428</div>
                  <div className="text-xs text-slate-500 mt-0.5">8 Major National Basins</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Critical Boundary Deviations</div>
                  <div className="text-2xl font-bold text-red-600 mt-1 flex items-center gap-2">
                    <span>2 Active</span>
                    <span className="text-[10px] font-bold bg-red-100 text-red-700 px-1.5 py-0.5 rounded uppercase">
                      SCN Issued
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">Rajmahal OCP &amp; Raniganj Deep</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Average Compliance Rating</div>
                  <div className="text-2xl font-bold text-emerald-700 mt-1">87.2%</div>
                  <div className="text-xs text-emerald-600 mt-0.5">&uarr; +2.4% vs prev quarter</div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Citizen Reports Correlated</div>
                  <div className="text-2xl font-bold text-blue-700 mt-1">43 Verified</div>
                  <div className="text-xs text-slate-500 mt-0.5">98.4% AI Satellite match</div>
                </div>
              </div>

              {/* Map Filters & Controls Bar */}
              <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-700 mr-2">
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    <span>Surveillance Filter:</span>
                  </div>

                  <select
                    value={filterState}
                    onChange={(e) => setFilterState(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All States">All Coal States</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                  </select>

                  <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-800 text-xs focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="All Risks">All Risk Classifications</option>
                    <option value="Critical Only">Critical Encroachments Only</option>
                    <option value="Monitor">Advisory Monitoring</option>
                    <option value="Compliant">Statutory Compliant</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveNav('explorer')}
                    className="text-xs font-semibold text-[#1E40AF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Open Full Mine Explorer Table</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Functional Leaflet Map & Slide-out Mine Details Drawer */}
              <div className="flex flex-col lg:flex-row gap-5 items-start">
                {/* Functional Leaflet Map Component (Explicit 600px Height Container) */}
                <div className="flex-1 w-full">
                  <SurveillanceMap
                    mines={mines}
                    selectedMine={selectedMine}
                    onSelectMine={handleSelectMine}
                    onInvestigateEvidence={handleInvestigateEvidence}
                    filterState={filterState}
                    filterRisk={filterRisk}
                  />
                </div>

                {/* Selected Mine Incident & Telemetry Drawer Panel */}
                {drawerOpen && selectedMine && (
                  <div className="w-full lg:w-[380px] bg-white border border-slate-300 rounded-lg shadow-md flex flex-col shrink-0 overflow-hidden">
                    {/* Drawer Header */}
                    <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            selectedMine.status === 'critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                            selectedMine.status === 'monitor' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                            'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              selectedMine.status === 'critical' ? 'bg-red-600 animate-pulse' :
                              selectedMine.status === 'monitor' ? 'bg-amber-600' : 'bg-emerald-600'
                            }`}></span>
                            {selectedMine.status.toUpperCase()}
                          </span>
                          <span className="font-mono text-xs text-slate-500">{selectedMine.id}</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 leading-snug">{selectedMine.name}</h2>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{selectedMine.region}, {selectedMine.state}</span>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Body */}
                    <div className="p-4 space-y-4 text-xs overflow-y-auto max-h-[460px]">
                      {/* Compliance Score Gauge */}
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-slate-600 font-semibold">Statutory Compliance Index</span>
                          <span className={`font-mono font-bold text-sm ${
                            selectedMine.complianceScore < 80 ? 'text-red-600' :
                            selectedMine.complianceScore < 90 ? 'text-amber-600' : 'text-emerald-600'
                          }`}>
                            {selectedMine.complianceScore}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              selectedMine.complianceScore < 80 ? 'bg-red-600' :
                              selectedMine.complianceScore < 90 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${selectedMine.complianceScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Active Violation / Risk Flags */}
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500 mb-2">
                          Surveillance Flags &amp; InSAR Telemetry
                        </div>
                        {selectedMine.flags.length > 0 ? (
                          <div className="space-y-2">
                            {selectedMine.flags.map((flag, idx) => (
                              <div key={idx} className="p-2.5 bg-red-50 border border-red-200 rounded-md flex items-start gap-2.5">
                                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <div className="font-bold text-red-950">{flag.title}</div>
                                  <div className="text-slate-600 text-[11px] mt-0.5">{flag.note}</div>
                                </div>
                                <span className="font-mono text-[10px] font-bold bg-red-200/60 text-red-900 px-1.5 py-0.5 rounded">
                                  Sev: {flag.severity}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs">
                            No active perimeter or slope violations detected.
                          </div>
                        )}
                      </div>

                      {/* Metadata Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="text-[10px] uppercase text-slate-500 font-semibold">Operator</div>
                          <div className="font-semibold text-slate-800 truncate">{selectedMine.operator}</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="text-[10px] uppercase text-slate-500 font-semibold">Last Inspection</div>
                          <div className="font-semibold text-slate-800">{selectedMine.lastInspection}</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="text-[10px] uppercase text-slate-500 font-semibold">Permit Expiry</div>
                          <div className="font-semibold text-slate-800">{selectedMine.permitExp}</div>
                        </div>
                        <div className="p-2 bg-slate-50 rounded border border-slate-200">
                          <div className="text-[10px] uppercase text-slate-500 font-semibold">Citizen Reports</div>
                          <div className="font-semibold text-slate-800">{selectedMine.activeReports} Active</div>
                        </div>
                      </div>
                    </div>

                    {/* Drawer Bottom CTA */}
                    <div className="p-4 border-t border-slate-200 bg-slate-50">
                      <button
                        id="btn-investigate-evidence-drawer"
                        onClick={() => handleInvestigateEvidence(selectedMine)}
                        className="w-full bg-[#1E40AF] hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-md transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <span>Investigate Evidence Chain</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* VIEW 2: MINE EXPLORER (Data Table)                                     */}
          {/* ===================================================================== */}
          {activeNav === 'explorer' && (
            <MineExplorer
              mines={mines}
              onSelectMine={handleSelectMine}
              onInvestigateEvidence={handleInvestigateEvidence}
              onNavigateToOverview={() => setActiveNav('overview')}
            />
          )}

          {/* ===================================================================== */}
          {/* VIEW 3: EVIDENCE CHAIN INVESTIGATION (ENV-082)                         */}
          {/* ===================================================================== */}
          {activeNav === 'evidence' && (
            <EvidenceChain
              mine={selectedMine || mines[0]}
              violationStatus={violationStatus}
              onIssueShowCauseNotice={handleIssueShowCauseNotice}
              onOpenDossierModal={() => setShowDossierModal(true)}
              onBackToOverview={() => setActiveNav('overview')}
            />
          )}

          {/* ===================================================================== */}
          {/* VIEW 4: CITIZEN ENVIRONMENTAL VIGILANCE (43 Verified Reports)          */}
          {/* ===================================================================== */}
          {activeNav === 'citizen' && (
            <CitizenVigilance
              mines={mines}
              onNavigateToGovCommand={() => setActiveNav('overview')}
              onReportSubmittedToast={() => triggerToast('Verified citizen report submitted & queued for satellite correlation.')}
            />
          )}

          {/* ===================================================================== */}
          {/* VIEW 5: RISK & PREDICTION (Q4 Breach Risk Analytics Forecast)          */}
          {/* ===================================================================== */}
          {activeNav === 'risk' && (
            <RiskPrediction
              mines={mines}
              onInvestigateEvidence={handleInvestigateEvidence}
            />
          )}

          {/* ===================================================================== */}
          {/* VIEW 6: MINE OPERATOR DESK                                             */}
          {/* ===================================================================== */}
          {activeNav === 'operator' && (
            <OperatorDesk
              violationStatus={violationStatus}
              onSubmitFormalResponse={handleSubmitFormalResponse}
              onNavigateToGovCommand={() => setActiveNav('overview')}
            />
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. AI REGULATORY COPILOT SLIDE-OUT DRAWER (Right-hand drawer)            */}
      {/* ========================================================================= */}
      <RegulatoryCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        selectedMine={selectedMine}
        onNavigateToEvidence={() => {
          setActiveNav('evidence');
          setIsCopilotOpen(false);
        }}
      />

      {/* ========================================================================= */}
      {/* 4. MODALS (Settings, Help & Protocols, Legal Dossier)                     */}
      {/* ========================================================================= */}

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Settings className="w-5 h-5 text-[#1E40AF]" />
                <span>Surveillance System Configuration</span>
              </div>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Satellite Cadence Pipeline</div>
                <div className="text-slate-500">Sentinel-2 constellation automated 5-day cycle. Ground resolution: 10m multispectral.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">InSAR Surface Displacement Threshold</div>
                <div className="text-slate-500">Sentinel-1 SAR deformation alerts trigger automatically when bench displacement &gt; 2.5 cm/week.</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Gazetted Lease Boundary Layer</div>
                <div className="text-slate-500">Synchronized with Survey of India &amp; Ministry of Coal cadastre shapefiles.</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  triggerToast('Surveillance telemetry parameters verified & active.');
                  setShowSettingsModal(false);
                }}
                className="px-4 py-2 bg-[#1E40AF] hover:bg-blue-800 text-white font-semibold text-xs rounded cursor-pointer"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Protocols Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <HelpCircle className="w-5 h-5 text-[#1E40AF]" />
                <span>Statutory Mining Vigilance Protocols</span>
              </div>
              <button 
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-950">
                <strong>Standard Operating Procedure for Boundary Breaches:</strong>
                <ol className="list-decimal pl-4 mt-1.5 space-y-1 text-slate-700">
                  <li>Automated satellite multi-temporal delta detects unauthorized excavation (&gt;1.0 Ha).</li>
                  <li>Evidence Dossier generated with Cartosat-3 and Sentinel-2 NDVI overlay.</li>
                  <li>Statutory Show-Cause Notice issued under Regulation 109 of Coal Mines Regulations 2017 with 48-hour deadline.</li>
                  <li>Operator submits DGPS survey and slope explanation via Operator Desk.</li>
                </ol>
              </div>

              <div className="text-slate-500 text-[11px]">
                Direct technical queries to Directorate General of Mines Safety (DGMS), Dhanbad, Jharkhand.
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded border border-slate-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Inspection Dossier Modal */}
      {showDossierModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 bg-[#0A192F] text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-sm">Official Statutory Inspection Dossier (PDF Preview)</span>
              </div>
              <button 
                onClick={() => setShowDossierModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 font-serif text-slate-900 text-xs">
              <div className="border-b-2 border-slate-900 pb-3 text-center">
                <div className="font-bold text-sm tracking-wide uppercase font-sans">Ministry of Coal &bull; Government of India</div>
                <div className="text-[11px] font-sans text-slate-600">Directorate General of Mines Vigilance &amp; Environmental Oversight</div>
                <div className="font-bold text-xs mt-1 text-red-700 font-sans">STATUTORY INSPECTION &amp; SHOW-CAUSE DOSSIER #ENV-082</div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-sans bg-slate-50 p-3 rounded border border-slate-200">
                <div><strong>Subject Mine:</strong> Rajmahal Open Cast Project (OCP)</div>
                <div><strong>Operator:</strong> Eastern Coalfields Limited (ECL)</div>
                <div><strong>Clearance Ref:</strong> MoEFCC Rule 14(b) - Statutory Boundary Adherence</div>
                <div><strong>Assessed Area:</strong> 1,276 Ha (Permitted: 1,248 Ha)</div>
              </div>

              <div className="space-y-2 text-justify leading-relaxed">
                <p>
                  <strong>1. Geospatial Breach Finding:</strong> Automated multi-spectral satellite comparison (Sentinel-2 and Cartosat-3) confirmed active coal winning and heavy earthmoving over 28.42 hectares outside the gazetted lease boundary of Rajmahal OCP, Godda district, Jharkhand.
                </p>
                <p>
                  <strong>2. Community Corroboration:</strong> 14 citizen geotagged reports from Simlong and Taljhari village clusters independently verify dust drift and perimeter tree clearing.
                </p>
                <p>
                  <strong>3. Statutory Enforcement Directive:</strong> ECL is directed to submit a formal engineering explanation and differential GPS survey within 48 hours under Regulation 109 of Coal Mines Regulations 2017.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-300 flex justify-between items-end font-sans text-[11px]">
                <div>
                  <span className="font-bold block">Status:</span>
                  <span className="text-amber-700 font-semibold">{violationStatus.replace(/_/g, ' ').toUpperCase()}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">Authorized Inspecting Officer</div>
                  <div className="text-slate-500">Directorate General of Mines Vigilance</div>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-100 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => {
                  triggerToast('Official Dossier certified PDF downloaded.');
                  setShowDossierModal(false);
                }}
                className="px-4 py-1.5 bg-[#1E40AF] hover:bg-blue-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </button>
              <button
                onClick={() => setShowDossierModal(false)}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 text-xs font-semibold rounded hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
