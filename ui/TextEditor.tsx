import * as React from 'react';
import { default as Editor } from './RichTextEditor';
import loadImages from './utils/loadImages';
import uploadImage from './utils/uploadImage';
import { CustomStyles } from '../styles/CustomStyles';

const apiurl = process.env.API_URL;

type TextEditorProps = {
  value: string;
  setField: (value: string) => void;
};

export type Image = {
  metadata: {
    title: string;
    filesize: string;
    extension: string;
    geomotry?: {
      width?: number;
      height?: number;
    };
  };
  filename: string;
};

export type BlobInfo = {
  id: () => string;
  name: () => string;
  filename: () => string;
  blob: () => Blob;
  base64: () => string;
  blobUri: () => string;
  uri: () => string;
};

export const StylingOverride = `
  html {
    background: #000!important;
    margin: 20px 0 0 0;
  }

  body {
    padding: 10px 20px !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grays;
    overflow-x: scroll !important;
    width: 90% !important;
    max-width: 90% !important;
    margin: 0 auto 20px auto !important;
    background: white !important;
    font-size: 14px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media only screen and (max-width: 992px) {
    body {
      width: 970px;
    }
  }

  @media only screen and (max-width: 768px) {
    body {
      width: 750px;
    }
  }
`;

const TextEditor: React.FC<TextEditorProps> = ({ value, setField }): JSX.Element => (
  <>
    <label htmlFor='content-input' id="content">Content Editor</label>
    <Editor
      toolbarLocation='top'
      value={value}
      onChange={setField}
      resize
      menubar
      placeholder=''
      statusBar
      height={500}
      maxHeight={1000}
      contentStyle={`${StylingOverride} ${CustomStyles}`}
      plugins={[
        'lists charmap paste autolink autoresize advlist autosave code emoticons fullscreen hr image imagetools insertdatetime link save searchreplace table wordcount anchor nonbreaking visualblocks'
      ]}
      invalidElements=' '
      validElements='*[*]'
      contextMenuItems={false}
      toolbarItems='image charmap nonbreaking | bold italic | outdent indent | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | numlist bullist | link hr | forecolor backcolor | anchor code superscript | visualblocks fullpage'
      init={{
        content_css: '/dist/bootstrap3.3.7.css',
        browser_spellcheck: true,
        paste_data_images: false,
        link_default_protocol: 'https',
        paste_as_text: true,
        autoresize_bottom_margin: 5,
        autoresize_overflow_padding: 50,
        min_height: 300,
        autosave_restore_when_empty: true,
        file_picker_types: 'image',
        a11y_advanced_options: true,
        image_caption: true,
        image_prepend_url: `${apiurl}/files/`,
        image_title: true,
        image_advtab: true,
        image_uploadtab: true,
        images_upload_credentials: true,
        default_link_target: '_self',
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        autosave_ask_before_unload: false,
        forced_root_block: 'p',
        remove_trailing_brs: false,
        image_list: async (complete: Function) => await loadImages(complete),
        images_upload_handler: async (blobInfo: BlobInfo, success: Function, failure: Function) =>
          await uploadImage(blobInfo, success, failure),
        protect: [/<a.*.aria-hidden=('|")true('|").*.<\/a>/gim],

        extended_valid_elements: '-strong,+body[style],style',
        convert_newlines_to_brs: true,
        custom_elements:"style"
      }}
    />
  </>
);

export default React.memo(TextEditor);
