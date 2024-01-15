//@ts-nocheck

// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Imports
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { convertToHTML, parseHTML } from 'draft-convert';
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'


const EditorControlled = (props: any) => {
  const [isImgAdded, setIsImgAdded] = useState<any>([])
  // ** State
  const [value, setValue] = useState(EditorState.createWithContent(
    ContentState.createFromBlockArray(
      convertFromHTML(props.data ? '<p id="seopilot-editor">' + props.data + '</p>' : '<p id="seopilot-editor">no data</p>')
    )
  ))

  useEffect(() => {

    if (props.fImg?.urls?.full) {
      props.setHtml(insertImageAfterFirstH1(convertToHTML(value.getCurrentContent()), props.fImg.urls.full));

    } else {
      props.setHtml(convertToHTML(value.getCurrentContent()));
    }

    // let x = getAllH2Elements(document.getElementsByClassName('DraftEditor-editorContainer')[0]?.innerHTML);
    // x.map(h2Element => {
    //   if (h2Element.innerText == 'Naruto') {
    //     h2Element.innerHTML += `<figure class="" data-block="true" data-editor="cd4ar" data-offset-key="cohm8-0-0" contenteditable="false"><span class="rdw-image-alignment rdw-image-center"><span class="rdw-image-imagewrapper"><img src="https://assets.agencyspotter.com/uploads/agency_image/image/46040/resized_1140x396px.png" style="height: auto; width: auto;"></span></span></figure>`;
    //   }
    // });
    getAllH2Elements();


  }, [value, props.listicleOutlines])

  useEffect(() => {
    // console.log("running ....")

  }, [])

  function getAllH2Elements() {

    props.listicleOutlines?.map((x: any, i: number) => {
      let listicle = JSON.parse(x);
      let elements = document.querySelectorAll(listicle.tag);
      elements = Array.from(elements);
      elements.forEach((element, index) => {
        // console.log("element:", index, isImgAdded, listicle);
        let title = listicle.title;
        if (props.numberedItem) {
          title = i + '. ' + title;
        }

        console.log("element.innerText == title", element.innerText, title, isImgAdded[title])
        if (element.innerText == title && !isImgAdded[title]) {
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
