import { motion } from "framer-motion";
import type { SubjectTopic } from "@/data/roadmapData";

interface TopicNodeProps {
  topic: SubjectTopic;
  depth?: number;
  isLast?: boolean;
}

const TopicNode = ({ topic, depth = 0, isLast = false }: TopicNodeProps) => {
  const hasChildren = topic.children && topic.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.1 }}
        className={`
          px-4 py-2 rounded-lg text-xs font-medium text-center
          border border-border/60 bg-card shadow-sm
          hover:shadow-glow hover:border-accent/50 transition-all cursor-default
          ${depth === 0 ? "bg-accent/10 border-accent/40 text-accent font-semibold text-sm px-6 py-3" : ""}
        `}
      >
        {topic.name}
      </motion.div>

      {hasChildren && (
        <>
          {/* Vertical line down */}
          <div className="w-px h-5 bg-border/60" />

          {/* Horizontal connector + children */}
          <div className="relative flex items-start gap-0">
            {/* Horizontal line spanning all children */}
            {topic.children!.length > 1 && (
              <div
                className="absolute top-0 h-px bg-border/60"
                style={{
                  left: `calc(50% / ${topic.children!.length})`,
                  right: `calc(50% / ${topic.children!.length})`,
                }}
              />
            )}

            <div className="flex gap-6">
              {topic.children!.map((child, i) => (
                <div key={child.id} className="flex flex-col items-center">
                  {/* Vertical line from horizontal to node */}
                  {topic.children!.length > 1 && (
                    <div className="w-px h-5 bg-border/60" />
                  )}
                  <TopicNode
                    topic={child}
                    depth={depth + 1}
                    isLast={i === topic.children!.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface SubjectTopicTreeProps {
  topicTree: SubjectTopic;
}

const SubjectTopicTree = ({ topicTree }: SubjectTopicTreeProps) => {
  return (
    <div className="overflow-x-auto py-4">
      <div className="flex justify-center min-w-max px-4">
        <TopicNode topic={topicTree} />
      </div>
    </div>
  );
};

export default SubjectTopicTree;
