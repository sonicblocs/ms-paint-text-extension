(function(Scratch) {
  'use strict';

  class TextExtension {
    constructor() {
      this.font = 'Arial';     // default font
      this.size = 24;          // default size
      this.color = '#000000';  // default color
      this.style = 'normal';   // normal, bold, italic, bold italic
    }

    getInfo() {
      return {
        id: 'textExtension',
        name: 'Text Tools',
        blocks: [
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set font to [FONT]',
            arguments: {
              FONT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'fontMenu',
                defaultValue: 'Arial'
              }
            }
          },
          {
            opcode: 'setSize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set font size to [SIZE]',
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 24
              }
            }
          },
          {
            opcode: 'setColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set text color [COLOR]',
            arguments: {
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#000000'
              }
            }
          },
          {
            opcode: 'setStyle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set text style [STYLE]',
            arguments: {
              STYLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'styleMenu',
                defaultValue: 'normal'
              }
            }
          },
          {
            opcode: 'drawText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'draw text [TEXT] at x [X] y [Y]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello World'
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }
        ],
        menus: {
          fontMenu: {
            items: ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia']
          },
          styleMenu: {
            items: ['normal', 'bold', 'italic', 'bold italic']
          }
        }
      };
    }

    setFont(args) {
      this.font = args.FONT;
    }

    setSize(args) {
      this.size = args.SIZE;
    }

    setColor(args) {
      this.color = args.COLOR;
    }

    setStyle(args) {
      this.style = args.STYLE;
    }

    drawText(args) {
      const canvas = Scratch.renderer.canvas;
      const ctx = canvas.getContext('2d');

      // Build font string with style + size + font
      let stylePrefix = '';
      if (this.style === 'bold') stylePrefix = 'bold ';
      if (this.style === 'italic') stylePrefix = 'italic ';
      if (this.style === 'bold italic') stylePrefix = 'bold italic ';

      ctx.font = `${stylePrefix}${this.size}px ${this.font}`;
      ctx.fillStyle = this.color;
      ctx.fillText(args.TEXT, args.X, args.Y);
    }
  }

  Scratch.extensions.register(new TextExtension());
})(Scratch);
(function (Scratch) {
  'use strict';

  class TextExtension {
    constructor() {
      this.currentFont = '16px Arial';
      this.bold = false;
      this.italic = false;
    }

    getInfo() {
      return {
        id: 'textExtension',
        name: 'MS Paint Text',
        blocks: [
          {
            opcode: 'drawText',
            blockType: Scratch.BlockType.COMMAND,
            text: 'draw text [TEXT] at x [X] y [Y] with color [COLOR]',
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              COLOR: { type: Scratch.ArgumentType.STRING, defaultValue: '#000000' }
            }
          },
          {
            opcode: 'setFont',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set font to [FONT]',
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Arial' }
            }
          },
          {
            opcode: 'setBold',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set bold [STATE]',
            arguments: {
              STATE: { type: Scratch.ArgumentType.STRING, menu: 'booleanMenu', defaultValue: 'true' }
            }
          },
          {
            opcode: 'setItalic',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set italic [STATE]',
            arguments: {
              STATE: { type: Scratch.ArgumentType.STRING, menu: 'booleanMenu', defaultValue: 'true' }
            }
          }
        ],
        menus: {
          booleanMenu: [
            { text: 'true', value: 'true' },
            { text: 'false', value: 'false' }
          ]
        }
      };
    }

    drawText(args, util) {
      const ctx = util.target.renderer.ctx;
      ctx.fillStyle = args.COLOR;

      // Build font string with bold/italic
      let style = '';
      if (this.bold) style += 'bold ';
      if (this.italic) style += 'italic ';
      ctx.font = `${style}16px ${this.currentFont}`;

      ctx.fillText(args.TEXT, args.X, args.Y);
    }

    setFont(args) {
      this.currentFont = args.FONT;
    }

    setBold(args) {
      this.bold = args.STATE === 'true';
    }

    setItalic(args) {
      this.italic = args.STATE === 'true';
    }
  }

  Scratch.extensions.register(new TextExtension());
})(Scratch);
        
