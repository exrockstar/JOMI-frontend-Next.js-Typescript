import { EventHandler } from 'react'
import * as React from 'react'
import { EditorContainer, EditorStyles } from './RichTextEditor.styles'
import { Editor, IAllProps } from '@tinymce/tinymce-react'

interface RTEProps extends IAllProps {
  onChange: EventHandler<any>
  value: string
  menubar: boolean
  height?: number
  maxHeight?: number
  placeholder: string
  resize: boolean
  statusBar: boolean
  autoFocus?: boolean
  contentStyle?: string
  invalidElements?: string
  validElements?: string
  toolbarLocation: 'bottom' | 'top'
  plugins?: string[]
  contextMenuItems?: string | false
  toolbarItems?: string
  init?: Object
}

/**
 * @param {EventHandler<any>} onChange
 * @param {string} value
 * @param {boolean} menubar Show menubar?
 * @param {number} [height = 120]
 * @param {number} [maxHeight = 300]
 * @param {string} placeholder
 * @param {boolean} resize Allow resizing?
 * @param {boolean} statusbar Show statusbar?
 * @param {boolean} [autoFocus = true] Autofocus?
 * @param {string} [contentStyle] Additional VALID CSS
 * @param {string} [invalidElements = "script,style,font,h1,h2,h3,h4,h5,h6"] Disallowed tags seperated by comma
 * @param {string} [validElements = 'a[href|target=_blank|ref],strong/b,br,p,span,i,ul,ol,li'] Allowed elements seperated by comma
 * @param {'bottom' | 'top'} toolbarLocation Toolbar location
 * @param {string[]} [plugins] List of plugins (MUST BE INSIDE ARRAY)
 * @param {string | false} [contextMenuItems = 'paste copy'] Items that appear when a user right clicks on the form
 * @param {string} [toolbarItems] List of toolbar items, seperated by '|' for new group
 * @param {Object} [init] Extra configurations for init in TinyMCE
 */
const RichTextEditor: React.FC<RTEProps> = ({
  onChange,
  value,
  menubar,
  height = 120,
  maxHeight = 300,
  placeholder,
  resize,
  statusBar,
  autoFocus = true,
  contentStyle = '',
  invalidElements = 'script,style,font,h1,h2,h3,h4,h5,h6',
  validElements = 'a[href|target=_blank|ref],strong/b,br,p,span,i,ul,ol,li,em',
  toolbarLocation,
  plugins = ['lists paste autolink'],
  contextMenuItems = 'paste copy',
  toolbarItems = 'bold italic | bullist | removeformat',
  init,
  ...props
}) => (
  <EditorContainer toolbarLocation={toolbarLocation}>
    <Editor
      tinymceScriptSrc="/dist/tinymce.min.js"
      onEditorChange={onChange}
      value={value}
      toolbar={toolbarItems}
      plugins={plugins}
      {...props}
      init={{
        height: height,
        menubar: menubar,
        branding: false,
        max_height: maxHeight,
        placeholder: placeholder,
        resize: resize,
        statusbar: statusBar,
        contextmenu: contextMenuItems,
        referrer_policy: 'strict-origin-when-cross-origin',
        default_link_target: '_blank',
        invalid_elements: invalidElements,
        valid_elements: validElements,
        auto_focus: autoFocus as true,
        content_style: `${EditorStyles}${contentStyle}`,
        toolbar_location: toolbarLocation,
        setup: (editor: any) => {
          editor.addShortcut('meta+shift+s', 'Superscript', () => {
            editor.execCommand('Superscript', true)
          })

          editor.on('keydown', (event) => {
            switch (event.keyCode) {
              case 9:
                if (event.shiftKey) {
                  editor.execCommand('Outdent')
                } else {
                  editor.execCommand('Indent')
                }

                event.preventDefault()
                return false
              default:
                break
            }
          })

          // @ts-ignore
          typeof init?.setup === 'function' && init.setup(editor)
        },
        ...init
      }}
      textareaName="content"
    />
  </EditorContainer>
)

export default React.memo(RichTextEditor)
