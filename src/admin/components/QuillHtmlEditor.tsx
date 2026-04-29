import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { apiUpload } from '../api/client'

type Props = {
  value: string
  onChange: (next: string) => void
  placeholder?: string
}

function normalizeHtml(v: string) {
  const html = String(v ?? '').trim()
  return html === '<p>&nbsp;</p>' ? '' : html
}

function sanityCdnImageUrlFromAssetRef(ref: string): string | null {
  const projectId = String(import.meta.env.VITE_SANITY_PROJECT_ID ?? '').trim()
  const dataset = String(import.meta.env.VITE_SANITY_DATASET ?? '').trim()
  if (!projectId || !dataset) return null
  const m = String(ref || '').match(/^image-([a-zA-Z0-9]+)-(\d+)x(\d+)-([a-zA-Z0-9]+)$/)
  if (!m) return null
  const id = m[1]
  const ext = m[4]
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${m[2]}x${m[3]}.${ext}`
}

type UploadResponse = {
  asset?: { _ref?: string }
  document?: { url?: string }
}

function uploadAdapterPlugin(editor: any) {
  const repo = editor.plugins.get('FileRepository')
  if (!repo) return
  repo.createUploadAdapter = (loader: any) => ({
    upload: async () => {
      const file = await loader.file
      if (!file) throw new Error('No file selected')
      const uploaded = (await apiUpload(file)) as UploadResponse
      const directUrl = uploaded?.document?.url
      if (directUrl) return { default: directUrl }
      const ref = uploaded?.asset?._ref
      const cdnUrl = ref ? sanityCdnImageUrlFromAssetRef(ref) : null
      if (!cdnUrl) throw new Error('Image upload succeeded but URL could not be resolved')
      return { default: cdnUrl }
    },
    abort: () => {},
  })
}

export default function QuillHtmlEditor({ value, onChange, placeholder }: Props) {
  return (
    <div style={{ gridColumn: '1 / -1' }}>
      <CKEditor
        editor={ClassicEditor}
        data={normalizeHtml(value)}
        config={{
          placeholder,
          toolbar: {
            shouldNotGroupWhenFull: true,
            items: [
              'heading',
              '|',
              'bold',
              'italic',
              'link',
              'imageUpload',
              'bulletedList',
              'numberedList',
              '|',
              'outdent',
              'indent',
              '|',
              'blockQuote',
              'insertTable',
              'undo',
              'redo',
            ],
          },
          image: {
            toolbar: [
              'imageTextAlternative',
              '|',
              'imageStyle:inline',
              'imageStyle:block',
              'imageStyle:side',
            ],
          },
          extraPlugins: [uploadAdapterPlugin],
        }}
        onChange={(_event, editor) => {
          onChange(normalizeHtml(editor.getData()))
        }}
      />
    </div>
  )
}
