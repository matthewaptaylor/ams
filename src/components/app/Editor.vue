<template>
  <v-sheet elevation="2" rounded>
    <div v-if="editor" class="pa-1">
      <v-tooltip bottom v-for="button in buttons" :key="button.text">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :color="
              button.active
                ? editor.isActive(...button.active)
                  ? 'primary'
                  : undefined
                : undefined
            "
            @click="
              editor.chain().focus()[button.action](button.actionParams).run()
            "
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ button.icon }}</v-icon>
          </v-btn>
        </template>
        {{ button.text }}
      </v-tooltip>
    </div>
    <v-divider />
    <editor-content :editor="editor" class="pa-4" />
  </v-sheet>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import History from "@tiptap/extension-history";

import {
  mdiFormatBold,
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatItalic,
  mdiFormatListBulleted,
  mdiFormatListNumbered,
  mdiFormatParagraph,
  mdiFormatStrikethrough,
  mdiRedo,
  mdiUndo,
} from "@mdi/js";

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: null,
      buttons: [
        {
          text: "Bold",
          icon: mdiFormatBold,
          action: "toggleBold",
          active: ["bold"],
        },
        {
          text: "Italic",
          icon: mdiFormatItalic,
          action: "toggleItalic",
          active: ["italic"],
        },
        {
          text: "Strike",
          icon: mdiFormatStrikethrough,
          action: "toggleStrike",
          active: ["strike"],
        },
        {
          text: "Paragraph",
          icon: mdiFormatParagraph,
          action: "setParagraph",
          active: ["paragraph"],
        },
        {
          text: "Heading 1",
          icon: mdiFormatHeader1,
          action: "toggleHeading",
          actionParams: { level: 1 },
          active: ["heading", { level: 1 }],
        },
        {
          text: "Heading 2",
          icon: mdiFormatHeader2,
          action: "toggleHeading",
          actionParams: { level: 2 },
          active: ["heading", { level: 2 }],
        },
        {
          text: "Heading 3",
          icon: mdiFormatHeader3,
          action: "toggleHeading",
          actionParams: { level: 3 },
          active: ["heading", { level: 3 }],
        },
        {
          text: "Bullet List",
          icon: mdiFormatListBulleted,
          action: "toggleBulletList",
          active: ["bulletList"],
        },
        {
          text: "Numbered List",
          icon: mdiFormatListNumbered,
          action: "toggleOrderedList",
          active: ["orderedList"],
        },
        {
          text: "Undo",
          icon: mdiUndo,
          action: "undo",
        },
        {
          text: "Redo",
          icon: mdiRedo,
          action: "redo",
        },
      ],
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Strike,
        Heading,
        ListItem,
        OrderedList,
        BulletList,
        History,
      ],
      content: `
        <p>
          Start planning your activity here.
        </p>
      `,
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
/* Basic editor styles */

.ProseMirror:focus-visible {
  outline: none;
}
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3 {
    line-height: 1.1;
  }
}
</style>
