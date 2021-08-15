<template>
  <div>
    <v-sheet elevation="2" rounded>
      <editor-menu-bar
        :editor="editor"
        v-slot="{ commands, isActive }"
        class="pa-2"
      >
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.blockquote() ? 'primary' : undefined"
                @click="commands.blockquote"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Blockquote
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.codeblock() ? 'primary' : undefined"
                @click="commands.codeblock"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Code Block
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.hardbreak() ? 'primary' : undefined"
                @click="commands.hardbreak"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Hard Break
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.heading() ? 'primary' : undefined"
                @click="commands.heading"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Heading
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.orderedlist() ? 'primary' : undefined"
                @click="commands.orderedlist"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Ordered List
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.bulletlist() ? 'primary' : undefined"
                @click="commands.bulletlist"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Bullet List
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.listitem() ? 'primary' : undefined"
                @click="commands.listitem"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            List Item
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.todoitem() ? 'primary' : undefined"
                @click="commands.todoitem;"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Todo Item
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.todolist() ? 'primary' : undefined"
                @click="commands.todolist"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Todo List
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.bold() ? 'primary' : undefined"
                @click="commands.bold"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Bold
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.code() ? 'primary' : undefined"
                @click="commands.code"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Code
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.italic() ? 'primary' : undefined"
                @click="commands.italic"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Italic
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.link() ? 'primary' : undefined"
                @click="commands.link"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Link
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.strike() ? 'primary' : undefined"
                @click="commands.strike"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Strike
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.underline() ? 'primary' : undefined"
                @click="commands.Underline"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            Underline
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                :color="isActive.history() ? 'primary' : undefined"
                @click="commands.history"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ formatBoldIcon }}</v-icon>
              </v-btn>
            </template>
            History
          </v-tooltip>
        </div>
      </editor-menu-bar>
      <v-divider />
      <editor-content :editor="editor" class="pa-2" />
    </v-sheet>
  </div>
</template>

<style>
.ProseMirror:focus-visible {
  outline: none;
}
</style>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from "tiptap-extensions";
import { mdiFormatBold } from "@mdi/js";

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  data() {
    return {
      formatBoldIcon: mdiFormatBold,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new BulletList(),
          new OrderedList(),
          new ListItem(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <p>All these <strong>cool tags</strong> are working now.</p>
        `,
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
