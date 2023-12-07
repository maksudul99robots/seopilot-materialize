//@ts-nocheck

// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { convertToHTML, parseHTML } from 'draft-convert';
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'


const EditorControlled = (props: any) => {
  // ** State
  const [value, setValue] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.data ? '<p id="seopilot-editor">' + props.data + '</p>' : '<p id="seopilot-editor">no data</p>')
    )
  ))

  useEffect(() => {

    if (props.fImg) {
      props.setHtml(insertImageAfterFirstH1(convertToHTML(value.getCurrentContent()), props.fImg.urls.full));

    } else {
      props.setHtml(convertToHTML(value.getCurrentContent()));
    }


  }, [value])


  function insertImageAfterFirstH1(htmlString, imgSrc) {
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlString;

    // Find the first h1 element
    const firstH1 = tempContainer.querySelector('h1');

    if (firstH1) {
      // Create an img element
      const imgElement = document.createElement('img');
      imgElement.style.width = "100%";
      imgElement.src = imgSrc;

      // Insert the img element after the first h1
      firstH1.parentNode.insertBefore(imgElement, firstH1.nextSibling);
    } else {

    }

    // Return the modified HTML
    return tempContainer.innerHTML;
  }

  // Example usage:


  return (
    <div>
      <ReactDraftWysiwyg
        editorState={value}
        onEditorStateChange={(data) => setValue(data)}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'image'],
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
