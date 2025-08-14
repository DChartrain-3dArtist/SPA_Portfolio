

'use client';

import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useProgress, Html, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Button } from '../ui/button';
import { Expand, Shrink, Mouse, Fingerprint, Pause, Play, RotateCcw, HelpCircle, X, AlertTriangle, Layers, Sun, Sigma } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from '../ui/progress';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { cn } from '@/lib/utils';
import { Card } from '../ui/card';

const environments = [
    { name: 'Studio', preset: 'studio' },
    { name: 'Aube', preset: 'dawn' },
    { name: 'Appartement', preset: 'apartment' },
    { name: 'Ville', preset: 'city' },
    { name: 'Parc', preset: 'park' },
];

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="w-64 text-center">
                <Progress value={progress} className="w-full" />
                <p className="mt-2 text-sm text-white/80">Chargement... {Math.round(progress)}%</p>
            </div>
        </Html>
    )
}

function ModelWrapper({ modelUrl, onLoaded, setPolycount, setMaterialCount, wireframe }: { modelUrl: string, onLoaded: (model: THREE.Group) => void, setPolycount: (count: number) => void, setMaterialCount: (count: number) => void, wireframe: boolean }) {
  const { scene } = useGLTF(modelUrl);
  
  useEffect(() => {
    if(scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);
      
      let polyCount = 0;
      const materials = new Set<THREE.Material>();
      scene.traverse(obj => {
          if (obj instanceof THREE.Mesh) {
              polyCount += obj.geometry.index ? obj.geometry.index.count / 3 : obj.geometry.attributes.position.count / 3;
              if (Array.isArray(obj.material)) {
                  obj.material.forEach(mat => materials.add(mat));
              } else {
                  materials.add(obj.material as THREE.Material);
              }
          }
      });
      setPolycount(polyCount);
      setMaterialCount(materials.size);
      onLoaded(scene);
    }
  }, [scene, onLoaded, setPolycount, setMaterialCount]);

  useEffect(() => {
    scene.traverse(o => {
      if (o instanceof THREE.Mesh) {
          (o.material as THREE.MeshStandardMaterial).wireframe = wireframe;
      }
    });
  }, [wireframe, scene])

  return <primitive object={scene} />;
}

