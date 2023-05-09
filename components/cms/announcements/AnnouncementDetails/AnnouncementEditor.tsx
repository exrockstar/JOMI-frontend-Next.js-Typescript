import { useField, useFormikContext } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { EditorContainer } from 'components/common/richtext/RichTextEditor.styles'

type Props = {
  name: string
}

const AnnouncementEditor = ({ name }: Props) => {
  const { setFieldValue } = useFormikContext()
  const editorRef = useRef<Editor>(null)
  const [field] = useField({
    name
  })
  const [bgColor] = useField({
    name: 'backgroundColor'
  })

  useEffect(() => {
    if (editorRef.current) {
      try {
        editorRef.current.editor
          .getBody()
          .setAttribute(
            'style',
            `background-color: ${bgColor.value}; transition: background-color .3s ease`
          )
      } catch (e) {}
    }
  }, [bgColor])

  return (
    <EditorContainer>
      <Editor
        ref={editorRef}
        tinymceScriptSrc={`/dist/tinymce.min.js`}
        onEditorChange={(e) => setFieldValue(name, e)}
        value={field.value}
        plugins={['wordcount code link fullpage']}
        toolbar={`
          undo redo | styleselect | 
          bold italic underline link | 
          alignleft aligncenter alignright alignjustify | 
          outdent indent | 
          forecolor backcolor | 
          hr removeformat code`}
        init={{
          menubar: '',
          contextmenu: 'paste copy',
          content_style: `
            body {
              background-color: $
            }
          `
        }}
      ></Editor>
    </EditorContainer>
  )
}

export default AnnouncementEditor
