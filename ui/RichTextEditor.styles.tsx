import styled from 'styled-components'

export const EditorContainer = styled.div<{ toolbarLocation: string }>`
  border: 1px solid #ccc;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 3px 0px -1px rgba(0, 0, 0, 0.05);

  .tox.tox-tinymce {
    overflow: unset;
    border: none;
    .tox-toolbar {
    }
    .tox-toolbar:first-child {
      border-top: none;
    }
    .tox-editor-container {
      position: relative;
      overflow: unset;
    }
    .tox-editor-header {
      position: sticky;
      top: 64px;
      z-index: 1000;

      margin-bottom: ${({ toolbarLocation }) =>
        toolbarLocation === 'top' ? '-7px' : '-1px'};

      .tox-toolbar__primary {
        border-top: none !important;

        .tox-toolbar__group {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          margin: 0;
          padding: 0 4px 0 6px;

          .tox-tbtn {
            align-items: center;
            background: 0 0;
            border: 0;
            border-radius: 3px;
            box-shadow: none;
            color: #6b6f75;
            display: flex;
            flex: 0 0 auto;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            height: 26px;
            justify-content: center;
            margin: 0 2px 1px 0;
            outline: 0;
            overflow: hidden;
            padding: 0;
            text-transform: none;
            cursor: pointer;
            transition: all 150ms ease-in-out;

            svg {
              fill: rgb(80, 80, 80);
            }

            &:active {
              background: #c8cbcf;
              border: 0;
              box-shadow: none;
              color: #34373b;
            }

            &:focus {
              color: #6b6f75;
              background: #dee0e2;
              border: 0;
              box-shadow: none;
            }

            &:hover {
              background: #dee0e2;
              border: 0;
              box-shadow: none;
              color: #6b6f75;
            }
          }
        }
      }
    }
  }
`

/**
 * NOTE: THIS ISN'T A STYLED COMPONENT!!!!!
 */
export const EditorStyles = `
  body { font-size: .9em; cursor: text; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif; overscroll-behavior:contain;  }
  p { margin-block-end: .25em; margin-block-start: .25em; }
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b3b3b3;
    border: 0px none #ffffff;
    border-radius: 95px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #808080;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #474747;
  }
  ::-webkit-scrollbar-track {
    background: #ffffff;
    border: 0px none #000000;
    border-radius: 100px;
  }
  ::-webkit-scrollbar-track:hover {
    background: #d6d6d6;
  }
  ::-webkit-scrollbar-track:active {
    background: #b3b3b3;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  
`
