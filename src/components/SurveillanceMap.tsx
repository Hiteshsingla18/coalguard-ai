import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MineRecord } from '../types';
import { Layers, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

interface SurveillanceMapProps {
  mines: MineRecord[];
  selectedMine: MineRecord | null;
  onSelectMine: (mine: MineRecord) => void;
  onInvestigateEvidence: (mine: MineRecord) => void;
  filterState: string;
  filterRisk: string;
}

export default function SurveillanceMap({
  mines,
  selectedMine,
  onSelectMine,
  onInvestigateEvidence,
  filterState,
  filterRisk
}: SurveillanceMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const overlaysLayerRef = useRef<L.LayerGroup | null>(null);
  const [mapType, setMapType] = useState<'satellite' | 'topo' | 'street'>('satellite');
  const [showBoundaryLayers, setShowBoundaryLayers] = useState<boolean>(true);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Centered on Eastern India Mining Corridor (Jharkhand, Bengal, Odisha, Chhattisgarh)
    const map = L.map(mapContainerRef.current, {
      center: [23.9, 85.8],
      zoom: 7,
      zoomControl: false,
      attributionControl: false
    });

    // Base Tile layers
    const satelliteTiles = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        maxZoom: 18,
        attribution: 'Esri, Maxar, Earthstar Geographics'
      }
    );

    const streetTiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }
    );

    const topoTiles = L.tileLayer(
      'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 17,
        attribution: 'OpenTopoMap'
      }
    );

    satelliteTiles.addTo(map);
    (map as any)._customTileLayers = { satelliteTiles, streetTiles, topoTiles };
    (map as any)._activeTileLayer = satelliteTiles;

    const markersGroup = L.layerGroup().addTo(map);
    const overlaysGroup = L.layerGroup().addTo(map);

    markersLayerRef.current = markersGroup;
    overlaysLayerRef.current = overlaysGroup;
    mapInstanceRef.current = map;

    // Force size invalidation so tiles load immediately without gray gaps
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 150);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when mapType changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !(map as any)._customTileLayers) return;

    const { satelliteTiles, streetTiles, topoTiles } = (map as any)._customTileLayers;
    const currentActive = (map as any)._activeTileLayer;
    if (currentActive) {
      map.removeLayer(currentActive);
    }

    let nextLayer = satelliteTiles;
    if (mapType === 'street') nextLayer = streetTiles;
    if (mapType === 'topo') nextLayer = topoTiles;

    nextLayer.addTo(map);
    (map as any)._activeTileLayer = nextLayer;
  }, [mapType]);

  // Update Markers and Overlays based on filters and selectedMine
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    const overlaysGroup = overlaysLayerRef.current;
    if (!map || !markersGroup || !overlaysGroup) return;

    markersGroup.clearLayers();
    overlaysGroup.clearLayers();

    // Filter mines
    const filteredMines = mines.filter(m => {
      if (filterState !== 'All States' && m.state !== filterState) return false;
      if (filterRisk === 'Critical Only' && m.status !== 'critical') return false;
      if (filterRisk === 'Monitor' && m.status !== 'monitor') return false;
      if (filterRisk === 'Compliant' && m.status !== 'compliant') return false;
      return true;
    });

    filteredMines.forEach(mine => {
      const isSelected = selectedMine?.id === mine.id;
      const isCritical = mine.status === 'critical';
      const isMonitor = mine.status === 'monitor';

      const markerColor = isCritical ? '#dc2626' : isMonitor ? '#d97706' : '#10b981';

      // Custom DivIcon
      const iconHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group" style="transform: translate(-50%, -50%);">
          ${isCritical ? `<div class="absolute -inset-2.5 rounded-full bg-red-600/30 animate-ping"></div>` : ''}
          <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
            isSelected 
              ? 'ring-4 ring-white ring-offset-2 ring-offset-blue-600 scale-125' 
              : 'hover:scale-115'
          }" style="background-color: ${markerColor}; border: 2px solid #ffffff;">
            <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              ${isCritical 
                ? '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />'
                : isMonitor
                ? '<circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />'
                : '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
              }
            </svg>
          </div>
          ${isCritical ? `
            <div class="absolute -top-7 left-1/2 -translate-x-1/2 bg-red-950/95 text-white font-mono text-[9px] px-2 py-0.5 rounded border border-red-500 whitespace-nowrap shadow-md pointer-events-none flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
              ${mine.name.split(' ')[0]} (Deviation)
            </div>
          ` : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-mine-marker',
        html: iconHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([mine.latitude, mine.longitude], { icon: customIcon });

      // Leaflet popup
      const popupContent = `
        <div style="font-family: inherit; min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: ${markerColor}; background: ${markerColor}15; padding: 2px 6px; border-radius: 4px;">
              ${mine.status}
            </span>
            <span style="font-size: 10px; font-family: monospace; color: #64748b;">${mine.id}</span>
          </div>
          <h4 style="margin: 0 0 4px 0; font-size: 13px; font-weight: 700; color: #0f172a; line-height: 1.2;">
            ${mine.name}
          </h4>
          <p style="margin: 0 0 6px 0; font-size: 11px; color: #475569;">
            ${mine.operator} &bull; ${mine.region}, ${mine.state}
          </p>
          <div style="display: flex; justify-content: space-between; font-size: 11px; background: #f8fafc; padding: 6px; border-radius: 4px; border: 1px solid #e2e8f0; margin-bottom: 8px;">
            <div>
              <div style="font-size: 9px; text-transform: uppercase; color: #64748b;">Compliance</div>
              <div style="font-weight: 700; color: ${markerColor};">${mine.complianceScore}%</div>
            </div>
            <div>
              <div style="font-size: 9px; text-transform: uppercase; color: #64748b;">Reports</div>
              <div style="font-weight: 700; color: #0f172a;">${mine.activeReports} Active</div>
            </div>
            <div>
              <div style="font-size: 9px; text-transform: uppercase; color: #64748b;">Capacity</div>
              <div style="font-weight: 700; color: #0f172a;">${mine.productionCapacityMTPA} MTPA</div>
            </div>
          </div>
          ${mine.unauthorizedAreaHa ? `
            <div style="font-size: 10px; background: #fef2f2; color: #991b1b; padding: 4px 6px; border-radius: 4px; border: 1px solid #fecaca; margin-bottom: 8px; font-weight: 600;">
              Encroachment Alert: ${mine.unauthorizedAreaHa} Ha detected outside lease!
            </div>
          ` : ''}
          <div style="display: flex; gap: 6px;">
            <button id="popup-select-${mine.id.replace(/[^a-zA-Z0-9]/g, '')}" style="flex: 1; padding: 5px 8px; font-size: 11px; font-weight: 600; background: #0A192F; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">
              Select Mine
            </button>
            ${mine.status === 'critical' ? `
              <button id="popup-investigate-${mine.id.replace(/[^a-zA-Z0-9]/g, '')}" style="flex: 1; padding: 5px 8px; font-size: 11px; font-weight: 600; background: #1E40AF; color: #ffffff; border: none; border-radius: 4px; cursor: pointer;">
                Evidence
              </button>
            ` : ''}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, { maxWidth: 280, className: 'leaflet-custom-popup' });

      marker.on('click', () => {
        onSelectMine(mine);
      });

      marker.on('popupopen', () => {
        const safeId = mine.id.replace(/[^a-zA-Z0-9]/g, '');
        const selBtn = document.getElementById(`popup-select-${safeId}`);
        const invBtn = document.getElementById(`popup-investigate-${safeId}`);

        if (selBtn) {
          selBtn.onclick = () => {
            onSelectMine(mine);
          };
        }
        if (invBtn) {
          invBtn.onclick = () => {
            onInvestigateEvidence(mine);
          };
        }
      });

      markersGroup.addLayer(marker);
    });

    // Add Boundary Overlays for Rajmahal OCP
    if (showBoundaryLayers) {
      // Approved Statutory Lease Area Polygon (Green / Cyan boundary)
      const approvedLeasePolygon = L.polygon([
        [25.045, 87.375],
        [25.042, 87.418],
        [25.008, 87.425],
        [25.005, 87.382]
      ], {
        color: '#10b981',
        weight: 2.5,
        fillColor: '#10b981',
        fillOpacity: 0.12,
        dashArray: '5, 5'
      }).bindTooltip('Rajmahal OCP: Approved MoEFCC Lease Boundary (1,248 Ha)', { sticky: true });

      // Encroachment Zone Polygon (Red dashed area: 28 Ha breach)
      const encroachmentPolygon = L.polygon([
        [25.042, 87.418],
        [25.048, 87.438],
        [25.022, 87.442],
        [25.018, 87.423]
      ], {
        color: '#ef4444',
        weight: 3,
        fillColor: '#ef4444',
        fillOpacity: 0.35,
        dashArray: '4, 4'
      }).bindTooltip('SCN-2026-082: Flagged 28 Ha Perimeter Encroachment Zone', { sticky: true });

      overlaysGroup.addLayer(approvedLeasePolygon);
      overlaysGroup.addLayer(encroachmentPolygon);
    }
  }, [mines, selectedMine, filterState, filterRisk, showBoundaryLayers]);

  // Pan to selected mine when selectedMine changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMine) return;

    map.flyTo([selectedMine.latitude, selectedMine.longitude], Math.max(map.getZoom(), 11), {
      duration: 1.2
    });
  }, [selectedMine]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleReset = () => {
    mapInstanceRef.current?.flyTo([23.9, 85.8], 7, { duration: 1.0 });
  };

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-slate-300 shadow-sm bg-slate-900">
      {/* Top Map Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200 px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2 pointer-events-auto">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-slate-800">Live Satellite Radar Telemetry</span>
          <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
            Sentinel-2 / SAR Sync Active
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Tile Layer Selector */}
          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg p-1 shadow-md flex items-center gap-1 text-xs">
            <button
              onClick={() => setMapType('satellite')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'satellite' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapType('topo')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'topo' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Topography
            </button>
            <button
              onClick={() => setMapType('street')}
              className={`px-2.5 py-1 rounded font-semibold transition-all ${
                mapType === 'street' ? 'bg-[#0A192F] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cartographic
            </button>
          </div>

          {/* Boundary Overlay Toggle */}
          <button
            onClick={() => setShowBoundaryLayers(!showBoundaryLayers)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 shadow-md backdrop-blur-sm transition-all ${
              showBoundaryLayers 
                ? 'bg-blue-900/90 text-white border-blue-500' 
                : 'bg-white/95 text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title="Toggle Statutory Lease & Encroachment Overlay Boundaries"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lease Boundary Polygons</span>
          </button>
        </div>
      </div>

      {/* Floating Zoom and Navigation Controls */}
      <div className="absolute top-16 right-3 z-[1000] flex flex-col gap-1.5">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-slate-100 border border-slate-300 rounded shadow-md flex items-center justify-center transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-slate-100 border border-slate-300 rounded shadow-md flex items-center justify-center transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="w-8 h-8 bg-white/95 backdrop-blur-sm text-slate-700 hover:bg-slate-100 border border-slate-300 rounded shadow-md flex items-center justify-center transition-colors"
          title="Reset View to National Mining Corridor"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Status Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm border border-slate-300 rounded-lg p-3 shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Surveillance Legend</div>
        <div className="flex flex-col gap-1.5 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 border border-white shadow-xs"></span>
            <span>Critical Deviation (SCN Notice)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 border border-white shadow-xs"></span>
            <span>Advisory Monitoring (&lt;90%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-white shadow-xs"></span>
            <span>Statutory Compliant (&gt;90%)</span>
          </div>
          {showBoundaryLayers && (
            <div className="pt-1.5 border-t border-slate-200 flex flex-col gap-1 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-emerald-500 rounded"></span>
                <span>Approved Lease Perimeter</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-1 bg-red-500 rounded"></span>
                <span>Encroachment Zone (28 Ha)</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Explicit Height Map Container as strictly instructed */}
      <div 
        id="surveillance-leaflet-map"
        ref={mapContainerRef} 
        style={{ height: '600px', width: '100%' }}
        className="w-full z-0 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}
