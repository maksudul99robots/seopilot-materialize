//@ts-nocheck

// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { EditorState, ContentState, convertFromHTML, convertToRaw, Modifier, SelectionState } from 'draft-js'
import { convertToHTML, parseHTML } from 'draft-convert';
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { Button } from '@mui/material';
import ToolbarDropdown from 'src/services/ToolbarOptions/ToolbarDropdown';
import { Icon } from '@iconify/react';
import ReWritenTxtTable from 'src/services/ToolbarOptions/ReWritenTxtTable';
import InsertNewText from 'src/services/ToolbarOptions/InsertNewText';


const EditorControlled = (props: any) => {
  const [isImgAdded, setIsImgAdded] = useState<any>([])
  const [links, setLinks] = useState<any>([]);
  // ** State
  const [bold, setBold] = useState<any>([]);
  const [italic, setItalic] = useState<any>([]);
  const [underline, setUnderline] = useState<any>([]);
  const [lastSelection, setLastSelection] = useState<any>(null)
  const [lastCurrentState, setLastCurrentState] = useState<any>(null)
  const [lastSelectionOnePoint, setLastSelectionOnePoint] = useState<any>(null)
  const [lastCurrentStateOnePoint, setLastCurrentStateOnePoint] = useState<any>(null)
  const [value, setValue] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.data ? '<p id="seopilot-editor">' + props.data + '</p>' : '<p id="seopilot-editor">no data</p>')
    )
  ))

  useEffect(() => {
    setValue(EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(props.data ? '<p id="seopilot-editor">' + props.data + '</p>' : '<p id="seopilot-editor">no data</p>')
      )
    ))

    // return () => {
    //   props.save()
    // }
  }, [props.data])
  const [toolbarPosition, setToolbarPosition] = useState({
    display: 'none',
  });



  const [text, setText] = useState(props.text)
  useEffect(() => {

    if (props.fImg?.urls?.full) {
      props.setHtml(insertImageAfterFirstH1(convertToHTML(value.getCurrentContent()), props.fImg.urls.full));

    } else {
      // props.setHtml(convertToHTML(value.getCurrentContent()));
      props.setHtml(convertToHTML(value.getCurrentContent()));

    }
    setTimeout(() => {
      getAllH2Elements();
    }, 2000)

    setLastSelectionOnePoint(value.getSelection())
    setLastCurrentStateOnePoint(value.getCurrentContent())

    // console.log("has focus:", value.getSelection().getHasFocus())
    // console.log("has getFocusOffset:", value.getSelection().getFocusOffset())

  }, [value, props.listicleOutlines])


  function insertText(text) {

    const currentContent = lastCurrentStateOnePoint;
    const currentSelection = lastSelectionOnePoint;
    const newContent = Modifier.insertText(currentContent, currentSelection, text);
    const newEditorState = EditorState.push(value, newContent, 'insert-characters');

    setValue(EditorState.forceSelection(newEditorState, newContent.getSelectionAfter()));

  }


  function getAllH2Elements() {
    props.listicleOutlines?.map((x: any, i: number) => {
      let listicle = JSON.parse(x);
      let elements = document.querySelectorAll(listicle.tag);
      elements = Array.from(elements);
      elements.forEach((element, index) => {
        // console.log("element:", index, isImgAdded, listicle);
        let title = listicle.title;
        if (props.numberedItem) {
          let count = i + 1;
          title = count + '. ' + title;
        }

        // console.log("element.innerText == title", element.innerText, title, isImgAdded[title])
        if (element.innerText == title && !isImgAdded[title] && listicle.imgSrcUrl?.length > 5) {
          let x = isImgAdded;
          x[title] = true;
          setIsImgAdded(x);
          element.insertAdjacentHTML('afterend', `<figure class="" data-block="true" data-editor="cd4ar" data-offset-key="cohm8-0-0" contenteditable="false"><span class="rdw-image-alignment rdw-image-center"><span class="rdw-image-imagewrapper"><img src="${listicle.imgSrcUrl}" style="height: auto; width: 100%;"></span></span></figure>`);
        }

      });
    })

  }


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

  const handleSelectionChange = () => {

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rootElement = document.querySelector('.DraftEditor-root'); // Adjust the selector based on your specific case
      const commonAncestor = range.commonAncestorContainer;
      // console.log(selection.toString(), range)

      // if (rootElement.contains(commonAncestor) && range.startOffset !== range.endOffset) {
      if (rootElement.contains(commonAncestor) && selection?.toString().length > 0) {
        // console.log(range.startContainer.data.substring(range.startOffset, range.endOffset))
        setText(selection?.toString().trim())
        // console.log(range)
        let selectedTextWithLinks = getSelectedTextWithLinks();
        setLinks(selectedTextWithLinks)
        let bolds = getSelectedTextWithBoldStyle();
        setBold(bolds)
        const rect = range.getBoundingClientRect();
        setToolbarPosition({
          top: rect.top - 40, // Adjust the offset based on your styling
          left: rect.left + rect.width / 2,
        });
      } else {
        setToolbarPosition({
          display: 'none',
        });
      }
    }
  };


  function getSelectedTextWithLinks() {
    let selection = window.getSelection();
    let selectedTextWithLinks = [];

    if (selection && selection.rangeCount > 0) {
      for (let i = 0; i < selection.rangeCount; i++) {
        let range = selection.getRangeAt(i);
        let container = document.createElement('div');
        container.appendChild(range.cloneContents());
        let nodes = container.querySelectorAll('*');

        nodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            selectedTextWithLinks.push(node.textContent);
          } else if (node.nodeName === 'A') {
            selectedTextWithLinks.push({
              text: node.textContent,
              href: node.href
            });
          }
        });
      }
    }

    return selectedTextWithLinks;
  }

  function getSelectedTextWithBoldStyle() {
    let selection = window.getSelection();
    let selectedTextWithBoldStyle = [];

    if (selection && selection.rangeCount > 0) {
      for (let i = 0; i < selection.rangeCount; i++) {
        let range = selection.getRangeAt(i);
        let container = document.createElement('div');
        container.appendChild(range.cloneContents());
        let nodes = container.querySelectorAll('*');

        nodes.forEach(node => {
          // Traverse ancestor nodes to check for the style
          if (node.parentElement.style?.fontWeight == "bold") {
            selectedTextWithBoldStyle.push(node.textContent);
          }
          // console.log("node:", node.textContent)
          // console.log("styke:", node.parentElement.style?.fontWeight)
        })
      }
    }

    return selectedTextWithBoldStyle;
  }

  const replaceText = (newText) => {
    const selection = lastSelection;
    const contentState = lastCurrentState;

    const newContentState = Modifier.replaceText(
      contentState,
      selection,
      newText
    );

    const newEditorState = EditorState.push(
      value,
      newContentState,
      'replace-text'
    );

    setValue(newEditorState);
  };

  const setSelectionAndState = () => {
    setLastSelection(value.getSelection())
    setLastCurrentState(value.getCurrentContent())
  }

  useEffect(() => {
    if (text?.length > 20 && text?.length < 800) {
      setLastSelection(value.getSelection())
      setLastCurrentState(value.getCurrentContent())
    }

  }, [text])



  return (
    <div>
      <div className="custom-toolbar" style={{ ...toolbarPosition }}>

        <ToolbarDropdown text={text} article_id={props.article_id} setReloadArticle={props.setReloadArticle} reloadArticle={props.reloadArticle} replaceText={replaceText} setSelectionAndState={setSelectionAndState} />
      </div>

      <ReactDraftWysiwyg
        editorState={value}
        onEditorStateChange={(data) =>
          setValue(data)
        }
        onChange={handleSelectionChange}
        toolbarClassName="toolbar-class"
        toolbarCustomButtons={[
          // <Button variant='outlined' startIcon={<Icon icon="dashicons:insert" />} size='small' sx={
          //   {
          //     marginLeft: "10px", marginBottom: "5px"
          //   }}>Insert</Button>,
          <InsertNewText article_id={props.article_id} insertText={insertText} />,
          <ReWritenTxtTable article_id={props.article_id} />,
          <Button variant='contained'
            sx={
              {
                marginLeft: "10px", marginBottom: "5px"
              }}
            size='small'
            startIcon={<Icon icon="mdi:content-save-outline" />}
            onClick={e => {

              props.save();

            }}
          >
            Save
          </Button>

        ]}
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
          inline: { inDropdown: false, options: ['bold', 'italic', 'underline'] },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        readOnly={props.readOnly ? props.readOnly : false}
        toolbarHidden={props.toolbarHidden ? props.toolbarHidden : false}
      />
      {/* <button onClick={() => replaceText('New Text')}>Replace Selected Text</button> */}
    </div>
  );
}

export default EditorControlled;
