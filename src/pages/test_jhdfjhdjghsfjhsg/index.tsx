import dynamic from 'next/dynamic';

const CkEditorReact = dynamic(() => import('../../components/CkEditor/CkEditorReact'), { ssr: false });

const RichTextEditor = () => {
    return (
        <CkEditorReact />
    );
}

export default RichTextEditor