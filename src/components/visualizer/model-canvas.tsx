
'use client';

import React, { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { Button } from '../ui/button';
import { Expand, Shrink, Mouse, Fingerprint, Pause, Play, RotateCcw, HelpCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { Card } from '../ui/card';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';


function ModelWrapper({ modelUrl, onLoaded }: { modelUrl: string, onLoaded: () => void }) {
  const { scene } = useGLTF(modelUrl);
  
  useEffect(() => {
    if(scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center); 
      onLoaded();
    }
  }, [scene, onLoaded]);

  return <primitive object={scene} />;
}

const HelpPanel = ({onClose}: {onClose: () => void}) => {
    const { language } = useLanguage();
    const c = content[language].visualizer;

    return (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md mx-auto">
                <Card className="p-4">
                     <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-foreground z-10" onClick={onClose}>
                        <X className="h-5 w-5" />
                        <span className="sr-only">{c.help_close}</span>
                    </Button>
                    <h3 className="font-bold text-lg font-headline text-center mb-4">{c.help_title}</h3>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-8 w-full">
                        {/* Mouse Controls */}
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <h4 className="font-semibold flex items-center gap-2"><Mouse className="h-5 w-5" /> {c.help_mouse_title}</h4>
                            <div className="flex flex-col items-center gap-1.5 text-sm text-center">
                               <p>
                                   <span className="font-medium">{c.help_mouse_rotate}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_mouse_rotate_desc}</span>
                               </p>
                                <p>
                                   <span className="font-medium">{c.help_mouse_pan}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_mouse_pan_desc}</span>
                               </p>
                                <p>
                                   <span className="font-medium">{c.help_mouse_zoom}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_mouse_zoom_desc}</span>
                               </p>
                            </div>
                        </div>

                        <Separator orientation="vertical" className="h-24 bg-border/50 hidden sm:block" />
                        <Separator orientation="horizontal" className="w-full bg-border/50 sm:hidden" />


                        {/* Touch Controls */}
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <h4 className="font-semibold flex items-center gap-2"><Fingerprint className="h-5 w-5" /> {c.help_touch_title}</h4>
                             <div className="flex flex-col items-center gap-1.5 text-sm text-center">
                               <p>
                                   <span className="font-medium">{c.help_touch_rotate}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_touch_rotate_desc}</span>
                               </p>
                                <p>
                                   <span className="font-medium">{c.help_touch_zoom}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_touch_zoom_desc}</span>
                               </p>
                                <p>
                                   <span className="font-medium">{c.help_touch_pan}</span>
                                   <br />
                                   <span className="text-xs text-muted-foreground">{c.help_touch_pan_desc}</span>
                               </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default function ModelCanvas({ modelUrl }: { modelUrl:string }) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const c = content[language].visualizer;
  
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoaded = useCallback(() => {
    if (!isLoaded) {
      setShowHelp(true);
      setIsLoaded(true);
    }
  }, [isLoaded]);


  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
      if (isLoaded) {
          const timer = setTimeout(() => setShowHelp(false), 4000);
          return () => clearTimeout(timer);
      }
  }, [isLoaded]);
  
  const handleResetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleToggleRotation = () => {
    setIsRotating(prev => !prev);
  };
  
  const handleToggleFullscreen = () => {
      if (!containerRef.current) return;

      if (!isFullscreen) {
          containerRef.current.requestFullscreen();
      } else {
          document.exitFullscreen();
      }
  };
  
  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent fullscreen toggle on double click
    event.preventDefault();
    handleResetView();
  };

  return (
    <div 
      ref={containerRef} 
      className="relative h-full w-full rounded-xl overflow-hidden border-2 border-white/50 p-1"
      style={{ backgroundColor: '#3d3d3d' }}
      onDoubleClick={handleDoubleClick}
    >
       {showHelp && (
           <HelpPanel onClose={() => setShowHelp(false)} />
        )}

      <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }}>
          <Suspense fallback={null}>
              <ModelWrapper modelUrl={modelUrl} onLoaded={onLoaded} />
              <ambientLight intensity={2.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
              <directionalLight position={[-5, -5, -5]} intensity={0.5} />
              <OrbitControls ref={controlsRef} autoRotate={isRotating} autoRotateSpeed={0.8} />
          </Suspense>
      </Canvas>
        
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <Button variant="outline" size="icon" onClick={() => setShowHelp(true)} title={c.help_button_title}>
                <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleResetView} title={c.reset_button_title}>
                <RotateCcw className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleToggleRotation} title={isRotating ? c.autorotate_button_title_pause : c.autorotate_button_title_play}>
                {isRotating ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
            <Button variant="outline" size="icon" onClick={handleToggleFullscreen} title={isFullscreen ? c.fullscreen_button_title_exit : c.fullscreen_button_title_enter}>
                {isFullscreen ? <Shrink className="h-5 w-5" /> : <Expand className="h-5 w-5" />}
            </Button>
        </div>
    </div>
  );
}
