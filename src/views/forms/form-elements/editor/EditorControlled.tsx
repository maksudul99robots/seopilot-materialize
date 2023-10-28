//@ts-nocheck

// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { EditorState, ContentState, convertFromHTML, convertFromRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert';
// ** Component Import
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'


const EditorControlled = (props: any) => {
  // ** State
  const [value, setValue] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.data ? '<p>' + props.data + '</p>' : '<p>no data</p>')
    )
  ))

  useEffect(() => {
    props.setHtml(convertToHTML(value.getCurrentContent()));
  }, [value])

  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />
}

export default EditorControlled
