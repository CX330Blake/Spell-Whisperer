import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MarkdownRendererProps {
    content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <div className="prose max-w-none markdown">
            <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
