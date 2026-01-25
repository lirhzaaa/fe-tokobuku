import { cn } from "@/src/utils/cn"
import { Button, Spinner } from "@heroui/react"
import { Download, Trash } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, useEffect, useId, useRef } from "react"

interface IInputFile {
    name: string
    label?: string
    className?: string
    isDropable?: boolean
    isInvalid?: boolean
    isUploading?: boolean
    isDeleting?: boolean
    onUpload?: (files: FileList) => void
    onDelete?: () => void
    preview?: string
    errorMessage?: string
}

const InputFile = (props: IInputFile) => {
    const { name, label, className, isDropable = false, isInvalid, errorMessage, onUpload, onDelete, isUploading, isDeleting, preview } = props
    const drop = useRef<HTMLLabelElement>(null)
    const dropzoneId = useId()
    const handleDragOver = (e: DragEvent) => {
        if (isDropable) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    const handleDrop = (e: DragEvent) => {
        e.preventDefault()
        const files = e.dataTransfer?.files
        if (files && onUpload) {
            onUpload(files)
        }
    }

    useEffect(() => {
        const dropCurrent = drop.current
        if (dropCurrent) {
            dropCurrent.addEventListener("dragover", handleDragOver)
            dropCurrent.addEventListener("drop", handleDrop)
        }
        return () => {
            dropCurrent?.removeEventListener("dragover", handleDragOver)
            dropCurrent?.removeEventListener("drop", handleDrop)
        }
    }, [])

    const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files
        if (files && onUpload) {
            onUpload(files)
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-default-700">{label}</p>
            <label htmlFor={`dropzone-file-${dropzoneId}`} ref={drop} className={cn(
                "flex min-h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100",
                className,
                { "border-danger-500": isInvalid }
            )}>

                {preview && (
                    <div className="relative flex flex-col items-center justify-center p-5">
                        <div className="mb-2 w-1/2">
                            <Image fill src={preview} alt="Image" className="relative!" />
                        </div>
                        <Button isIconOnly onPress={onDelete} disabled={isDeleting} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded bg-danger-100">
                            {isDeleting ? (
                                <Spinner size="sm" color="primary" />
                            ) : (
                                <Trash className="h-5 w-5 text-danger-500" />
                            )}
                        </Button>
                    </div>
                )}

                {!preview && !isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <div className="mb-2">
                            <Download className="mb-2 h-10 w-10 text-gray-400" />
                        </div>
                        <p className="text-center text-sm font-semibold text-gray-500">
                            {isDropable ? "Drag and drop on click to upload file here" : "Click to upload file here"}
                        </p>
                    </div>
                )}
                {isUploading && (
                    <div className="flex flex-col items-center justify-center p-5">
                        <Spinner color="primary" />
                    </div>
                )}
                <input type="file" className="hidden" accept="image/*" id={`dropzone-file-${dropzoneId}`} name={name} onChange={handleOnUpload} disabled={preview !== ""} onClick={(e) => {
                    e.currentTarget.value = ""
                    e.target.dispatchEvent(new Event("change", { bubbles: true }))
                }} />
            </label>
            {isInvalid && (
                <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
            )}
        </div>
    )
}

export default InputFile
