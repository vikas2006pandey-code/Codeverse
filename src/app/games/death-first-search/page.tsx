'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BrainCircuit, ChevronLeft, ShieldOff, Server, Trophy, ShieldAlert, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- GAME CONFIGURATION ---
const INFECTION_SPEED_MS = 2500; // Hydra spreads every 2.5 seconds

type NodeType = 'entry' | 'normal' | 'main';
type Node = { id: string; x: number; y: number; type: NodeType };
type Edge = { from: string; to: string };

// Define the network graph structure
const initialNodes: Node[] = [
  { id: 'A', x: 10, y: 50, type: 'entry' },
  { id: 'B', x: 30, y: 25, type: 'normal' },
  { id: 'C', x: 30, y: 75, type: 'normal' },
  { id: 'D', x: 50, y: 50, type: 'normal' },
  { id: 'E', x: 70, y: 25, type: 'normal' },
  { id: 'F', x: 70, y: 75, type: 'normal' },
  { id: 'G', x: 90, y: 50, type: 'main' },
];

const initialEdges: Edge[] = [
  { from: 'A', to: 'B' }, { from: 'A', to: 'C' },
  { from: 'B', to: 'D' }, { from: 'C', to: 'D' },
  { from: 'D', to: 'E' }, { from: 'D', to: 'F' },
  { from: 'E', to: 'G' }, { from: 'F', to: 'G' },
];

const entryNode = initialNodes.find(n => n.type === 'entry')!;
const mainServerNode = initialNodes.find(n => n.type === 'main')!;

// --- HELPER COMPONENTS ---

const HeaderAnimation = () => (
    <div className="relative h-24 w-full max-w-md mx-auto mb-4 flex items-center justify-center">
        <BrainCircuit className="h-16 w-16 text-primary" />
        <div className="absolute w-24 h-24 rounded-full border-2 border-primary/50 animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute w-40 h-40 rounded-full border-2 border-primary/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute w-56 h-56 rounded-full border-2 border-primary/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
);

const GameGraph = ({ nodes, edges, infectedNodes, cutEdges, onCutEdge }: { nodes: Node[], edges: Edge[], infectedNodes: Set<string>, cutEdges: Set<string>, onCutEdge: (edgeKey: string) => void }) => {
    const nodeMap = useMemo(() => new Map(nodes.map(n => [n.id, n])), [nodes]);

    return (
        <div className="relative w-full h-[400px] bg-muted/20 rounded-md border p-4">
            {/* Render Edges */}
            {edges.map(({ from, to }) => {
                const nodeA = nodeMap.get(from);
                const nodeB = nodeMap.get(to);
                if (!nodeA || !nodeB) return null;

                const edgeKey = [from, to].sort().join('-');
                const isCut = cutEdges.has(edgeKey);

                const angle = Math.atan2(nodeB.y - nodeA.y, nodeB.x - nodeA.x) * (180 / Math.PI);
                const distance = Math.sqrt(Math.pow(nodeB.x - nodeA.x, 2) + Math.pow(nodeB.y - nodeA.y, 2));

                return (
                    <div
                        key={edgeKey}
                        className="absolute group"
                        style={{
                            left: `${nodeA.x}%`,
                            top: `${nodeA.y}%`,
                            width: `${distance}%`,
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: 'left center',
                        }}
                    >
                        <div
                            className={cn(
                                "h-1 w-full transition-colors",
                                isCut ? 'bg-destructive/50' : 'bg-primary/50 group-hover:bg-primary'
                            )}
                        />
                         <button
                            onClick={() => onCutEdge(edgeKey)}
                            disabled={isCut}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 disabled:opacity-100 transition-opacity"
                         >
                            <ShieldOff className={cn("h-5 w-5", isCut ? "text-destructive" : "text-primary")} />
                         </button>
                    </div>
                );
            })}

            {/* Render Nodes */}
            {nodes.map(node => {
                const isInfected = infectedNodes.has(node.id);
                return (
                    <div
                        key={node.id}
                        className={cn(
                            "absolute w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg -translate-x-1/2 -translate-y-1/2 border-4 transition-all duration-500",
                            isInfected ? 'bg-destructive/80 border-destructive animate-pulse' : 'bg-card border-border',
                            node.type === 'entry' && 'border-yellow-400',
                            node.type === 'main' && 'border-green-400',
                        )}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    >
                        {node.type === 'main' ? <Server className={isInfected ? "text-white" : "text-green-400"} /> : node.id}
                    </div>
                );
            })}
        </div>
    );
};


