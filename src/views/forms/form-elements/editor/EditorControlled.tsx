//@ts-nocheck

// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert';
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'


const EditorControlled = (props: any) => {
  // ** State
  const [value, setValue] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.data ? '<p id="seopilot-editor">' + props.data + '</p>' : '<p id="seopilot-editor">no data</p>')
    )
  ))

  useEffect(() => {
    props.setHtml(convertToHTML(value.getCurrentContent()));
    // console.log(window.document.getElementsByClassName('DraftEditor-editorContainer'))

    // handleCopy();
  }, [value])



  return (
    <div>
      <ReactDraftWysiwyg
        editorState={value}
        onEditorStateChange={(data) => setValue(data)}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
          inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'strikethrough'] },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        readOnly={props.readOnly ? props.readOnly : false}
        toolbarHidden={props.toolbarHidden ? props.toolbarHidden : false}
      />
    </div>
  );
}

export default EditorControlled;