const HelpPanel = ({onClose}: {onClose: () => void}) => {
    const { language } = useLanguage();
    const c = content[language].visualizer;

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-md mx-auto">
                 <div className="relative rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-foreground z-10" onClick={onClose}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">{c.help_close}</span>
                    </Button>
                    <h3 className="font-bold text-lg font-headline text-center mb-4">{c.help_title}</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-8 w-full">
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <h4 className="font-semibold flex items-center gap-2"><Mouse className="h-5 w-5" /> {c.help_mouse_title}</h4>
                            <div className="flex flex-col items-center gap-1.5 text-sm text-center">
                               <p><span className="font-medium">{c.help_mouse_rotate}</span><br /><span className="text-xs text-muted-foreground">{c.help_mouse_rotate_desc}</span></p>
                                <p><span className="font-medium">{c.help_mouse_pan}</span><br /><span className="text-xs text-muted-foreground">{c.help_mouse_pan_desc}</span></p>
                                <p><span className="font-medium">{c.help_mouse_zoom}</span><br /><span className="text-xs text-muted-foreground">{c.help_mouse_zoom_desc}</span></p>
                            </div>
                        </div>
                        <div className="w-full sm:w-px sm:h-36 h-px bg-border my-2 sm:my-0"/>
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <h4 className="font-semibold flex items-center gap-2"><Fingerprint className="h-5 w-5" /> {c.help_touch_title}</h4>
                             <div className="flex flex-col items-center gap-1.5 text-sm text-center">
                               <p><span className="font-medium">{c.help_touch_rotate}</span><br /><span className="text-xs text-muted-foreground">{c.help_touch_rotate_desc}</span></p>
                                <p><span className="font-medium">{c.help_touch_zoom}</span><br /><span className="text-xs text-muted-foreground">{c.help_touch_zoom_desc}</span></p>
                                <p><span className="font-medium">{c.help_touch_pan}</span><br /><span className="text-xs text-muted-foreground">{c.help_touch_pan_desc}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface FullScreenElement extends HTMLElement { webkitRequestFullscreen?: () => Promise<void>; mozRequestFullScreen?: () => Promise<void>; msRequestFullscreen?: () => Promise<void>; }
interface FullScreenDocument extends Document { webkitExitFullscreen?: () => Promise<void>; mozCancelFullScreen?: () => Promise<void>; msExitFullscreen?: () => Promise<void>; webkitFullscreenElement?: Element; mozFullScreenElement?: Element; msFullscreenElement?: Element; }

export default function ModelCanvas({ modelUrl, onPolycountChange, onMaterialCountChange }: { modelUrl:string, onPolycountChange: (count: number) => void, onMaterialCountChange: (count: number) => void }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const c = content[language];
  
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modelExists, setModelExists] = useState<boolean | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [polycount, setPolycount] = useState(0);
  const [materialCount, setMaterialCount] = useState(0);
  const [env, setEnv] = useState(environments[0].preset);
  const [isEnvMenuOpen, setIsEnvMenuOpen] = useState(false);

  useEffect(() => {
    async function checkModel() {
      if (!modelUrl) { setModelExists(false); return; }
      try {
        const response = await fetch(modelUrl, { method: 'HEAD' });
        setModelExists(response.ok);
      } catch (error) { setModelExists(false); }
    }
    checkModel();
  }, [modelUrl]);

  const onLoaded = useCallback((model: THREE.Group) => {
    if (!isLoaded) {
      setShowHelp(true);
      setIsLoaded(true);
    }
  }, [isLoaded]);
  
  const handleToggleWireframe = () => setWireframe(prev => !prev);
  
  useEffect(() => {
    const fsDoc = document as FullScreenDocument;
    const handleFullscreenChange = () => setIsFullscreen(!!(document.fullscreenElement || fsDoc.webkitFullscreenElement));
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    }
  }, []);

  useEffect(() => { if (isLoaded) { const timer = setTimeout(() => setShowHelp(false), 5000); return () => clearTimeout(timer); } }, [isLoaded]);
  
  const handleResetView = () => { if (controlsRef.current) controlsRef.current.reset(); };
  const handleToggleRotation = () => setIsRotating(prev => !prev);
  
  const handleToggleFullscreen = () => {
    if (!containerRef.current) return;
    const el = containerRef.current as FullScreenElement;
    const fsDoc = document as FullScreenDocument;
    if (!isFullscreen) { if (el.requestFullscreen) el.requestFullscreen(); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); } 
    else { if (fsDoc.exitFullscreen) fsDoc.exitFullscreen(); else if (fsDoc.webkitExitFullscreen) fsDoc.webkitExitFullscreen(); }
  };
  
  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => { event.preventDefault(); handleResetView(); };
  
  const handlePolycountUpdate = useCallback((count: number) => {
    setPolycount(count);
    onPolycountChange(count);
  }, [onPolycountChange]);
  
  const handleMaterialCountUpdate = useCallback((count: number) => {
    setMaterialCount(count);
    onMaterialCountChange(count);
  }, [onMaterialCountChange]);

  const renderContent = () => {
    if (modelExists === null) return <div className="flex h-full w-full items-center justify-center rounded-lg border bg-card/50"><p className="text-foreground">{c.visualizer.canvas_loading}</p></div>;
    if (modelExists === false) return <div className="flex h-full w-full items-center justify-center rounded-lg border bg-card/50"><div className="text-center text-destructive"><AlertTriangle className="mx-auto h-12 w-12 mb-4" /><p className="font-bold">{c.visualizer.item_detail_no_model}</p></div></div>;

    return (
      <>
        <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
            <Suspense fallback={<Loader />}>
                <ModelWrapper 
                  modelUrl={modelUrl} 
                  onLoaded={onLoaded} 
                  setPolycount={handlePolycountUpdate}
                  setMaterialCount={handleMaterialCountUpdate}
                  wireframe={wireframe} 
                />
            </Suspense>
            <Suspense fallback={null}>
                <Environment preset={env as any} />
            </Suspense>
            <OrbitControls ref={controlsRef} autoRotate={isRotating} autoRotateSpeed={0.8} />
        </Canvas>
          
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <TooltipProvider>
                <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" onClick={() => setShowHelp(true)}><HelpCircle className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>{c.visualizer.help_button_title}</p></TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" onClick={handleResetView}><RotateCcw className="h-5 w-5" /></Button></TooltipTrigger><TooltipContent><p>{c.visualizer.reset_button_title}</p></TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" onClick={handleToggleRotation}>{isRotating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}</Button></TooltipTrigger><TooltipContent><p>{isRotating ? c.visualizer.autorotate_button_title_pause : c.visualizer.autorotate_button_title_play}</p></TooltipContent></Tooltip>
                <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" onClick={handleToggleFullscreen}>{isFullscreen ? <Shrink className="h-5 w-5"/> : <Expand className="h-5 w-5" />}</Button></TooltipTrigger><TooltipContent><p>{isFullscreen ? c.visualizer.fullscreen_button_title_exit : c.visualizer.fullscreen_button_title_enter}</p></TooltipContent></Tooltip>
            </TooltipProvider>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 p-2 rounded-lg border bg-background/80 backdrop-blur-sm flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={wireframe ? 'default' : 'outline'} size="icon" onClick={handleToggleWireframe}><Layers className="h-5 w-5" /></Button>
                </TooltipTrigger>
                <TooltipContent><p>Afficher le maillage</p></TooltipContent>
              </Tooltip>
            
              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setIsEnvMenuOpen(prev => !prev)}>
                      <Sun className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Changer l'éclairage</p></TooltipContent>
                </Tooltip>
                 <Card className={cn("absolute bottom-full mb-2 w-auto p-2 space-y-1 z-20", !isEnvMenuOpen && "hidden")}>
                    <RadioGroup value={env} onValueChange={setEnv} className="p-2 space-y-1">
                      {environments.map(e => (
                        <div key={e.preset} className="flex items-center space-x-2">
                            <RadioGroupItem value={e.preset} id={`env-${e.preset}`} />
                            <Label htmlFor={`env-${e.preset}`}>{e.name}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                </Card>
              </div>

              <div className="flex items-center gap-2 text-sm text-foreground/80 font-mono"><Sigma className="h-5 w-5" /><p>{polycount.toLocaleString()} Polys</p></div>
            </TooltipProvider>
        </div>
      </>
    );
  };

  return (
    <div ref={containerRef} className="relative h-full w-full rounded-xl overflow-hidden border-2 border-white/50 p-1 bg-[#3d3d3d]" onDoubleClick={handleDoubleClick}>
       {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
      {renderContent()}
    </div>
  );
}
