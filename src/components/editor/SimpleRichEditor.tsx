import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

interface SimpleRichEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SimpleRichEditor({ content, onChange, placeholder, className }: SimpleRichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: 'focus:outline-none min-h-[150px] py-4 prose prose-neutral max-w-none',
        }
    }
  });

  if (!editor) return null;

  const ToolbarButton = ({ 
    onClick, 
    isActive, 
    children 
  }: { 
    onClick: () => void; 
    isActive?: boolean; 
    children: React.ReactNode 
  }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
        isActive ? 'bg-[#0D0D0D] text-white' : 'bg-black/5 text-black/40 hover:bg-black/10'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div className="flex flex-wrap gap-2 pb-4 border-b border-black/5">
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            isActive={editor.isActive('bold')}
        >
            Bold
        </ToolbarButton>
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            isActive={editor.isActive('italic')}
        >
            Italic
        </ToolbarButton>
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleUnderline().run()} 
            isActive={editor.isActive('underline')}
        >
            Underline
        </ToolbarButton>
        <div className="w-px h-6 bg-black/5 mx-1" />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
            isActive={editor.isActive('heading', { level: 3 })}
        >
            H3
        </ToolbarButton>
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            isActive={editor.isActive('bulletList')}
        >
            Bullets
        </ToolbarButton>
        <ToolbarButton 
            onClick={() => {
                const url = window.prompt('Enter URL');
                if (url) editor.chain().focus().setLink({ href: url }).run();
            }} 
            isActive={editor.isActive('link')}
        >
            Link
        </ToolbarButton>
      </div>
      <div className="relative">
          <EditorContent editor={editor} />
          {!content && placeholder && (
              <div className="absolute top-4 left-0 pointer-events-none text-black/20 text-sm font-bold">
                  {placeholder}
              </div>
          )}
      </div>
    </div>
  );
}
