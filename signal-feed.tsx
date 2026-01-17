import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Bell, Zap, Anchor } from "lucide-react";
import { format } from "date-fns";

type Signal = {
  id: number;
  message: string;
  tier: 'basic' | 'pro' | 'elite';
  isPreDip: number;
  confidence: number;
  timestamp: string;
};

export function SignalFeed() {
  const { data: signals, isLoading } = useQuery<Signal[]>({
    queryKey: ['/api/signals'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  if (isLoading) {
    return (
      <Card className="border-purple-900/20 bg-gray-900/40 backdrop-blur-sm h-[500px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Activity className="h-8 w-8 text-cyan-400 animate-pulse" />
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Synchronizing Neural Feed...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-purple-900/20 bg-gray-900/40 backdrop-blur-sm flex flex-col h-[500px]">
      <CardHeader className="border-b border-white/5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Live Signal Feed</CardTitle>
          </div>
          <Badge variant="outline" className="text-[10px] border-cyan-500/30 text-cyan-400 animate-pulse">
            Live Pulse
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="divide-y divide-white/5">
            {signals?.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-xs uppercase tracking-widest">Awaiting neural signals...</p>
              </div>
            ) : (
              signals?.map((signal) => (
                <div key={signal.id} className="p-4 hover:bg-white/[0.02] transition-colors group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {signal.isPreDip === 1 ? (
                        <Zap className="h-3 w-3 text-yellow-400" />
                      ) : (
                        <Bell className="h-3 w-3 text-cyan-400" />
                      )}
                      <span className="text-[10px] text-gray-500 font-medium">
                        {format(new Date(signal.timestamp), 'HH:mm:ss')}
                      </span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-[9px] uppercase font-bold tracking-tighter ${
                        signal.tier === 'elite' ? 'border-purple-500/50 text-purple-400' :
                        signal.tier === 'pro' ? 'border-cyan-500/50 text-cyan-400' :
                        'border-gray-500/50 text-gray-400'
                      }`}
                    >
                      {signal.tier}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-200 mb-2 leading-relaxed">
                    {signal.isPreDip === 1 && <span className="text-yellow-400 font-bold mr-1">[PRE-DIP]</span>}
                    {signal.message}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 transition-all duration-1000" 
                          style={{ width: `${signal.confidence}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-bold text-cyan-500/70">{signal.confidence}% Confidence</span>
                    </div>
                    {signal.tier === 'elite' && (
                      <div className="flex items-center gap-1 text-purple-400/70">
                        <Anchor className="h-3 w-3" />
                        <span className="text-[9px] font-bold uppercase tracking-tighter">Whale Tracker</span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