// --- MAIN GAME COMPONENT ---
export default function DeathFirstSearchPage() {
    const [gameState, setGameState] = useState<'intro' | 'playing' | 'win' | 'loss'>('intro');
    const [infectedNodes, setInfectedNodes] = useState<Set<string>>(new Set());
    const [cutEdges, setCutEdges] = useState<Set<string>>(new Set());
    const [infectionQueue, setInfectionQueue] = useState<string[]>([]);
    
    // Game loop for Hydra spread
    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameTick = setInterval(() => {
            setInfectionQueue(prevQueue => {
                if (prevQueue.length === 0) {
                    // No more nodes to infect, Hydra is contained.
                    setGameState('win');
                    return [];
                }
                
                const nextLevelQueue: string[] = [];
                const newInfections = new Set<string>();

                prevQueue.forEach(nodeId => {
                    initialEdges.forEach(edge => {
                        const edgeKey = [edge.from, edge.to].sort().join('-');
                        if(cutEdges.has(edgeKey)) return;

                        let neighbor: string | null = null;
                        if(edge.from === nodeId) neighbor = edge.to;
                        if(edge.to === nodeId) neighbor = edge.from;

                        if (neighbor && !infectedNodes.has(neighbor) && !newInfections.has(neighbor)) {
                           if(neighbor === mainServerNode.id) {
                               setGameState('loss');
                           }
                           nextLevelQueue.push(neighbor);
                           newInfections.add(neighbor);
                        }
                    });
                });

                setInfectedNodes(prev => new Set([...prev, ...newInfections]));
                return nextLevelQueue;
            });

        }, INFECTION_SPEED_MS);

        return () => clearInterval(gameTick);

    }, [gameState, infectedNodes, cutEdges]);

    const startGame = () => {
        setGameState('playing');
        setInfectedNodes(new Set([entryNode.id]));
        setInfectionQueue([entryNode.id]);
        setCutEdges(new Set());
    };
    
    const resetGame = () => {
        setGameState('intro');
        setInfectedNodes(new Set());
        setInfectionQueue([]);
        setCutEdges(new Set());
    };

    const handleCutEdge = (edgeKey: string) => {
        if (gameState !== 'playing') return;
        setCutEdges(prev => new Set([...prev, edgeKey]));
    };
    
    // --- RENDER LOGIC ---

    if (gameState === 'intro') {
        return (
            <div className="container py-12 flex items-center justify-center">
                <Card className="max-w-2xl text-center">
                    <CardHeader>
                        <HeaderAnimation />
                        <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                            Death-First Search
                        </CardTitle>
                        <CardDescription className="mt-4 text-lg text-muted-foreground">
                            The S.H.I.E.L.D. network is under attack by Hydra! A virus is spreading server by server. Your mission is to cut network links to isolate the virus before it reaches the main server. This game demonstrates how Breadth-First Search spreads and how early-level blocking is critical.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <Button onClick={startGame} size="lg">
                            <Play className="mr-2" /> Begin Defense
                        </Button>
                        <Button asChild variant="ghost">
                            <Link href="/games">Back to Game Zone</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    if (gameState === 'win' || gameState === 'loss') {
        const isVictory = gameState === 'win';
        return (
             <div className="container py-12 flex items-center justify-center">
                <Card className="max-w-2xl text-center animate-in fade-in zoom-in-95">
                    <CardHeader>
                        {isVictory ? <Trophy className="mx-auto h-16 w-16 text-yellow-400" /> : <ShieldAlert className="mx-auto h-16 w-16 text-destructive" />}
                        <CardTitle className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline mt-4">
                            {isVictory ? "Network Secured!" : "Network Compromised!"}
                        </CardTitle>
                        <CardDescription className="mt-4 text-lg text-muted-foreground">
                            {isVictory ? "You successfully isolated the Hydra virus and saved the S.H.I.E.L.D. network. Excellent work, Agent!" : "Hydra reached the main server. The network is lost. We'll get them next time."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center gap-4 pt-4">
                        <Button onClick={resetGame}>Play Again</Button>
                        <Button asChild variant="outline">
                            <Link href="/games">Back to Game Zone</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container py-12">
            <Button asChild variant="ghost" className="mb-8">
                <Link href="/games">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Game Zone
                </Link>
            </Button>
            <div className="text-center mb-8">
                <HeaderAnimation />
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl font-headline">
                    Defend the Network
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Hydra is spreading. Click on the connections between servers to cut them off.
                </p>
            </div>
            
            <Card className="max-w-5xl mx-auto">
                <CardHeader>
                    <CardTitle>S.H.I.E.L.D. Network Status</CardTitle>
                    <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-yellow-400" /> Hydra Entry</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-destructive" /> Infected</div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border-2 border-green-400" /> Main Server</div>
                    </div>
                </CardHeader>
                <CardContent>
                    <GameGraph nodes={initialNodes} edges={initialEdges} infectedNodes={infectedNodes} cutEdges={cutEdges} onCutEdge={handleCutEdge} />
                </CardContent>
            </Card>
        </div>
    );
}
