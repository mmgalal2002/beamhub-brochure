import { ArrowUpRight, BookOpen, Briefcase, FileText, Lightbulb, MessageCircle, Network, Radio, Users, type LucideIcon } from "lucide-react";
import { useId } from "react";
import type { ecosystem } from "@/lib/beamhub";

type FeatureKind = (typeof ecosystem)[number]["id"];
interface DiagramNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
}

interface DiagramConnection {
  from: string;
  to: string;
}

const diagrams: Record<FeatureKind, { nodes: readonly DiagramNode[]; connections: readonly DiagramConnection[]; caption: string }> = {
  knowledge: {
    nodes: [
      { id: "question", x: 24, y: 110, width: 152, height: 82, label: "A QUESTION", icon: MessageCircle },
      { id: "perspective", x: 224, y: 30, width: 152, height: 82, label: "A PERSPECTIVE", icon: Lightbulb },
      { id: "knowledge", x: 424, y: 110, width: 152, height: 82, label: "SHARED KNOWLEDGE", icon: Network, highlight: true },
    ],
    connections: [{ from: "question", to: "perspective" }, { from: "perspective", to: "knowledge" }],
    caption: "INDIVIDUAL EXPERIENCE. COLLECTIVE KNOWLEDGE.",
  },
  events: {
    nodes: [
      { id: "experts", x: 24, y: 32, width: 152, height: 82, label: "EXPERT TALKS", icon: Users },
      { id: "events", x: 224, y: 110, width: 152, height: 82, label: "LIVE SESSIONS", icon: Radio, highlight: true },
      { id: "workshops", x: 424, y: 32, width: 152, height: 82, label: "WORKSHOPS + Q&As", icon: MessageCircle },
    ],
    connections: [{ from: "experts", to: "events" }, { from: "events", to: "workshops" }],
    caption: "A CONVERSATION THAT KEEPS MOVING.",
  },
  journal: {
    nodes: [
      { id: "publication", x: 24, y: 104, width: 152, height: 82, label: "PUBLICATIONS", icon: FileText },
      { id: "discussion", x: 224, y: 32, width: 152, height: 82, label: "DISCUSSION", icon: MessageCircle, highlight: true },
      { id: "perspective", x: 424, y: 104, width: 152, height: 82, label: "NEW PERSPECTIVES", icon: BookOpen },
    ],
    connections: [{ from: "publication", to: "discussion" }, { from: "discussion", to: "perspective" }],
    caption: "READ THE RESEARCH. OPEN THE CONVERSATION.",
  },
  careers: {
    nodes: [
      { id: "expertise", x: 24, y: 124, width: 152, height: 82, label: "YOUR EXPERTISE", icon: Users },
      { id: "opportunity", x: 224, y: 78, width: 152, height: 82, label: "OPPORTUNITY", icon: Briefcase },
      { id: "chapter", x: 424, y: 32, width: 152, height: 82, label: "YOUR NEXT CHAPTER", icon: ArrowUpRight, highlight: true },
    ],
    connections: [{ from: "expertise", to: "opportunity" }, { from: "opportunity", to: "chapter" }],
    caption: "EXPERIENCE INTO OPPORTUNITY.",
  },
};

export function FeatureBeams({ kind }: { kind: FeatureKind }) {
  const id = useId();
  const diagram = diagrams[kind];
  return (
    <div className="feature-beam-art" aria-hidden="true">
      <svg viewBox="0 0 600 240" fill="none" className="feature-beam-svg">
        <defs>
          <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#80c5b1" /><stop offset=".5" stopColor="#e3d5a3" /><stop offset="1" stopColor="#f0ac79" /></linearGradient>
          <linearGradient id={`${id}-node`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#2c4b3d" /><stop offset="1" stopColor="#193b30" /></linearGradient>
          <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" stroke="#9fcab3" strokeOpacity=".08" strokeWidth=".6" /></pattern>
        </defs>
        <rect width="600" height="240" rx="14" fill={`url(#${id}-grid)`} />
        {diagram.connections.map((connection, index) => {
          const from = diagram.nodes.find((node) => node.id === connection.from);
          const to = diagram.nodes.find((node) => node.id === connection.to);
          if (!from || !to) throw new Error(`The ${kind} feature diagram contains a disconnected node.`);
          const start = { x: from.x + from.width, y: from.y + from.height / 2 };
          const end = { x: to.x, y: to.y + to.height / 2 };
          const bend = (start.x + end.x) / 2;
          const path = `M${start.x} ${start.y}C${bend} ${start.y} ${bend} ${end.y} ${end.x} ${end.y}`;
          return (
            <g key={`${from.id}-${to.id}`} className="feature-beam-connection">
              <path d={path} stroke={`url(#${id}-beam)`} className="feature-beam-glow" />
              <path d={path} stroke={`url(#${id}-beam)`} className="feature-beam-line" />
              <path d={path} pathLength="100" className="feature-beam-pulse" style={{ animationDelay: `${index * 450}ms` }} />
              <circle cx={start.x} cy={start.y} r="4" fill="#b4d6bb" className="feature-beam-port" />
              <circle cx={end.x} cy={end.y} r="4" fill="#efb27e" className="feature-beam-port" />
            </g>
          );
        })}
        {diagram.nodes.map((node) => {
          const Icon = node.icon;
          return (
            <g key={node.id} className={node.highlight ? "feature-beam-node is-highlighted" : "feature-beam-node"} transform={`translate(${node.x} ${node.y})`}>
              <rect width={node.width} height={node.height} rx="13" fill={node.highlight ? "#dce7d1" : `url(#${id}-node)`} />
              <rect x=".5" y=".5" width={node.width - 1} height={node.height - 1} rx="12.5" className="feature-beam-node-border" />
              <Icon x={node.width / 2 - 14} y="14" size={28} strokeWidth={1.25} className="feature-beam-node-icon" />
              <text x={node.width / 2} y="62" textAnchor="middle" className="feature-beam-node-label">{node.label}</text>
            </g>
          );
        })}
      </svg>
      <span className="feature-beam-caption">{diagram.caption}</span>
    </div>
  );
}
