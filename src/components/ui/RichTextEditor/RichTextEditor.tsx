"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { Button } from '@heroui/react'
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    Code,
    Undo,
    Redo,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
} from 'lucide-react'
import { useCallback, useEffect } from 'react'

interface RichTextEditorProps {
    value?: string
    onChange?: (html: string) => void
    placeholder?: string
    isInvalid?: boolean
    errorMessage?: string
}

const RichTextEditor = ({
    value,
    onChange,
    placeholder = "Start writing...",
    isInvalid,
    errorMessage
}: RichTextEditorProps) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link.configure({
                openOnClick: false,
            }),
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'focus:outline-none min-h-[200px]',
            },
        },
    })

    useEffect(() => {
        if (editor && value !== undefined) {
            const currentContent = editor.getHTML()
            if (currentContent !== value) {
                editor.commands.setContent(value, { emitUpdate: false })
            }
        }
    }, [editor, value])


    const setLink = useCallback(() => {
        if (!editor) return

        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('Enter URL:', previousUrl)

        if (url === null) return
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])

    if (!editor) {
        return (
            <div className="border rounded-lg border-default-200">
                <div className="h-10 border-b border-default-200 bg-default-50 animate-pulse" />
                <div className="min-h-[200px] p-4 bg-default-50 animate-pulse" />
            </div>
        )
    }

    return (
        <div className={`border rounded-lg ${isInvalid ? 'border-danger' : 'border-default-200'}`}>
            <div className="flex flex-wrap gap-1 p-2 border-b border-default-200 bg-default-50">
                <Button
                    size="sm"
                    variant={editor.isActive('bold') ? 'solid' : 'light'}
                    color={editor.isActive('bold') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleBold().run()}
                    title="Bold"
                >
                    <Bold size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('italic') ? 'solid' : 'light'}
                    color={editor.isActive('italic') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleItalic().run()}
                    title="Italic"
                >
                    <Italic size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('underline') ? 'solid' : 'light'}
                    color={editor.isActive('underline') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleUnderline().run()}
                    title="Underline"
                >
                    <UnderlineIcon size={16} />
                </Button>

                <div className="w-px h-6 bg-default-200 mx-1" />

                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 1 }) ? 'solid' : 'light'}
                    color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setHeading({ level: 1 }).run()}
                    title="Heading 1"
                >
                    <Heading1 size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 2 }) ? 'solid' : 'light'}
                    color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setHeading({ level: 2 }).run()}
                    title="Heading 2"
                >
                    <Heading2 size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('heading', { level: 3 }) ? 'solid' : 'light'}
                    color={editor.isActive('heading', { level: 3 }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setHeading({ level: 3 }).run()}
                    title="Heading 3"
                >
                    <Heading3 size={16} />
                </Button>
                <Button
                    size="sm"
                    variant="light"
                    onPress={() => editor.chain().focus().setParagraph().run()}
                    title="Normal Text"
                    className="text-xs px-2"
                >
                    Normal
                </Button>

                <div className="w-px h-6 bg-default-200 mx-1" />

                <Button
                    size="sm"
                    variant={editor.isActive('bulletList') ? 'solid' : 'light'}
                    color={editor.isActive('bulletList') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleBulletList().run()}
                    title="Bullet List"
                >
                    <List size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('orderedList') ? 'solid' : 'light'}
                    color={editor.isActive('orderedList') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleOrderedList().run()}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </Button>

                <div className="w-px h-6 bg-default-200 mx-1" />

                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'left' }) ? 'solid' : 'light'}
                    color={editor.isActive({ textAlign: 'left' }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setTextAlign('left').run()}
                    title="Align Left"
                >
                    <AlignLeft size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'center' }) ? 'solid' : 'light'}
                    color={editor.isActive({ textAlign: 'center' }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setTextAlign('center').run()}
                    title="Align Center"
                >
                    <AlignCenter size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive({ textAlign: 'right' }) ? 'solid' : 'light'}
                    color={editor.isActive({ textAlign: 'right' }) ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().setTextAlign('right').run()}
                    title="Align Right"
                >
                    <AlignRight size={16} />
                </Button>

                <div className="w-px h-6 bg-default-200 mx-1" />

                <Button
                    size="sm"
                    variant={editor.isActive('blockquote') ? 'solid' : 'light'}
                    color={editor.isActive('blockquote') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleBlockquote().run()}
                    title="Blockquote"
                >
                    <Quote size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('code') ? 'solid' : 'light'}
                    color={editor.isActive('code') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={() => editor.chain().focus().toggleCode().run()}
                    title="Inline Code"
                >
                    <Code size={16} />
                </Button>
                <Button
                    size="sm"
                    variant={editor.isActive('link') ? 'solid' : 'light'}
                    color={editor.isActive('link') ? 'primary' : 'default'}
                    isIconOnly
                    onPress={setLink}
                    title="Add Link"
                >
                    <LinkIcon size={16} />
                </Button>

                <div className="w-px h-6 bg-default-200 mx-1" />

                <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo size={16} />
                </Button>
                <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    onPress={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo size={16} />
                </Button>
            </div>

            <div className="p-4 prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h1:text-3xl prose-h1:mb-4 prose-h1:mt-8
              prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-6
              prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-4
              prose-p:text-default-700 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-primary prose-code:bg-default-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-default-100 prose-pre:border prose-pre:border-default-200
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
              prose-ul:list-disc prose-ul:pl-6
              prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-default-700 prose-li:mb-2">
                <EditorContent editor={editor} />
            </div>

            {isInvalid && errorMessage && (
                <p className="text-xs text-danger px-4 pb-2">{errorMessage}</p>
            )}
        </div>
    )
}

export default RichTextEditor