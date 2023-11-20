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
    // var outputString = value.getCurrentContent().replace('<article>', '');
    // var outputString1 = outputString.replace('</article>', '');
    props.setHtml(convertToHTML(value.getCurrentContent()));
    props.setPlainText(value.getCurrentContent().getPlainText())
  }, [value])

  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} toolbar={{
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
    inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
    list: { inDropdown: true },
    textAlign: { inDropdown: true },
    link: { inDropdown: true },
    history: { inDropdown: false },
  }} readOnly={props.readOnly ? props.readOnly : false} toolbarHidden={props.toolbarHidden ? props.toolbarHidden : false} />
}

export default EditorControlled
